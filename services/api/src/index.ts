import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { scenarioRoutes } from './routes/scenarios';
import { sessionRoutes } from './routes/sessions';

const app = new Hono();

app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get('/health', (c) => c.json({
  status: 'ok',
  service: 'jobenglish-api',
  timestamp: new Date().toISOString(),
}));

app.route('/api/scenarios', scenarioRoutes);
app.route('/api/sessions', sessionRoutes);

app.notFound((c) => c.json({ error: 'Not found' }, 404));

app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

const port = parseInt(process.env.PORT ?? '4000', 10);
console.log(`JobEnglish API server starting on port ${port}`);

serve({ fetch: app.fetch, port });

export default app;
