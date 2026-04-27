import { Hono } from 'hono';

const sessions = new Map<string, {
  id: string;
  scenarioId: string;
  status: string;
  startedAt: string;
  turnCount: number;
  utterances: { speaker: string; text: string; timestamp: string }[];
}>();

export const sessionRoutes = new Hono();

sessionRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const { scenarioId } = body;
  if (!scenarioId) return c.json({ error: 'scenarioId is required' }, 400);

  const id = crypto.randomUUID();
  const session = {
    id,
    scenarioId,
    status: 'in_progress',
    startedAt: new Date().toISOString(),
    turnCount: 0,
    utterances: [] as { speaker: string; text: string; timestamp: string }[],
  };
  sessions.set(id, session);
  return c.json(session, 201);
});

sessionRoutes.get('/:id', (c) => {
  const session = sessions.get(c.req.param('id'));
  if (!session) return c.json({ error: 'Session not found' }, 404);
  return c.json(session);
});

sessionRoutes.post('/:id/end', (c) => {
  const session = sessions.get(c.req.param('id'));
  if (!session) return c.json({ error: 'Session not found' }, 404);
  session.status = 'completed';
  return c.json(session);
});

sessionRoutes.post('/:id/utterances', async (c) => {
  const session = sessions.get(c.req.param('id'));
  if (!session) return c.json({ error: 'Session not found' }, 404);
  const { speaker, text } = await c.req.json();
  session.utterances.push({ speaker, text, timestamp: new Date().toISOString() });
  session.turnCount = session.utterances.length;
  return c.json({ ok: true, turnCount: session.turnCount });
});
