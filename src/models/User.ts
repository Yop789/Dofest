import {Schema, model, Document} from 'mongoose';

const user = new Schema({
    Name: 		String,
	LastName: 	String,
    E_mail:		String,
	Password: 	String,
	Municipio: 	String,
    Comunidad: 	String,
    Calle: 		String,
    Numero: 	String,
	Customer: 	Boolean,
	Admin: 		Boolean
},{collection:'users',
versionKey: false //here
});

interface IUser extends Document{
    Name:       string,
	LastName:   string,
    E_mail:     string,
	Password: 	string,
	Municipio:  String,
    Comunidad:  String,
    Calle:      String,
    Numero:     String,
	Customer:   boolean,
	Admin:      boolean
}

export default model <IUser>('Users',user);