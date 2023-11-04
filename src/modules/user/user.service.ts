import db from '../../utils/db';
import { hashPassword } from '../../utils/hash';
import { CreateUserInput } from './user.schema';

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);
  const user = await db.pUser.create({
    data: { password: hash, salt, ...rest },
  });
  return user;
};

export const findUserByEmail = async (email: string) => {
  return db.pUser.findUnique({
    where: {
      email,
    },
  });
};

export const findUsers = async () => {
  return db.pUser.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
