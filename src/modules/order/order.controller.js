

import { Cart } from "../../../database/models/cart.model.js"
import { Coupon } from "../../../database/models/coupon.model.js"
import { Order } from "../../../database/models/order.model.js"
import { Product } from "../../../database/models/product.model.js"
import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PgRqfKjuca3jxtgL39PODU7ct8qKOFouNAYRaBC3gqt12m0UNfWLpFxYEIgiCnJ59f8O9otUnihRPM7DrNo3rTu00GpovWO1z');

const createCashOrder = catchError(async (req, res, next) => {
    //1-get user cart by cartId
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 404))
    //2-total order Price
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    //3-create order
    let order = new Order({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()

    //4-increment sold & decrement stock
    let options = cart.cartItems.map((prod) => {
        return (
            {
                updateOne: {
                    "filter": { _id: prod.product },
                    "update": { $inc: { sold: prod.quantity, stock: -prod.quantity } }
                }
            }
        )
    })

    await Product.bulkWrite(options)
    //5-clear user cart
    await Cart.findByIdAndDelete(cart._id)

    res.json({ message: "success", order })
})
//users/id/orders
const getUserOrders = catchError(async (req, res, next) => {
    let orders = await Order.findOne({ user: req.user._id }).populate('orderItems.product')
    res.json({ message: "success", orders })
})
const getAllOrders = catchError(async (req, res, next) => {
    let orders = await Order.find({})
    res.json({ message: "success", orders })
})

const createCheckoutSession = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: "https://hambozoo.netlify.app/#/orders",
        cancel_url: "https://hambozoo.netlify.app/#/cart",

        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress,
    })


    res.json({ message: "success", session })
})
export {
    createCashOrder,
    getUserOrders,
    getAllOrders,
    createCheckoutSession
}



