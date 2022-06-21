import crypto from 'crypto';

export type LatLng = { lat: number; lng: number }; //Declaração do tipo

//Definindo minhas propriedades da minha entidade Route
export type RouteProps = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[]; //É uma propriedade opcional
};

//Será minha entidade rota
export class Route {
  // Required: É um agente que irá forçar que todas as propriedades sejam obrigatórias
  // com exceção de points
  public readonly id: string;
  public props: Required<RouteProps>;
  private constructor(props: RouteProps, id?: string) {
    this.id = id || crypto.randomUUID();

    //vamos flexibilizar a instanciação do meu Route, pois o typeorm
    //precisa instanciar, com ele vazio.
    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }

    this.props = {
      ...props,
      points: props.points || [], //precisa quebrar pois pode ser vazio, se props.points for vazio, vai iniciar com []
    };
  }

  /*
  Agora na programação, eu vou ser obrigado a usar uma função "factory", para instanciar o objeto da classe.
  O ORM vai usar o construtor convencional, onde será permitido as propriedades vazias. 
  Mas em programação, a gente protegeu com o create:
  */
  static create(props: RouteProps, id?: string) {
    return new Route(props, id);
  }
  // Atualizando o meu title, a alteraçao das propriedades da minha entidade
  // ficarão sempre a cargo da minha entidade, pois fazem parte da regra de negócio.
  // Qualquer regra de negócio precisa ser executada pelos metodos das Entidades
  // Entidades anêmicas é ficar usando set para fazer as coisas, nao deixando claro
  // as regras de negócio.

  updateTitle(title: string) {
    this.title = title;
    //Outras coisas que eu poderia fazer
    //mudar pra maiúsculo
    //valor alguns caracteres
    //validações
  }

  //updatePosition é muito mais que um setter, ele envolve a regra de meu negocio
  updatePosition(startPosition: LatLng, endPosition: LatLng) {
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    //mudar pra maiúsculo
    //valor alguns caracteres
    //validações
  }

  //updatePoints é muito mais que um setter, ele envolve a regra de meu negocio
  updatePoints(points: LatLng[]) {
    this.points = points;
    //mudar pra maiúsculo
    //valor alguns caracteres
    //validações
  }

  get title() {
    return this.props.title;
  }

  private set title(value: string) {
    this.props.title = value;
  }

  get startPosition() {
    return this.props.startPosition;
  }

  private set startPosition(value: LatLng) {
    this.props.startPosition = value;
  }

  get endPosition() {
    return this.props.endPosition;
  }

  private set endPosition(value: LatLng) {
    this.props.endPosition = value;
  }

  get points() {
    return this.props.points;
  }

  private set points(value: LatLng[]) {
    this.props.points = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
