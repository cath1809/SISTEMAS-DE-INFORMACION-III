/*
  Warnings:

  - You are about to drop the column `token` on the `PasswordResetToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PasswordResetToken_token_key";

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "token",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_code_key" ON "PasswordResetToken"("code");
