import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { RouteInMemoryRepository } from 'src/@core/infra/db/route-in-memory.repository';
import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { RouteRepositoryInterface } from 'src/@core/domain/route.repository';
import { ListAllRoutesUseCase } from 'src/@core/application/list-all-routes.use-case';

@Module({
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide: RouteInMemoryRepository,
      useClass: RouteInMemoryRepository,
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface) => {
        return new CreateRouteUseCase(routeRepo);
      },
      inject: [RouteInMemoryRepository],
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface) => {
        return new ListAllRoutesUseCase(routeRepo);
      },
      inject: [RouteInMemoryRepository],
    },
  ],
})
export class RoutesModule {}
