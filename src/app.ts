import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import userRoutes from './modules/user/user.route';
import { userSchema } from './modules/user/user.schema';
import fastifyJwt from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}

export const server = Fastify({
  logger: true,
});

server.register(fastifyJwt, {
  secret: Buffer.from('jwt_secret').toString('hex'),
});

server.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      request.jwtVerify();
    } catch (e) {
      return reply.code(403).send(e);
    }
  }
);

server.get('/healthcheck', async function () {
  return { status: 'Ok' };
});

async function main() {
  for (const schema of userSchema) {
    server.addSchema(schema);
  }
  server.register(userRoutes, { prefix: 'api/v1/users' });

  server.listen({ port: 3000 }, function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log(`Server running at ${address}`);
  });
}

main();
