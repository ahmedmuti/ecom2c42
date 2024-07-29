import { Router } from "express";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from "./products.controller.js";
const productRouter = Router()
productRouter
    .route('/')
    .post(uploadMixOfFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }], 'products'),
        addProduct)
    .get(allProducts)
productRouter
    .route('/:id')
    .get(getProduct)
    .put(uploadMixOfFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }], 'products'), updateProduct)
    .delete(deleteProduct)

export default productRouter