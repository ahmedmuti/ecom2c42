import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../database/models/user.model.js"


const addAddress = catchError(async (req, res, next) => {

    let address = await User.findByIdAndUpdate(req.user._id,
        { $push: { addresses: req.body } }, { new: true })

    address || next(new AppError('address not found', 404))
    !address || res.json({ message: "success", address: address.addresses })
})


const removeAddress = catchError(async (req, res, next) => {

    let address = await User.findByIdAndUpdate(req.user._id,
        { $pull: { addresses: { _id: req.params.id } } }, { new: true })

    address || next(new AppError('address not found', 404))
    !address || res.json({ message: "success", address: address.addresses })
})

const getLoggedUserAddresses = catchError(async (req, res, next) => {

    let address = await User.findById(req.user._id)

    address || next(new AppError('address not found', 404))
    !address || res.json({ message: "success", address: address.addresses })
})


export {
    addAddress,
    removeAddress,
    getLoggedUserAddresses
}



