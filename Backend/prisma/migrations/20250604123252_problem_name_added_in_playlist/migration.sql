/*
  Warnings:

  - Added the required column `title` to the `ProblemInPlaylist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProblemInPlaylist" ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
ADD COLUMN     "title" TEXT NOT NULL;
