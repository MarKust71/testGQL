const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  signUp: async (parent, args, ctx, info) => {
    args.data.password = await bcrypt.hash(args.data.password, 10);
    const user = await ctx.prisma.mutation.createUser(args, info);
    return user;
  },
  signIn: async (parent, args, ctx, info) => {
    const user = await ctx.prisma.query.user({ where: { email: args.email } }, '{ id password }');
    if (!user) {
      throw new Error('WRONG_EMAIL');
    }
    const isPasswordValid = await bcrypt.compare(args.password, user.password);
    if (!isPasswordValid) {
      throw new Error('WRONG_PASSWORD');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return ctx.prisma.query.user({ where: { email: args.email } }, info);
  },
  signOut: async (parent, args, ctx, info) => {
    ctx.response.clearCookie('token');
    return { message: 'Logout' };
  }
};

module.exports = Mutation;
