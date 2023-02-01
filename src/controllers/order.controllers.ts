import { Request, Response } from "express";
import Orders from "../models/order";
import Products from "..//models/product";
import { EmailCliente } from "../ModeloChainResponsibility/emailCliente";
import { EmailAdmin } from "../ModeloChainResponsibility/emailAdmin"
//export function helloWorld(req:Request, res:Response):Response{
//return res.send('Hello World!')}

export async function createOrder(req: Request, res: Response) {
  console.log("Saving Order");
  console.log(req.body);
  const {
    IdCustomer,
    Status,
    FullNameUser,
    Paid,
    Municipio,
    Comunidad,
    Calle,
    Numero,
    Email,
    Telefone,
    DateDeliver,
    DateEvent,
    DateReturn,
    Dias,
    TotalPrecio,
    Products: [{ _id, IdProducts, Name, Description, Amount, Total, UrlImage }],
  } = req.body;
  const Product = req.body.Products;
  const newOrder = {
    IdCustomer,
    Status: Status,
    FullNameUser: FullNameUser,
    Paid: Paid,
    Municipio: Municipio,
    Comunidad: Comunidad,
    Calle: Calle,
    Numero: Numero,
    Email: Email,
    Telefone: Telefone,
    DateDeliver: DateDeliver,
    DateEvent: DateEvent,
    DateReturn: DateReturn,
    Dias: Dias,
    TotalPrecio: TotalPrecio,
    Products: Product,
  };
  const order = new Orders(newOrder);
  // Product.forEach(async function (value: any) {
  //   const i = value.IdProducts
  //   const product = await getProduct(i);
  //   const amout = Number(value.Amount);
  //   const tStock= Number(product?.TotalStock);
  //   const totalStock = tStock-amout;;
  //   const updateOrder = await Products.update({ _id: i },{ $set:{TotalStock:totalStock} });    
  // });
  const emailAdmin = new EmailAdmin();
  const emailCliente = new EmailCliente(emailAdmin);
  emailCliente.getEnviarEmail("Admin",order);
  emailCliente.getEnviarEmail("cliente",order);
  await order.save();
  console.log(order);

  return res.json({
    message: "Order succesfully saved",
  });
}

export async function getOrders(
  req: Request,
  res: Response
): Promise<Response> {
  const order = await Orders.find();
  return res.json(order);
}
export async function getProduct(id: string) {
  const l = id;
  const product = await Products.findById(id);
  return product;
}

export async function getOrder(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const order = await Orders.findById(id);
  console.log(req.params.id);
  return res.json({ order });
}

export async function deleteOrder(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const order = await Orders.findByIdAndRemove(id);
  return res.json({
    message: "Order Delete",
    order,
  });
}

export async function updateOrder(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const {
    IdCustomer,
    Status,
    FullNameUser,
    Paid,
    Municipio,
    Comunidad,
    Calle,
    Numero,
    Email,
    Telefone,
    DateDeliver,
    DateEvent,
    DateReturn,
    Dias,
    TotalPrecio,
    Products: [{ _id, IdProducts, Name, Description, Amount, Total, UrlImage }],
  } = req.body;
  const Product = req.body.Products;
  const updateOrder = await Orders.findByIdAndUpdate(
    id,
    {
      IdCustomer,
      Status,
      FullNameUser,
      Paid,
      Municipio,
      Comunidad,
      Calle,
      Numero,
      Email,
      Telefone,
      DateDeliver,
      DateEvent,
      DateReturn,
      Dias,
      TotalPrecio,
      Product,
    },
    { new: true }
  );
  return res.json({
    message: "Succesfullu Update",
    updateOrder,
  });
}
