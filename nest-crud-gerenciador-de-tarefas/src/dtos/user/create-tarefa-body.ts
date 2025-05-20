import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTarefaBody {
    @ApiProperty({
        example: 'Café com Coca-Cola',
        description: 'Título da tarefa',
        minLength: 3,
        maxLength: 50,
    })
    @IsNotEmpty({ message: 'title não pode ser vazio' })
    @Length(3, 50, { message: 'title deve ter entre 3 e 50 caracteres' })
    title: string;

    @ApiProperty({
        example: 'Para ficar acordado para estudar',
        description: 'Descrição da tarefa',
        required: false, // se for opcional no seu sistema
    })
    description: string;

    @ApiProperty({
        example: false,
        description: 'Indica se a tarefa já foi concluída',
        required: false,
    })
    completed?: boolean;

    @ApiProperty({
        example: 'cmaue8jwv0000wsyj7pakmii2',
        description: 'ID do usuário dono da tarefa',
        minLength: 3,
        maxLength: 50,
    })
    @IsNotEmpty({ message: 'userId não pode ser vazio' })
    @Length(3, 50, { message: 'userId deve ter entre 3 e 50 caracteres' })
    userId: string;
}
