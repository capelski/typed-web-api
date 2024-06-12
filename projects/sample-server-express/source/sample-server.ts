import { useServerEndpoints } from '@typed-web-api/express';
import express from 'express';
import { weatherController } from './weather-controller';
import { weatherV2Controller } from './weather-v2-controller';
import { weatherV3Controller } from './weather-v3-controller';

const app = express();

app.use(express.json());

const apiRouter = express.Router();

useServerEndpoints(apiRouter, weatherController);

const v2Router = express.Router();
useServerEndpoints(v2Router, weatherV2Controller);
apiRouter.use('/v2', v2Router); // Controller prefix

useServerEndpoints(apiRouter, weatherV3Controller);

app.use('/api', apiRouter); // Global prefix

app.listen(process.env.PORT || 3080, () => {
  console.log('Server up and running!');
});
