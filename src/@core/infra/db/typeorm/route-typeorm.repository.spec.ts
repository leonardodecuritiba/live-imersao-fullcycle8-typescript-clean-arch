import { DataSource } from 'typeorm';
import { Route, RouteProps } from '../../../domain/route.entity';
import { RouteSchema } from './route.schema';
import { RouteTypeOrmRepository } from './route-typeorm.repository';

//FAZER O TESTE DO MEU REPOSITÓRIO
describe('RouteTypeOrmRepository Test', () => {
  it('should insert a new route', async () => {
    const dataSource = new DataSource({
      //vamos usar o sqlite
      type: 'sqlite',
      database: 'memory',
      synchronize: true,
      logging: false,
      entities: [RouteSchema], //aqui registro o meu mapeamento, e nao o meu Route puro
    });
    //Inicializando o dataSource
    await dataSource.initialize();

    const ormRepo = dataSource.getRepository(Route);
    const repository = new RouteTypeOrmRepository(ormRepo);
    const routeProps: RouteProps = {
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    const route = Route.create(routeProps);
    await repository.insert(route);

    const routeFound = await ormRepo.findOneBy({ id: route.id });
    expect(routeFound.toJSON()).toStrictEqual(route.toJSON());
  });
});
