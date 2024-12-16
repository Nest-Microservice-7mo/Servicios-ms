import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ServiciosService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Servicio Service')

  onModuleInit() {
    this.$connect();
    this.logger.log('Base de Datos Conectada');
  }

  create(createServicioDto: CreateServicioDto) {
    return this.servicio.create({
      data: createServicioDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.servicio.count({where:{available:true}});
    const lastPage = Math.ceil(totalPages / limit);

    if(page > lastPage) {
      return {
        message: `La página ${page} no existe`,
        meta: {
          total: totalPages,
          page: page,
          lastPage: lastPage
        }
      }
    }

    return {
      data: await this.servicio.findMany({
        skip: ( page - 1 ) * limit,
        take: limit,
        where: { available: true }
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    const servicio = await this.servicio.findFirst({where: {id, available:true}})
    if (!servicio) {
      throw new RpcException({
        message: `Servicio con ID #${id} no encontrado`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    return servicio;
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    await this.findOne(id);
    const { id:__, ...data } = updateServicioDto;
    const servicio = await this.servicio.update({
      where: {id},
      data: data
    });
    return servicio;
  }

  async remove(id: number) {
    await this.findOne(id);
    const servicio = await this.servicio.update({
      where: {id},
      data: {available: false}
    });
    return servicio;
  }
}
