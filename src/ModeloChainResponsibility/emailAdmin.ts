import { transporter } from "../config/gmailTrasporter";
import { InterfaceEmil}  from "../ModeloChainResponsibility/enviarEmail";
export class EmailAdmin implements InterfaceEmil {
  TIPO_USER: String = "Admin";
  // Susesor!: InterfaceEmil;
  EmailAdmin() {}
  getEnviarEmail(typo: String, order: any) {
    console.log("Email a Administrador");
    transporter.sendMail({
      from: '"Frim" <davidenriquelopezjuarez08@gmail.com>', // sender address
      to: "davidenriquelopezjuarez08@gmail.com" , // list of receivers
      subject: "Notificasion de nueva orden", // Subject line
      html: "<h1 >Se realizo una orden</h1><h2 >Detalle de orden</h2><p >Al nombre de. " +
      order.FullNameUser +
      "</p><h3 >Fecha de orden</h3><p>Fecha de entrega. " +
      order.DateReturn +
      "</p><p >Cuando se recojen. " +
      order.DateDeliver +
      "</p><h3 >Costo de la orden</h3><p >total $ " +
      order.TotalPrecio +
      "</p>", // html body
    });
    
  }
}
