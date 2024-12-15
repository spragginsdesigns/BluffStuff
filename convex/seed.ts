import { mutation } from "./_generated/server";

export const seedUsers = mutation({
	args: {},
	handler: async (ctx) => {
		// Check if we already have users to avoid duplicate seeding
		const existingUsers = await ctx.db.query("users").collect();
		if (existingUsers.length > 0) {
			return { message: "Database already has users" };
		}

		// Initial admin user
		const adminUser = {
			email: "atmosphere9999@gmail.com",
			name: "Shadow Gaming",
			role: "committee",
			createdAt: Date.now(),
			lastLoginAt: Date.now()
		};

		// Insert admin user
		await ctx.db.insert("users", adminUser);

		return { message: "Initial admin user created successfully" };
	}
});
