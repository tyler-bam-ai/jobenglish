import { pgTable, uuid, text, timestamp, integer, boolean, jsonb, real, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { sessionTypeEnum, sessionStatusEnum, speakerEnum } from './enums';
import { users } from './users';
import { scenarios } from './scenarios';
import { organizations } from './organizations';

export const practiceSessions = pgTable('practice_sessions', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  scenarioId: uuid('scenario_id').references(() => scenarios.id).notNull(),
  orgId: uuid('org_id').references(() => organizations.id),
  sessionType: sessionTypeEnum('session_type').default('practice').notNull(),
  status: sessionStatusEnum('status').default('in_progress').notNull(),
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow().notNull(),
  endedAt: timestamp('ended_at', { withTimezone: true }),
  durationSeconds: integer('duration_seconds'),
  turnCount: integer('turn_count').default(0).notNull(),
  audioConsent: boolean('audio_consent').default(false).notNull(),
  helpUsedCount: integer('help_used_count').default(0).notNull(),
  modelVersion: text('model_version'),
  rubricVersion: text('rubric_version'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('sessions_user_idx').on(table.userId, table.startedAt),
]);

export const utterances = pgTable('utterances', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  sessionId: uuid('session_id').references(() => practiceSessions.id, { onDelete: 'cascade' }).notNull(),
  speaker: speakerEnum('speaker').notNull(),
  sequenceNumber: integer('sequence_number').notNull(),
  transcript: text('transcript').notNull(),
  audioStoragePath: text('audio_storage_path'),
  durationMs: integer('duration_ms'),
  sttConfidence: real('stt_confidence'),
  sttProvider: text('stt_provider'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('utterances_session_seq_idx').on(table.sessionId, table.sequenceNumber),
]);
