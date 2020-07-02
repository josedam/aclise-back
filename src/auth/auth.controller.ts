import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { JwtAccessToken } from './jwt-access-token.interface';
import { AuthSignupDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('/register')
    signUp(@Body(ValidationPipe) authSignupDto: AuthSignupDto): Promise<void> {
        return this.authService.signUp(authSignupDto);
    }

    @Post('/login')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<JwtAccessToken> {
        return this.authService.signIn(authCredentialDto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user: User) {
    //      console.log(user);
    // };

}
