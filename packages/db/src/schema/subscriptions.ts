import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { subscriptionPlanEnum, subscriptionStatusEnum, paymentProviderEnum } from './enums';
import { users } from './users';
import { organizations } from './organizations';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  provider: paymentProviderEnum('provider'),
  providerSubscriptionId: text('provider_subscription_id'),
  plan: subscriptionPlanEnum('plan').default('free').notNull(),
  status: subscriptionStatusEnum('status').default('active').notNull(),
  currentPeriodStart: timestamp('current_period_start', { withTimezone: true }),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  cancelAt: timestamp('cancel_at', { withTimezone: true }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
