import { LatLng, Route } from "../domain/route.entity";
import { RouteRepositoryInterface } from "../domain/route.repository";

//caso de uso é responsável por manipular a entidade de la
//caso de uso é o priumeiro cliente das regras de negócio.
//objetivo é executar
//Na CA quando você olha o use-case você sabe o que você consegue usar


export class CreateRouteUseCase {
  //Caso de uso nao sabe como sera salvo os dados, mas utiliza de uma interface para
  //o repositório
  constructor(private routeRepo: RouteRepositoryInterface) {}

  //execute vai receber os dados de entradas e vai realizar as operações
  //encima das entidade
  //Como envolve o salvamento, 

  async execute(input: CreateRouteInput): Promise<CreateRouteOutput> {
    const route = new Route(input);
    //antes de devolver a minha rota, eu vou inserir ela em um lugar.
    //Por isso o meu caso de uso não é uma regra pura, pois envolve acessar um meio externo
    //Mas esse meio externo será encapsulado pelo meu repositório.
    //Aqui não faz contato direto com a lib de banco ou qualquer outra coisas
    await this.routeRepo.insert(route);

    //retornar os dados puros, para que a proxima camada
    //nao conheça a minha entidade
    return route.toJSON(); 
  }
}

type CreateRouteInput = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

type CreateRouteOutput = {  
  id: string,
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};