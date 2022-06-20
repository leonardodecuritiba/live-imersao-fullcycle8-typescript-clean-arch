import { Route } from '../../../domain/route.entity';
import { RouteRepositoryInterface } from '../../../domain/route.repository';

//É a Implementação da minha interface
//Aqui eu faria a implementação do armazenamento do banco de dados por exemplo
export class RouteInMemoryRepository implements RouteRepositoryInterface {
  items: Route[] = [];
  async insert(route: Route): Promise<void> {
    this.items.push(route);
  }

  async findAll(): Promise<Route[]> {
    return this.items;
  }
}
