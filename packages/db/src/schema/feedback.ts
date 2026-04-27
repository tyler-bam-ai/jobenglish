import { pgTable, uuid, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { cefrLevelEnum } from './enums';
import { practiceSessions } from './sessions';
import { users } from './users';

export const feedbackReports = pgTable('feedback_reports', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  sessionId: uuid('session_id').references(() => practiceSessions.id, { onDelete: 'cascade' }).unique().notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  overallScore: integer('overall_score').notNull(),
  cefrEstimate: cefrLevelEnum('cefr_estimate'),
  scores: jsonb('scores').notNull(),
  corrections: jsonb('corrections').notNull(),
  strengths: jsonb('strengths'),
  improvements: jsonb('improvements'),
  summaryEn: text('summary_en'),
  summaryPt: text('summary_pt'),
  pronunciationNotes: jsonb('pronunciation_notes'),
  nextRecommendations: jsonb('next_recommendations'),
  llmProvider: text('llm_provider'),
  rubricVersion: text('rubric_version'),
  generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow().notNull(),
  generationDurationMs: integer('generation_duration_ms'),
});
