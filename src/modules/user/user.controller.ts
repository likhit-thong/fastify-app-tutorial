import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser, findUserByEmail, findUsers } from './user.service';
import { CreateUserInput, LoginInput } from './user.schema';
import { verifyPassword } from '../../utils/hash';
import { server } from '../../app';

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;
  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
};

export const loginHandler = async (
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;
  const errMessage = 'Invalid email or password';

  const user = await findUserByEmail(body.email);
  if (!user) {
    return reply.code(401).send({ message: errMessage });
  }

  const { salt, password, ...rest } = user;
  const isCorrectPassword = verifyPassword({
    candidatePassword: body.password,
    salt,
    hash: password,
  });

  if (!isCorrectPassword) {
    return reply.code(401).send({ message: errMessage });
  }

  return { accessToken: server.jwt.sign(rest, { expiresIn: '2m' }) };
};

export const getUsersHandler = async () => {
  const users = await findUsers();
  return users;
};
