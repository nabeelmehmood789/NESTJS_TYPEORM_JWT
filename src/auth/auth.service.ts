import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository)
                private userRepository: UserRepository) {

    }

    async signup(authCredentailsDto: AuthCredentialsDto) : Promise<void>{
        return this.userRepository.signup(authCredentailsDto);
    }

    async signin(authCredentialsDto: AuthCredentialsDto){
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException("Invalid Exception");
        }
    }
}
