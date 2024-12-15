import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		email: v.string(),
		name: v.string(),
		imageUrl: v.optional(v.string()),
		role: v.string(), // "committee" or "resident"
		createdAt: v.number(),
		lastLoginAt: v.number()
	}).index("by_email", ["email"])
});
