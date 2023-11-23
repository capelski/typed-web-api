import { useServerEndpoints } from '@typed-web-api/express-server';
import express from 'express';
import { fullPathsController } from './full-paths-controller';
import { partialPathsController } from './partial-paths-controller';

const app = express();

app.use(express.json());

useServerEndpoints(app, fullPathsController);

useServerEndpoints(app, partialPathsController);

const router = express.Router();
useServerEndpoints(router, partialPathsController);
app.use('/express-router', router);

app.listen(process.env.PORT || 3001, () => {
  console.log('Server up and running!');
});
