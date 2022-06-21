import { Repository } from 'typeorm';
import { Route } from '../../../domain/route.entity';
import { RouteRepositoryInterface } from '../../../domain/route.repository';

export class RouteTypeOrmRepository implements RouteRepositoryInterface {
  /*
  Agora vou criar um repositorio baseado no typeorm
  Eu não quero criar conexão com banco de dados ou configurar esse repositório.
  Preciso ter o repositório dele
  EU preciso fazer uma injeção de dependencia (private ormRepo: Repository)
  E ainda irei passar que é um repositório para a entidade pura Route, por isso <Route>
  */
  constructor(private ormRepo: Repository<Route>) {}

  async insert(route: Route): Promise<void> {
    await this.ormRepo.save(route);
  }

  findAll(): Promise<Route[]> {
    return this.ormRepo.find();
  }
}
