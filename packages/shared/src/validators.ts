import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  fullName: z.string().min(2, 'Nome obrigatório'),
  ageConfirmed: z.literal(true, { errorMap: () => ({ message: 'Confirme que tem 18+' }) }),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

export const onboardingGoalSchema = z.object({
  primaryGoal: z.enum(['tech', 'meetings', 'data', 'support', 'sales']),
  secondaryGoals: z.array(z.enum(['tech', 'meetings', 'data', 'support', 'sales'])).optional(),
});

export const onboardingLevelSchema = z.object({
  selfReportedLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'unsure']),
});

export const consentSchema = z.object({
  voice: z.literal(true),
  ai: z.literal(true),
  estimate: z.literal(true),
  audio: z.boolean(),
});

export const createSessionSchema = z.object({
  scenarioId: z.string().uuid(),
  audioConsent: z.boolean(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OnboardingGoalInput = z.infer<typeof onboardingGoalSchema>;
export type OnboardingLevelInput = z.infer<typeof onboardingLevelSchema>;
export type ConsentInput = z.infer<typeof consentSchema>;
export type CreateSessionInput = z.infer<typeof createSessionSchema>;
