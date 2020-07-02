import { IsString, MinLength, MaxLength  } from "class-validator";

export class AuthCredentialsDto {

    @IsString({message:'.'})
    @MinLength(4,{message:'.'})
    @MaxLength(20,{message:'.'})
    username: string;

    @IsString({message:'.'})
    @MinLength(8,{message:'.'})
    @MaxLength(20, {message:'.'})
    password: string;
}