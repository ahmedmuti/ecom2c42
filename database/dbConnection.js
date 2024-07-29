
import { connect } from "mongoose"
export const dbConn = connect('mongodb+srv://demo:cOp7bKnTG1dZCDzt@cluster0.78ullzo.mongodb.net/e-commerce1c42')
    .then(() => {
        console.log('database connected');
    }).catch(() => {
        console.log('database error');
    })
