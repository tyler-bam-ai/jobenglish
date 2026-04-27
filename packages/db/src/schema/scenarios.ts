import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { careerTrackEnum, difficultyEnum } from './enums';

export const scenarios = pgTable('scenarios', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  titlePt: text('title_pt'),
  description: text('description'),
  descriptionPt: text('description_pt'),
  careerTrack: careerTrackEnum('career_track').notNull(),
  difficulty: difficultyEnum('difficulty').default('intermediate').notNull(),
  aiRole: text('ai_role').notNull(),
  userRole: text('user_role'),
  systemPrompt: text('system_prompt').notNull(),
  promptRules: jsonb('prompt_rules'),
  targetVocabulary: jsonb('target_vocabulary'),
  rubric: jsonb('rubric'),
  estimatedMinutes: integer('estimated_minutes').default(7).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  version: integer('version').default(1).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
