import { Controller, ParseIntPipe } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  //@Post()
  @MessagePattern({cmd: 'create_servicio'})
  create(@Payload() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  //@Get()
  @MessagePattern({cmd: 'find_all_servicios'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.serviciosService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd: 'find_one_servicio'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.serviciosService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'update_servicio'})
  update(@Payload() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(updateServicioDto.id, updateServicioDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd: 'delete_servicio'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.serviciosService.remove(id);
  }
}
