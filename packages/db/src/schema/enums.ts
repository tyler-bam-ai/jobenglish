import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['learner', 'org_admin', 'platform_admin']);
export const careerTrackEnum = pgEnum('career_track', ['tech', 'meetings', 'data', 'support', 'sales']);
export const cefrLevelEnum = pgEnum('cefr_level', ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
export const difficultyEnum = pgEnum('difficulty', ['beginner', 'intermediate', 'advanced']);
export const sessionTypeEnum = pgEnum('session_type', ['diagnostic', 'practice', 'assessment']);
export const sessionStatusEnum = pgEnum('session_status', ['in_progress', 'completed', 'abandoned', 'error']);
export const speakerEnum = pgEnum('speaker', ['user', 'ai']);
export const consentTypeEnum = pgEnum('consent_type', ['audio_recording', 'data_processing', 'marketing', 'audio_storage']);
export const subscriptionPlanEnum = pgEnum('subscription_plan', ['free', 'basic', 'pro', 'pro_coach', 'enterprise']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'past_due', 'canceled', 'trialing']);
export const paymentProviderEnum = pgEnum('payment_provider', ['stripe', 'mercado_pago']);
export const orgTypeEnum = pgEnum('org_type', ['company', 'bootcamp', 'university', 'accelerator', 'other']);
export const orgPlanEnum = pgEnum('org_plan', ['trial', 'basic', 'pro']);
export const orgMemberRoleEnum = pgEnum('org_member_role', ['member', 'admin']);
export const orgMemberStatusEnum = pgEnum('org_member_status', ['active', 'inactive', 'invited']);
