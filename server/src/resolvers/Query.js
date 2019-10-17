const Query = {
  users: async (parent, args, ctx, info) => {
    const user = await ctx.prisma.query.users(args, info);
    return user;
  },
  me: async (parent, args, ctx, info) => {
    if (!ctx.request.userId) {
      return null;
    }
    const user = await ctx.prisma.query.user({ where: { id: ctx.request.userId } }, info);
    return user;
  }
};

module.exports = Query;
