import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException, UnauthorizedException, Logger } from "@nestjs/common";
import { UserRol } from "./user-rol-enum";
import { AuthSignupDto } from "./dto/auth-signup.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authSignupDto: AuthSignupDto): Promise<void> {
        const {username, password, fullname } = authSignupDto;
        const user = new User(); // this.create(); //new User();
       
        user.username = username;
        user.rol = UserRol.USER;
        await user.setPassword(password);
        user.fullname = fullname;
        user.email = username;

        try {
            await this.save(user); 
 
        } catch (error) {
            Logger.error(error);

            if(error.code == 'ER_DUP_ENTRY'){
                Logger.warn('registro duplicado')
                throw new ConflictException('UserName already exist ...');
            } else {
                Logger.warn('Otro error...')
                throw new InternalServerErrorException();
            }
        }
    }
   
    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const {username, password} = authCredentialsDto;
        const user = await this.validateUser(username);  // findOne({username});

        return await this.validatePassword(user, password);
    }

    async validatePassword(user: User, password: string): Promise<User> {
        if(!(await user.validatePassword(password))) {
            throw new UnauthorizedException('Credenciales Incorrectas');
        }
        return user; // .username;
    }

    async validateUser(username: string): Promise<User> {
        const user = await this.findOne({username});
        if(! user) {
            throw new UnauthorizedException('Credenciales Incorrectas');
        }
        return user;
    }
}