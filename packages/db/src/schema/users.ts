import { pgTable, uuid, text, boolean, timestamp, integer, jsonb, date } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { userRoleEnum, careerTrackEnum, cefrLevelEnum } from './enums';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').unique().notNull(),
  fullName: text('full_name'),
  role: userRoleEnum('role').default('learner').notNull(),
  supabaseAuthId: uuid('supabase_auth_id').unique(),
  locale: text('locale').default('pt-BR').notNull(),
  ageConfirmed: boolean('age_confirmed').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export const learnerProfiles = pgTable('learner_profiles', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).unique().notNull(),
  careerTrack: careerTrackEnum('career_track'),
  selfReportedLevel: cefrLevelEnum('self_reported_level'),
  assessedLevel: cefrLevelEnum('assessed_level'),
  goals: jsonb('goals').default([]),
  streakCurrent: integer('streak_current').default(0).notNull(),
  streakLongest: integer('streak_longest').default(0).notNull(),
  streakLastDate: date('streak_last_date'),
  totalPracticeMinutes: integer('total_practice_minutes').default(0).notNull(),
  weeklyGoalMinutes: integer('weekly_goal_minutes').default(45).notNull(),
  onboardingCompletedAt: timestamp('onboarding_completed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
