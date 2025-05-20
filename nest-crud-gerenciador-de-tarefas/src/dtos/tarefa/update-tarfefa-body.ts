import { PartialType } from '@nestjs/swagger';
import { CreateTarefaBody } from './create-tarefa-body';

export class UpdateTarefaBody extends PartialType(CreateTarefaBody) {}