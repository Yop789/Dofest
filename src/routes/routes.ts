import { Router } from 'express';
//mport {helloWorld} from '../controllers/producto.controller'

import { createUser, getUser, getUsers, deleteUser, updateUser,autentificarse } from '../controllers/user.controllers'
import { createCart, getCart, getCarts, deleteCart, updateCart, getCartIdCostumer } from '../controllers/cart.controllers'
import { createOrder, getOrder, getOrders, deleteOrder, updateOrder } from '../controllers/order.controllers'
import { createProduct, getProduct, getProducts, deleteProduct, updateProduct, getType } from '../controllers/product.controllers'

import multer from '../libs/multer';

const router = Router();

router.route('/Products')
    .post(multer.single('imagePath'), createProduct)

router.route('/Product/:id')
    .get(getProduct)
    .delete(deleteProduct)
    .put(updateProduct)

router.route('/Product/type')
    .post(getType)
router.route('/Prod/type')
    .post(getProducts)

/*************************/
router.route('/users')
    .get(getUsers)
    .post(multer.single('image'), createUser)

router.route('/autentic')
    .post(autentificarse)

router.route('/User/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)

/*************************/
router.route('/Carts')
    .get(getCarts)
    .post(multer.single('image'), createCart)

router.route('/Cart/:id')
    .get(getCart)
    .delete(deleteCart)
    .put(updateCart)

router.route('/CartCostume')
    .post(getCartIdCostumer)



/*************************/
router.route('/Orders')
    .get(getOrders)
    .post(multer.single('file'), createOrder)

router.route('/Order/:id')
    .get(getOrder)
    .delete(deleteOrder)
    .put(updateOrder)
/*************************/

export default router;
