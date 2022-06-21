import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
// import { RouteInMemoryRepository } from '../@core/infra/db/in-memory/route-in-memory.repository';
import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { RouteRepositoryInterface } from 'src/@core/domain/route.repository';
import { ListAllRoutesUseCase } from 'src/@core/application/list-all-routes.use-case';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { RouteSchema } from '../@core/infra/db/typeorm/route.schema';
import { RouteTypeOrmRepository } from 'src/@core/infra/db/typeorm/route-typeorm.repository';
import { DataSource } from 'typeorm';
import { Route } from 'src/@core/domain/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteSchema])],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide: RouteTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        const repoOrm = dataSource.getRepository(Route);
        return new RouteTypeOrmRepository(repoOrm);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface) => {
        return new CreateRouteUseCase(routeRepo);
      },
      inject: [RouteTypeOrmRepository], //aqui estou injetando o RouteTypeOrmRepository definido na linha 20
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface) => {
        return new ListAllRoutesUseCase(routeRepo);
      },
      inject: [RouteTypeOrmRepository],
    },
  ],
})
export class RoutesModule {}
