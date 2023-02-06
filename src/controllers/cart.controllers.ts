import { Request, Response } from "express";
import Carts from "../models/cart";


export async function createCart(req: Request, res: Response) {
  try {

    console.log("Saving Cart");
    console.log(req.body);
    const {
      IdCustomer,
      Products: [{
        _id, IdProducts,
        Name,
        Description,
        Amount,
        Total,
        UrlImage }],
    } = req.body;
    const Products = req.body.Products;
    const newCart = {
      IdCustomer: IdCustomer,
      Products: Products,
    };
    const cart = new Carts(newCart);
    await cart.save();
    console.log(cart);

    return res.json({
      message: "Cart succesfully saved",
    });
  } catch (error) {

  }

}

export async function getCarts(req: Request, res: Response): Promise<Response> {
  const cart = await Carts.find();
  return res.json(cart);
}
export async function getCartIdCostumer(req: Request, res: Response): Promise<Response> {
  const { IdCustomer } = req.body;
  const cart = await Carts.find({ IdCustomer: req.body.IdCustomer }, {});
  if(cart.length !==0){
    return res.json(cart)
  }else return res.json({message:'Nu hay camionsito precargado'});
}

export async function getCart(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const cart = await Carts.findById(id);
  console.log(req.params.id);
  return res.json({ cart });
}

export async function deleteCart(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const cart = await Carts.deleteMany({IdCustomer:id});
  return res.json({
    message: "Cart Delete",
    cart,
  });
}

export async function updateCart(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const {
    Products: [{
      IdProducts,
      Name,
      Description,
      Amount,
      Total,
      UrlImage }]
  } = req.body;
  const updateCart = await Carts.updateMany({IdCustomer:id},{Products: req.body.Products},
    { new: true }
  );
  return res.json({
    message: "Succesfullu Update",
    updateCart,
  });
}
