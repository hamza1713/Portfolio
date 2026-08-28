import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const projectInquiries = mysqlTable("projectInquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 160 }),
  projectType: varchar("projectType", { length: 80 }).notNull(),
  budget: varchar("budget", { length: 80 }).notNull(),
  timeline: varchar("timeline", { length: 80 }).notNull(),
  details: text("details").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProjectInquiry = typeof projectInquiries.$inferSelect;
export type InsertProjectInquiry = typeof projectInquiries.$inferInsert;

export const assistantFollowUps = mysqlTable("assistantFollowUps", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AssistantFollowUp = typeof assistantFollowUps.$inferSelect;
export type InsertAssistantFollowUp = typeof assistantFollowUps.$inferInsert;
