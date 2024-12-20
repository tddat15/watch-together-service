/*
  Warnings:

  - You are about to drop the column `createdAt` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.
  - Added the required column `token_type` to the `token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "token" DROP COLUMN "createdAt",
DROP COLUMN "tokenType",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "token_type" "TokenType" NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "passwordHash",
ADD COLUMN     "password_hash" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
