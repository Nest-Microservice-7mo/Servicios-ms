import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioDto } from './create-servicio.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateServicioDto extends PartialType(CreateServicioDto) 
{
    @IsNumber()
    @IsPositive()
    id: number;
}
