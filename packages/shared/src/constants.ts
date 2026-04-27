import type { Goal, ConsentItem } from './types';

export const GOALS: Goal[] = [
  { id: 'tech', label: 'Entrevista tech', sub: 'Backend, frontend, system design', icon: '◆' },
  { id: 'meetings', label: 'Reuniões em inglês', sub: 'Standups, planning, atualizações', icon: '◐' },
  { id: 'data', label: 'Apresentação de projeto', sub: 'IA, dados, dashboards', icon: '▲' },
  { id: 'support', label: 'Suporte ao cliente', sub: 'Atendimento, escalonamentos', icon: '●' },
  { id: 'sales', label: 'Vendas / clientes internacionais', sub: 'Discovery, demos, objeções', icon: '◇' },
];

export const CEFR_LABELS: Record<string, string> = {
  A1: 'iniciante',
  A2: 'básico',
  B1: 'intermediário',
  B2: 'intermediário avançado',
  C1: 'avançado',
  C2: 'fluente',
};

export const SCORE_WEIGHTS = {
  fluency: 0.20,
  relevance: 0.20,
  grammar: 0.15,
  vocabulary: 0.15,
  pronunciation: 0.15,
  professionalTone: 0.10,
  confidence: 0.05,
} as const;

export const SCORE_BANDS = [
  { min: 0, max: 39, labelPt: 'Precisa de base' },
  { min: 40, max: 59, labelPt: 'Comunica ideias básicas com dificuldade' },
  { min: 60, max: 74, labelPt: 'Comunica ideias principais, precisa refinar' },
  { min: 75, max: 89, labelPt: 'Pronto para cenários comuns de trabalho' },
  { min: 90, max: 100, labelPt: 'Comunicação profissional forte' },
] as const;

export const CONSENT_ITEMS: ConsentItem[] = [
  { id: 'voice', label: 'Aceito o processamento da minha voz para análise de inglês.', required: true },
  { id: 'ai', label: 'Aceito receber feedback gerado por IA em português.', required: true },
  { id: 'estimate', label: 'Entendo que as notas são estimativas educacionais — não certificação oficial.', required: true },
  { id: 'audio', label: 'Permitir armazenar áudio por 30 dias para revisão (opcional).', required: false },
];
