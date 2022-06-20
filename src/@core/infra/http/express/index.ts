import express, { Express, Request, Response } from 'express';
import { CreateRouteUseCase } from '../../../application/create-route.use-case';
import { ListAllRoutesUseCase } from '../../../application/list-all-routes.use-case';
import { RouteInMemoryRepository } from '../../db/in-memory/route-in-memory.repository';

const port = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());

//Repositório a ser mantido em memória
const routeRepo = new RouteInMemoryRepository();

app.get('/routes', async (_req: Request, res: Response) => {
  const listAllUseCase = new ListAllRoutesUseCase(routeRepo);
  const output = await listAllUseCase.execute();
  res.json(output);
});

app.post('/routes', async (req: Request, res: Response) => {
  //a sujeira do nosso software fica nas camadas mais externas
  const createUseCase = new CreateRouteUseCase(routeRepo);
  const output = await createUseCase.execute(req.body);
  //201 estou criando o recurso de rota
  res.status(201).json(output);
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
