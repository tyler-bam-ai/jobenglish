import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  actorId: uuid('actor_id').references(() => users.id),
  action: text('action').notNull(),
  entityType: text('entity_type'),
  entityId: uuid('entity_id'),
  details: jsonb('details'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
