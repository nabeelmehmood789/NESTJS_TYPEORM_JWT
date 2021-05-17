import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {JwtPayloadInterface} from "./jwt-payload.interface";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository)
                private userRepository: UserRepository,
                private jwtService: JwtService) {
    }
    // constructor(
    //     @InjectRepository(UserRepository)
    //     private userRepository: UserRepository,
    //     private jwtService: JwtService) {
    // }

    async signup(authCredentailsDto: AuthCredentialsDto) : Promise<void>{
        return this.userRepository.signup(authCredentailsDto);
    }

    async signin(authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken: string}>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException("Invalid Exception");
        }

        const payload : JwtPayloadInterface  = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
}
