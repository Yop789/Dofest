import { InterfaceEmil } from "../ModeloChainResponsibility/enviarEmail";
import { transporter } from "../config/gmailTrasporter";
export class EmailCliente implements InterfaceEmil {
  TIPO_USER: string = "cliente";
  Susesor!: InterfaceEmil;
  constructor(s: InterfaceEmil) {
    this.Susesor = s;
  }
  getEnviarEmail(typo: String, order: any) {
    if (typo === this.TIPO_USER) {
      transporter.sendMail({
        from: '"Frim" <davidenriquelopezjuarez08@gmail.com>', // sender address
        to: "" + order.Email, // list of receivers
        subject: "Tu orde se realizo con la siguientes caracteristicas", // Subject line
        html:
          "<h1 >ORDEN DE SERVICIO DOFEST</h1><h2 >Detalle de orden</h2><p >Nombre del cliente. " +
          order.FullNameUser +
          " </p><p >Estado de la Orden. " +
          order.Paid +
          "</p><h3 >Direccion</h3><p >Municipio. " +
          order.Municipio +
          "</p><p >Comunidad / colonia. " +
          order.Comunidad +
          "</p><p >Calle. " +
          order.Calle +
          "</p><p >Numero de de hogar. " +
          order.Numero +
          "</p><h3 >Datos de contacto</h3><p >Email. " +
          order.Email +
          "</p><p >Telefono. " +
          order.Telefone +
          "</p><h3 >Fecha de orden</h3><p>Fecha de entrega. " +
          order.DateReturn +
          "</p><p >Cuando se recojen. " +
          order.DateDeliver +
          "</p><h3 >Costo de la orden</h3><p >total $ " +
          order.TotalPrecio +
          "</p>"+ "Gracias por su preferencia Att. Dofest", // html body
      });
      console.log("Email a Cliente" + order.Email);
    } else {
      this.Susesor.getEnviarEmail(typo, order);
    }
  }
}
