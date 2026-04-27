import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { consentTypeEnum } from './enums';
import { users } from './users';

export const consentRecords = pgTable('consent_records', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  consentType: consentTypeEnum('consent_type').notNull(),
  granted: boolean('granted').notNull(),
  consentTextVersion: text('consent_text_version'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  grantedAt: timestamp('granted_at', { withTimezone: true }).defaultNow().notNull(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
});
