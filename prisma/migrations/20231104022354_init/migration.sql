-- CreateTable
CREATE TABLE "PUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "PUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PProduct" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "pOwnerId" INTEGER NOT NULL,

    CONSTRAINT "PProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PUser_email_key" ON "PUser"("email");

-- AddForeignKey
ALTER TABLE "PProduct" ADD CONSTRAINT "PProduct_pOwnerId_fkey" FOREIGN KEY ("pOwnerId") REFERENCES "PUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
