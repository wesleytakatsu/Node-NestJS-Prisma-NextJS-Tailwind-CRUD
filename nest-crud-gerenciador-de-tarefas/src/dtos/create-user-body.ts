import { IsNotEmpty, Length } from "class-validator";

export class CreateUserBody {
    @IsNotEmpty({
        message: 'name não pode ser vazio',
    })
    @Length(3, 50, {
        message: 'name deve ter entre 3 e 50 caracteres',
    })
    name: string;

    @IsNotEmpty({
        message: 'username não pode ser vazio',
    })
    @Length(3, 50, {
        message: 'username deve ter entre 3 e 50 caracteres',
    })
    username: string;

    @IsNotEmpty({
        message: 'password não pode ser vazio',
    })
    @Length(3, 50, {
        message: 'password deve ter entre 3 e 50 caracteres',
    })
    password: string;
}