import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define the structure of the 'orders' table
export default defineSchema({
  orders: defineTable({
    // Auth
    userId: v.string(), // ID of the user placing the order (from frontend auth or session)
    
    // Status
    status: v.union(
        v.literal("pending"), 
        v.literal("processing"), 
        v.literal("shipped"), 
        v.literal("delivered"),
        v.literal("cancelled")
    ),
    
    // Customer Details
    customer: v.object({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
    }),

    // Shipping Details
    shipping: v.object({
        address: v.string(),
        city: v.string(),
        state: v.string(),
        zip: v.string(),
        country: v.string(),
    }),

    // Order Items
    items: v.array(
        v.object({
            id: v.string(), // Product ID
            name: v.string(),
            price: v.number(),
            quantity: v.number(),
        })
    ),

    // Financial Totals
    totals: v.object({
        subtotal: v.number(),
        shipping: v.number(),
        taxes: v.number(),
        grandTotal: v.number(),
    }),

    // Metadata
    createdAt: v.number(),
  })
  // We add an index to allow fast lookups by status or customer email if needed
  .index("by_customer_email", ["customer.email"])
});
