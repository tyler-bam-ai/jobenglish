import { pgTable, uuid, text, timestamp, integer, boolean, unique } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { orgTypeEnum, orgPlanEnum, orgMemberRoleEnum, orgMemberStatusEnum } from './enums';
import { users } from './users';

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  type: orgTypeEnum('type').default('company').notNull(),
  plan: orgPlanEnum('plan').default('trial').notNull(),
  maxSeats: integer('max_seats').default(10).notNull(),
  billingStatus: text('billing_status').default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const organizationMemberships = pgTable('organization_memberships', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: orgMemberRoleEnum('role').default('member').notNull(),
  cohortId: text('cohort_id'),
  joinedAt: timestamp('joined_at', { withTimezone: true }),
  status: orgMemberStatusEnum('status').default('invited').notNull(),
  dataSharingConsent: boolean('data_sharing_consent').default(false).notNull(),
}, (table) => [
  unique('org_user_unique').on(table.orgId, table.userId),
]);
