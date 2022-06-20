import { Route } from './route.entity';

//Essa é uma interface para que eu possa fazer uma inversão de dependencia (DIP)
//Isso é um adaptador
export interface RouteRepositoryInterface {
  insert(route: Route): Promise<void>;
  findAll(): Promise<Route[]>;
}
