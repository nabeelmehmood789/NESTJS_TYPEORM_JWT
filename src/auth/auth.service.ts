import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {JwtPayloadInterface} from "./jwt-payload.interface";


@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository)
                private  jwtService: JwtService,
                private userRepository: UserRepository) {
    }

    async signup(authCredentailsDto: AuthCredentialsDto) : Promise<void>{
        return this.userRepository.signup(authCredentailsDto);
    }

    async signin(authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken: string}>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException("Invalid Exception");
        }

        const payload  = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
}
