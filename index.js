import express from 'express'
import { dbConn } from './database/dbConnection.js'
import { bootstrap } from "./src/modules/bootstrap.js"
import { globalError } from './src/middleware/globalError.js'
import { AppError } from "./src/utils/appError.js"
import cors from "cors"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PgRqfKjuca3jxtgL39PODU7ct8qKOFouNAYRaBC3gqt12m0UNfWLpFxYEIgiCnJ59f8O9otUnihRPM7DrNo3rTu00GpovWO1z');

import 'dotenv/config'
import { catchError } from './src/middleware/catchError.js'
const app = express()
const port = process.env.PORT || 3000

app.post('/api/webhook', express.raw({ type: 'application/json' }), catchError((req, res) => {
    const sig = req.headers['stripe-signature'].toString()
    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_ZkhRwZKMxgwTMCZTDN197K2wmbeBJbRh");
    let checkout
    if (event.type == "checkout.session.completed") {
        checkout = event.data.object;
    }
    res.json({ message: "success", checkout });
}));


app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

bootstrap(app)
app.use('*', (req, res, next) => {
    next(new AppError(`route not found: ${req.originalUrl}`, 404))
})
app.use(globalError)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))