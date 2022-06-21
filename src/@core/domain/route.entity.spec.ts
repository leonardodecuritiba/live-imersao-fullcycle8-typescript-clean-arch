import { LatLng, Route, RouteProps } from './route.entity';

//AQUI VAO OS MEUS TESTES DO MEU ROUTE ENTITY AND
describe('Route Tests', () => {
  test('constructor', () => {
    //Definindo meu objeto
    let routeProps: RouteProps = {
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    //criando o meu objecto Route
    let route = Route.create(routeProps);
    //testando se foi de fato criado
    expect(route.props).toStrictEqual({
      ...routeProps,
      points: [],
    });

    //FAZENDO OUTRO TESTE, AGORA COM POINTS

    routeProps = {
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
      points: [{ lat: 10, lng: 11 }],
    };
    route = Route.create(routeProps);
    expect(route.id).toBeDefined();
    //testando, se criou com os pontos
    expect(route.props).toStrictEqual({
      ...routeProps,
      points: [{ lat: 10, lng: 11 }],
    });
  });

  //Novo teste agora para update de titulo
  test('updateTitle method', () => {
    const routeProps: RouteProps = {
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    const route = Route.create(routeProps);
    route.updateTitle('title updated');
    expect(route.title).toBe('title updated');
  });

  test('updatePosition method', () => {
    const routeProps: RouteProps = {
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    const route = Route.create(routeProps);
    const startPosition: LatLng = { lat: 10, lng: 20 };
    const endPosition: LatLng = { lat: 30, lng: 40 };
    route.updatePosition(startPosition, endPosition);
    expect(route.startPosition).toBe(startPosition);
    expect(route.endPosition).toBe(endPosition);
  });

  test('updatePoints method', () => {
    const routeProps: RouteProps = {
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    const route = Route.create(routeProps);
    const points: LatLng[] = [{ lat: 10, lng: 20 }];
    route.updatePoints(points);
    expect(route.points).toHaveLength(1);
    expect(route.points).toStrictEqual(points);
  });
});
