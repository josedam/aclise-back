import { MinLength,  Matches,  IsEmail } from "class-validator";

export class AuthSignupDto {

   
    @MinLength(1,{message: 'eMail es Requerido'})
    @IsEmail()
    username: string;

    @MinLength(8,{message:'Clave debe tener al Menos 8 Caracteres'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message: 'Clave debe contener letras Mayusculas, Minusculas y Numeros'})
    password: string;

    @MinLength(1,{message: 'Nombre es Requerido'})
    fullname: string;
   
}