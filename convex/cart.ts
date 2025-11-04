import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCart = query({
  args: {},
  handler: async (ctx) => {
    const userId = "demo-user"; // Replace with auth later
    return await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const addToCart = mutation({
  args: {
    productId: v.string(),
    name: v.string(),
    price: v.number(),
    image: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = "demo-user";
    const existing = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("productId"), args.productId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        quantity: existing.quantity + args.quantity,
      });
      return;
    }

    await ctx.db.insert("cart", { ...args, userId });
  },
});

export const updateQuantity = mutation({
  args: { productId: v.string(), quantity: v.number() },
  handler: async (ctx, args) => {
    const userId = "demo-user";
    const existing = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("productId"), args.productId))
      .first();

    if (!existing) return;

    if (args.quantity <= 0) {
      await ctx.db.delete(existing._id);
    } else {
      await ctx.db.patch(existing._id, { quantity: args.quantity });
    }
  },
});

export const clearCart = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = "demo-user";
    const items = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    for (const item of items) {
      await ctx.db.delete(item._id);
    }
  },
});
