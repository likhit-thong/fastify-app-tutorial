import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  name: z.string(),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: 'Password is required',
  }),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  password: z.string({
    required_error: 'Password is required',
  }),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchema, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
  },
  { $id: 'userSchema' }
);
