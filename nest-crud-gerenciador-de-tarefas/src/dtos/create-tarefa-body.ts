import { IsNotEmpty, Length } from "class-validator";

export class CreateTarefaBody {
    @IsNotEmpty({
        message: 'title não pode ser vazio',
    })
    @Length(3, 50, {
        message: 'title deve ter entre 3 e 50 caracteres',
    })
    title: string;

    description: string;

    completed: boolean;

    @IsNotEmpty({
        message: 'userId não pode ser vazio',
    })
    @Length(3, 50, {
        message: 'userId deve ter entre 3 e 50 caracteres',
    })
    userId: string;
}