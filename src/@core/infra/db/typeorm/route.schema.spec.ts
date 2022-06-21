import { Route } from '../../../domain/route.entity';
import { DataSource } from 'typeorm';
import { RouteSchema } from './route.schema';
describe('RouteSchema Tests', () => {
  //Aqui vamos testar uma criação com o banco de dados
  test('create', async () => {
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

    //estou gerando um objeto baseado na minha entidade rica
    const route = Route.create({
      title: 'minha rota',
      startPosition: { lat: 1, lng: 2 },
      endPosition: { lat: 3, lng: 4 },
      points: [{ lat: 3, lng: 4 }],
    });

    // e agora vou usar o meu dataSource para poder pegar o meu repositório
    //não confundir com o meu repositório puro que temos no nosso dominio,
    // é o repositorio do typeorm para poder salvar no banco
    const routeRepo = dataSource.getRepository(Route);
    await routeRepo.save(route);

    //agora vamos fazer uma consulta por garantia
    console.log(await routeRepo.findOneBy({ id: route.id }));
  });
});
