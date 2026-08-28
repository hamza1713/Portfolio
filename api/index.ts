import 'dotenv/config';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { registerOAuthRoutes } from '../server/_core/oauth';
import { registerStorageProxy } from '../server/_core/storageProxy';
import { logger } from '../server/_core/logger';
import { appRouter } from '../server/routers';
import { createContext } from '../server/_core/context';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
registerStorageProxy(app);
registerOAuthRoutes(app);

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
    onError({ path, error, req }) {
      if (error.code !== 'UNAUTHORIZED' && error.code !== 'FORBIDDEN' && error.code !== 'TOO_MANY_REQUESTS') {
        logger.error('tRPC', `Error in procedure [${path ?? 'unknown'}]`, error, {
          path,
          ip: req.ip,
        });
      }
    },
  })
);

export default app;
