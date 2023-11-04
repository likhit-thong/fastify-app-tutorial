## dependencies

yarn add @prisma/client fastify fastify-zod zod zod-to-json-schema @fastify/jwt fastify-swagger

## devDependencies

yarn add @types/node typescript ts-node nodemon -D

## Initialise prisma

npx prisma init --datasource-provider postgresql

### Migrate the schema

npx prisma migrate dev --name init
