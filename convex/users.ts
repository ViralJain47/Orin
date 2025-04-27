import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server"
import {v} from "convex/values"

export const createUser = mutation({
    args:{
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.string(),
    },

    handler: async(ctx, args) => {

       const existingUser = await ctx.db.query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId",args.clerkId ))
        .first()

        if(existingUser) return;

        await ctx.db.insert("users",{
            username: args.username,
            fullname : args.fullname,
            email: args.email,
            bio : args.bio,
            image : args.image,
            clerkId : args.clerkId,
            posts : 0,
            followers : 0,
            following : 0,
        })
    }

});

export const getUserByClerkId = query({
    args:{clerkId : v.string()},
    handler : async(ctx,args) => {
        const user = await ctx.db.query("users")
        .withIndex("by_clerk_id",(q) => q.eq("clerkId",args.clerkId))
        .unique();

        return user;
    }
});

export const updateProfile = mutation({
    args:{
        fullname : v.string(),
        bio : v.string(),
    },
    handler : async (ctx,args) => {
        const currentUser = await getAuthenticatedUser(ctx);

        await ctx.db.patch(currentUser._id,{
            fullname : args.fullname,
            bio : args.bio,
        });
    },
});

export const getUserProfile = query({
    args:{
        userId : v.id("users"),
    },
    handler: async(ctx,args) => {
        const user = await ctx.db.get(args.userId);
        if(!user) throw new Error("User not found");

        return user;
    },
});

export const isFollowing = query({
    args:{
        followingId : v.id("users"),
    },
    handler: async(ctx,args) => {
        const currentUser = await getAuthenticatedUser(ctx);

        const follow = await ctx.db
        .query("follows")
        .withIndex("by_both",(q) => q.eq("followerId",currentUser._id).eq("followingId",args.followingId))
        .first();

        return !!follow;
    },
});



export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx){
    const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Unauthorized");

        const currentUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id",(q) => q.eq("clerkId",identity.subject))
        .first();

        if(!currentUser) throw new Error("User not found");

        return currentUser;
}