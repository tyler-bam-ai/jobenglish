import { Hono } from 'hono';

const DEMO_SCENARIOS = [
  {
    id: '1', title: 'Tell me about yourself', titlePt: 'Fale sobre você',
    description: 'Classic tech interview opening question',
    careerTrack: 'tech', difficulty: 'beginner',
    aiRole: 'Sarah, Senior Technical Recruiter', estimatedMinutes: 5, isActive: true,
  },
  {
    id: '2', title: 'Explain a backend project', titlePt: 'Explique um projeto backend',
    description: 'Deep-dive into a backend project you built',
    careerTrack: 'tech', difficulty: 'intermediate',
    aiRole: 'Marcus, Senior Tech Interviewer', estimatedMinutes: 7, isActive: true,
  },
  {
    id: '3', title: 'Daily standup update', titlePt: 'Atualização no standup diário',
    description: 'Give a clear status update in a daily standup',
    careerTrack: 'meetings', difficulty: 'beginner',
    aiRole: 'James, Engineering Manager', estimatedMinutes: 3, isActive: true,
  },
  {
    id: '4', title: 'Explaining a blocker', titlePt: 'Explicando um bloqueio',
    description: 'Communicate a technical blocker clearly',
    careerTrack: 'meetings', difficulty: 'intermediate',
    aiRole: 'Emily, Product Manager', estimatedMinutes: 5, isActive: true,
  },
  {
    id: '5', title: 'Present dashboard insights', titlePt: 'Apresente insights de dashboard',
    description: 'Walk stakeholders through key metrics',
    careerTrack: 'data', difficulty: 'intermediate',
    aiRole: 'David, VP of Product', estimatedMinutes: 7, isActive: true,
  },
  {
    id: '6', title: 'Explain model accuracy', titlePt: 'Explique a acurácia do modelo',
    description: 'Explain ML model performance to non-technical audience',
    careerTrack: 'data', difficulty: 'advanced',
    aiRole: 'Lisa, Chief Data Officer', estimatedMinutes: 7, isActive: true,
  },
  {
    id: '7', title: 'Handle an angry customer', titlePt: 'Atenda um cliente irritado',
    description: 'De-escalate and resolve a customer complaint',
    careerTrack: 'support', difficulty: 'intermediate',
    aiRole: 'Robert, Angry Customer', estimatedMinutes: 5, isActive: true,
  },
  {
    id: '8', title: 'Technical troubleshooting', titlePt: 'Troubleshooting técnico',
    description: 'Guide a customer through a technical issue',
    careerTrack: 'support', difficulty: 'intermediate',
    aiRole: 'Karen, Non-technical Customer', estimatedMinutes: 7, isActive: true,
  },
  {
    id: '9', title: 'Discovery call', titlePt: 'Chamada de discovery',
    description: 'Understand prospect needs and qualify the opportunity',
    careerTrack: 'sales', difficulty: 'intermediate',
    aiRole: 'Alex, VP of Engineering', estimatedMinutes: 7, isActive: true,
  },
  {
    id: '10', title: 'Handle a pricing objection', titlePt: 'Responda objeção de preço',
    description: 'Address pricing concerns while maintaining value',
    careerTrack: 'sales', difficulty: 'advanced',
    aiRole: 'Michelle, Procurement Director', estimatedMinutes: 5, isActive: true,
  },
];

export const scenarioRoutes = new Hono();

scenarioRoutes.get('/', (c) => {
  const track = c.req.query('track');
  const difficulty = c.req.query('difficulty');
  let filtered = DEMO_SCENARIOS.filter(s => s.isActive);
  if (track) filtered = filtered.filter(s => s.careerTrack === track);
  if (difficulty) filtered = filtered.filter(s => s.difficulty === difficulty);
  return c.json({ scenarios: filtered, total: filtered.length });
});

scenarioRoutes.get('/:id', (c) => {
  const scenario = DEMO_SCENARIOS.find(s => s.id === c.req.param('id'));
  if (!scenario) return c.json({ error: 'Scenario not found' }, 404);
  return c.json(scenario);
});
