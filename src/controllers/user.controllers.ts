import { Request, Response } from "express";
import User from "../models/User";
import * as CryptoJS from 'crypto-js';

export async function createUser(req: Request, res: Response) {
  console.log("Saving User");
  console.log(req.body);
  const {
    Name,
    LastName,
    E_mail,
    Password,
    Latitude,
    Lenght,
    Customer,
    Admin,
  } = req.body;
  const newUser = {
    Name: Name,
    LastName: LastName,
    E_mail: E_mail,
    Password: Password,
    Latitude: Latitude,
    Lenght: Lenght,
    Customer: Customer,
    Admin: Admin,
  };
  const user = new User(newUser);
  await user.save();
  console.log(user);

  return res.json({
    message: "User succesfully saved",
  });
}

export async function getUsers(
  _req: Request,
  res: Response
): Promise<Response> {
  const user = await User.find();
  return res.json(user);
}
export async function autentificarse(
  req: Request,
  res: Response
): Promise<any> {
  
  const { E_mail, Password } = req.body;
  console.log(E_mail);
  try {
    const user = await User.find({ E_mail: E_mail }, function (err, doc) {
      let d= desemcriptar(doc[0].Password);
      let d2=desemcriptar(Password)
      if (!doc) {
        return res.json({ message: "Email incorrecto" });        
      } else if (d !== d2) {
        return res.json({ message: "Contraseña incorrecta" });
      } else {
        return res.json({ doc,message: "session started correctly" });
      }
    });
    
  } catch (error) {
    console.error(error);   
  }
}
export async function getUser(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const user = await User.findById(id);
  console.log(req.params.id);
  return res.json({ user });
}

export async function deleteUser(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const user = await User.findByIdAndRemove(id);
  return res.json({
    message: "Comunidad Delete",
    user,
  });
}

export async function updateUser(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const {
    Name,
    LastName,
    E_mail,
    Password,
    Latitude,
    Lenght,
    Customer,
    Admin,
  } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      Name,
      LastName,
      E_mail,
      Password,
      Latitude,
      Lenght,
      Customer,
      Admin,
    },
    { new: true }
  );
  return res.json({
    message: "Succesfullu Update",
    updateUser,
  });
}
export function desemcriptar(t:string){
  const secretKey='YourSecretKeyForEncryption&Descryption'
  return CryptoJS.AES.decrypt(t, secretKey.trim()).toString(
    CryptoJS.enc.Utf8
  );
}

