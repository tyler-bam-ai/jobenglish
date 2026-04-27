'use client';

import { createContext, useContext } from 'react';

export type Lang = 'pt' | 'en';

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'pt',
  setLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

export const t: Record<string, Record<Lang, string>> = {
  // Welcome
  tagline: { pt: '━━ SEU SIMULADOR DE INGLÊS PROFISSIONAL', en: '━━ YOUR PROFESSIONAL ENGLISH SIMULATOR' },
  heroTitle1: { pt: 'Treine o inglês', en: 'Train the English' },
  heroTitle2: { pt: 'que sua carreira precisa.', en: 'your career needs.' },
  heroSub: { pt: 'Simule entrevistas, reuniões e apresentações em inglês com IA — e receba feedback em português.', en: 'Simulate interviews, meetings, and presentations in English with AI — and get feedback in your language.' },
  ctaStart: { pt: 'Começar diagnóstico grátis', en: 'Start free diagnostic' },
  ctaLogin: { pt: 'Já tenho conta · Entrar', en: 'I have an account · Log in' },
  socialProof: { pt: '+312 brasileiros praticaram esta semana', en: '+312 Brazilians practiced this week' },

  // Goal
  goalTitle1: { pt: 'Onde você quer falar inglês', en: 'Where do you want to speak English' },
  goalTitle2: { pt: 'com confiança?', en: 'with confidence?' },
  goalSub: { pt: 'Escolha um foco principal — você pode mudar depois.', en: 'Pick a main focus — you can change later.' },
  goalContinue: { pt: 'Continuar →', en: 'Continue →' },
  stepGoal: { pt: 'PASSO 01 · OBJETIVO', en: 'STEP 01 · GOAL' },

  // Consent
  consentTitle1: { pt: 'Antes de começar,', en: 'Before we start,' },
  consentTitle2: { pt: 'uns combinados.', en: 'a few agreements.' },
  consentSub: { pt: 'Para gerar feedback, vamos processar sua voz, transcrição e respostas. Você pode excluir tudo quando quiser.', en: 'To generate feedback, we\'ll process your voice, transcription and responses. You can delete everything anytime.' },
  consentAccept: { pt: 'Concordo · Continuar →', en: 'I agree · Continue →' },
  consentRequired: { pt: 'Aceite os itens obrigatórios', en: 'Accept required items' },
  rightsLabel: { pt: 'SEUS DIREITOS · ', en: 'YOUR RIGHTS · ' },
  rightsText: { pt: 'Acessar, corrigir, exportar e excluir seus dados a qualquer momento em', en: 'Access, correct, export, and delete your data anytime in' },

  // Diagnostic
  diagTitle1: { pt: 'Responda em', en: 'Answer in' },
  diagTitle2: { pt: 'inglês', en: 'English' },
  diagTitle3: { pt: ', do seu jeito.', en: ', in your own way.' },
  diagStep: { pt: 'DIAGNÓSTICO · 1 DE 5', en: 'DIAGNOSTIC · 1 OF 5' },
  diagRecording: { pt: '● GRAVANDO', en: '● RECORDING' },
  diagRecorded: { pt: '✓ GRAVADO', en: '✓ RECORDED' },
  diagTap: { pt: 'TOQUE PARA GRAVAR', en: 'TAP TO RECORD' },
  diagSubmit: { pt: 'Enviar resposta →', en: 'Submit answer →' },
  diagRecord: { pt: 'Grave para continuar', en: 'Record to continue' },
  diagRerecord: { pt: '↻ Regravar', en: '↻ Re-record' },
  diagListen: { pt: '♪ Ouvir', en: '♪ Listen' },

  // Home
  greeting: { pt: 'Olá! 👋', en: 'Hello! 👋' },
  homeTitle1: { pt: 'Sua entrevista', en: 'Your interview' },
  homeTitle2: { pt: 'está mais perto.', en: 'is getting closer.' },
  currentLevel: { pt: 'NÍVEL ATUAL', en: 'CURRENT LEVEL' },
  intermediate: { pt: 'intermediário', en: 'intermediate' },
  keepGoing: { pt: 'continue assim', en: 'keep it up' },
  todayPractice: { pt: '━━ PRÁTICA DE HOJE', en: '━━ TODAY\'S PRACTICE' },
  focus: { pt: 'Foco: fluência + frases naturais', en: 'Focus: fluency + natural phrases' },
  weeklyGoal: { pt: 'Meta semanal', en: 'Weekly goal' },
  weeklyRemaining: { pt: 'Mais 27 minutos para fechar a semana', en: '27 more minutes to close the week' },
  days: { pt: 'dias', en: 'days' },

  // Roleplay
  liveRoleplay: { pt: '● AO VIVO · IA ROLEPLAY', en: '● LIVE · AI ROLEPLAY' },
  finish: { pt: 'Finalizar', en: 'Finish' },
  listening: { pt: 'ESCUTANDO...', en: 'LISTENING...' },

  // Feedback
  sessionComplete: { pt: '● SESSÃO COMPLETA', en: '● SESSION COMPLETE' },
  overallScore: { pt: 'SCORE GERAL', en: 'OVERALL SCORE' },
  feedbackTitle1: { pt: 'Você comunicou bem', en: 'You communicated well' },
  feedbackTitle2: { pt: 'a ideia principal.', en: 'the main idea.' },
  vsAttempt: { pt: '↑ +9 vs. tentativa 1', en: '↑ +9 vs. attempt 1' },
  workReady: { pt: 'Work-ready em cenários comuns.', en: 'Work-ready in common scenarios.' },
  workReadySub: { pt: 'Vamos deixar seu inglês mais natural para entrevistas.', en: 'Let\'s make your English more natural for interviews.' },
  skills: { pt: '━━ HABILIDADES', en: '━━ SKILLS' },
  thisSession: { pt: 'nesta sessão', en: 'this session' },
  corrections: { pt: '━━ TOP 3 CORREÇÕES', en: '━━ TOP 3 CORRECTIONS' },
  youSaid: { pt: 'VOCÊ DISSE', en: 'YOU SAID' },
  better: { pt: '✓ MELHOR', en: '✓ BETTER' },
  whyLabel: { pt: 'Por quê: ', en: 'Why: ' },
  savePhrase: { pt: '★ Salvar frase', en: '★ Save phrase' },
  listen: { pt: '♪ Ouvir', en: '♪ Listen' },
  disclaimer: { pt: 'Notas geradas por IA, são estimativas educacionais. Não substituem certificação oficial e não devem ser usadas como base única para decisões de contratação.', en: 'AI-generated scores are educational estimates. They do not replace official certification and should not be used as the sole basis for hiring decisions.' },
  retry: { pt: '↻ Tentar novamente', en: '↻ Try again' },
  practicePhrase: { pt: 'Praticar frases técnicas', en: 'Practice technical phrases' },

  // B2B
  forTeams: { pt: 'PARA EMPRESAS', en: 'FOR TEAMS' },
  b2bTitle1: { pt: 'Inglês de carreira', en: 'Career English' },
  b2bTitle2: { pt: 'para times inteiros.', en: 'for entire teams.' },
  talkToSales: { pt: 'Falar com vendas →', en: 'Talk to sales →' },
  backToApp: { pt: 'Voltar para o app', en: 'Back to app' },

  // Nav
  home: { pt: 'Início', en: 'Home' },
  practice: { pt: 'Praticar', en: 'Practice' },
  progress: { pt: 'Progresso', en: 'Progress' },
  profile: { pt: 'Perfil', en: 'Profile' },

  // Scenarios
  scenariosTitle: { pt: 'Cenários de prática', en: 'Practice scenarios' },
  scenariosSub: { pt: 'Escolha um cenário para praticar', en: 'Choose a scenario to practice' },

  // Progress
  yourProgress: { pt: 'Seu progresso', en: 'Your progress' },
  weeklyMinutes: { pt: 'Minutos esta semana', en: 'Minutes this week' },
  sessionsWeek: { pt: 'Sessões esta semana', en: 'Sessions this week' },
  currentStreak: { pt: 'Streak atual', en: 'Current streak' },
  scoreTrend: { pt: '━━ TENDÊNCIA DE SCORE', en: '━━ SCORE TREND' },
  skillsProgress: { pt: '━━ HABILIDADES', en: '━━ SKILLS' },
  speakingMinutesThisWeek: { pt: 'MINUTOS FALANDO ESTA SEMANA', en: 'SPEAKING MINUTES THIS WEEK' },
  moreMinutesToCloseWeek: { pt: 'Mais 27 minutos para fechar a semana', en: '27 more minutes to close the week' },
  sessions: { pt: 'SESSÕES', en: 'SESSIONS' },
  thisWeek: { pt: 'esta semana', en: 'this week' },
  progressTitle: { pt: 'Seu', en: 'Your' },
  progressTitleAccent: { pt: 'progresso.', en: 'progress.' },
  scoreTrendLabel: { pt: 'TENDÊNCIA DE SCORE', en: 'SCORE TREND' },
  week: { pt: 'Sem', en: 'Wk' },

  // Goal page items
  goalTech: { pt: 'Entrevista tech', en: 'Tech interview' },
  goalTechSub: { pt: 'Backend, frontend, system design', en: 'Backend, frontend, system design' },
  goalMeetings: { pt: 'Reuniões em inglês', en: 'English meetings' },
  goalMeetingsSub: { pt: 'Standups, planning, atualizações', en: 'Standups, planning, updates' },
  goalData: { pt: 'Apresentação de projeto', en: 'Project presentation' },
  goalDataSub: { pt: 'IA, dados, dashboards', en: 'AI, data, dashboards' },
  goalSupport: { pt: 'Suporte ao cliente', en: 'Customer support' },
  goalSupportSub: { pt: 'Atendimento, escalonamentos', en: 'Service, escalations' },
  goalSales: { pt: 'Vendas / clientes internacionais', en: 'Sales / international clients' },
  goalSalesSub: { pt: 'Discovery, demos, objeções', en: 'Discovery, demos, objections' },

  // Consent page items
  consentVoice: { pt: 'Aceito o processamento da minha voz para análise de inglês.', en: 'I accept voice processing for English analysis.' },
  consentAi: { pt: 'Aceito receber feedback gerado por IA em português.', en: 'I accept receiving AI-generated feedback in my language.' },
  consentEstimate: { pt: 'Entendo que as notas são estimativas educacionais — não certificação oficial.', en: 'I understand that scores are educational estimates — not official certification.' },
  consentAudio: { pt: 'Permitir armazenar áudio por 30 dias para revisão (opcional).', en: 'Allow storing audio for 30 days for review (optional).' },
  optional: { pt: 'opcional', en: 'optional' },
  lgpdCompliant: { pt: 'LGPD · ANPD COMPLIANT', en: 'LGPD · ANPD COMPLIANT' },
  profilePrivacy: { pt: 'Perfil → Privacidade', en: 'Profile → Privacy' },

  // Diagnostic page
  diagTranslation: { pt: 'Tradução: Conte sobre seu trabalho atual ou um projeto recente.', en: 'Translation: Tell me about your current job or a project you\'ve worked on recently.' },

  // Session / Roleplay
  repeat: { pt: '↻ Repetir', en: '↻ Repeat' },
  translate: { pt: '↷ Traduzir', en: '↷ Translate' },
  hint: { pt: '◆ Dica', en: '◆ Hint' },
  slower: { pt: '♪ Mais devagar', en: '♪ Slower' },

  // Feedback page
  feedbackSectionLabel: { pt: '━━ FEEDBACK · TECH INTERVIEW', en: '━━ FEEDBACK · TECH INTERVIEW' },
  disclaimerLabel: { pt: 'AVISO · ', en: 'NOTICE · ' },
  forCompaniesAndBootcamps: { pt: 'Para empresas e bootcamps', en: 'For companies and bootcamps' },
  trackMinutesEvolution: { pt: 'Acompanhe minutos, evolução e prontidão do time', en: 'Track minutes, evolution, and team readiness' },
  enToPt: { pt: 'EN → PT', en: 'EN → PT' },

  // Feedback skills
  fluency: { pt: 'Fluência', en: 'Fluency' },
  grammar: { pt: 'Gramática', en: 'Grammar' },
  vocabulary: { pt: 'Vocabulário', en: 'Vocabulary' },
  clarity: { pt: 'Clareza', en: 'Clarity' },
  pronunciation: { pt: 'Pronúncia', en: 'Pronunciation' },

  // B2B page
  b2bSub: { pt: 'Acompanhe minutos praticados, evolução por habilidade e prontidão para entrevistas — sem expor áudios privados.', en: 'Track practice minutes, skill evolution, and interview readiness — without exposing private audio.' },
  b2bForTeamsHeader: { pt: '━━ JOBENGLISH FOR TEAMS', en: '━━ JOBENGLISH FOR TEAMS' },
  activeStudents: { pt: 'Alunos ativos', en: 'Active students' },
  minutesPracticed: { pt: 'Minutos praticados', en: 'Minutes practiced' },
  clarityEvolution: { pt: 'Evolução em clareza', en: 'Clarity evolution' },
  completedWeek: { pt: 'Completaram a semana', en: 'Completed the week' },
  seats: { pt: '/ 50 lugares', en: '/ 50 seats' },
  inWeeks: { pt: 'em 4 semanas', en: 'in 4 weeks' },
  ofCohort: { pt: 'do cohort', en: 'of cohort' },
  avgSkillEvolution: { pt: '━━ EVOLUÇÃO MÉDIA POR HABILIDADE', en: '━━ AVERAGE SKILL EVOLUTION' },
  privacyByDefault: { pt: 'Privacidade por padrão.', en: 'Privacy by default.' },
  privacyNote: { pt: 'Admins veem progresso agregado — não áudios privados sem consentimento explícito do aluno.', en: 'Admins see aggregated progress — not private audio without explicit student consent.' },
  usedBy: { pt: '━━ USADO POR', en: '━━ USED BY' },
  techBootcamps: { pt: 'Bootcamps de tech', en: 'Tech bootcamps' },
  supportTeams: { pt: 'Times de suporte', en: 'Support teams' },
  bpos: { pt: 'BPOs', en: 'BPOs' },
  productSquads: { pt: 'Squads de produto', en: 'Product squads' },
  active: { pt: 'ATIVO', en: 'ACTIVE' },

  // Scenarios page
  scenariosPageTitle: { pt: 'Cenários para', en: 'Scenarios to' },
  scenariosPageTitleAccent: { pt: 'praticar.', en: 'practice.' },
  scenariosPageSub: { pt: 'Escolha um cenário e comece a falar em inglês com IA.', en: 'Choose a scenario and start speaking English with AI.' },
  trackTechInterview: { pt: 'ENTREVISTA TECH', en: 'TECH INTERVIEW' },
  trackMeetings: { pt: 'REUNIÕES EM INGLÊS', en: 'ENGLISH MEETINGS' },
  trackData: { pt: 'IA / DADOS', en: 'AI / DATA' },
  trackSupport: { pt: 'SUPORTE AO CLIENTE', en: 'CUSTOMER SUPPORT' },
  trackSales: { pt: 'VENDAS / CLIENTES', en: 'SALES / CLIENTS' },
  beginner: { pt: 'Iniciante', en: 'Beginner' },
  intermediateLevel: { pt: 'Intermediário', en: 'Intermediate' },
  advanced: { pt: 'Avançado', en: 'Advanced' },

  // Dashboard
  track: { pt: '━━ TRILHA · ENGLISH FOR TECH INTERVIEWS', en: '━━ TRACK · ENGLISH FOR TECH INTERVIEWS' },

  // Correction card
  correction: { pt: 'CORREÇÃO', en: 'CORRECTION' },
  whyPrefix: { pt: 'Por que: ', en: 'Why: ' },

  // Session view dynamic labels
  speaking: { pt: '♪ FALANDO', en: '♪ SPEAKING' },
  thinking: { pt: '● PENSANDO...', en: '● THINKING...' },
  you: { pt: 'VOCÊ', en: 'YOU' },
  translating: { pt: 'Traduzindo...', en: 'Translating...' },
  hintLoading: { pt: 'Gerando dica...', en: 'Generating hint...' },
  savedPhrase: { pt: '✓ Salvo', en: '✓ Saved' },
  comingSoon: { pt: 'Em breve', en: 'Coming soon' },
};
