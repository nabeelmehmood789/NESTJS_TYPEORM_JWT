import {Controller, Post, Body, ValidationPipe, UseGuards, Req} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";
import {GetUser} from "./get-user.decorator";
import {User} from "./user.entity";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<void>{
        return this.authService.signup(authCredentialsDto);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken: string}>  {
        return this.authService.signin(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    // test(@Req() req){
   test(@GetUser() user:User){
        console.log(user);
    }
}
