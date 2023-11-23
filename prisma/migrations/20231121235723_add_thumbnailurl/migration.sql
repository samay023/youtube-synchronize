/*
  Warnings:

  - Made the column `author` on table `YoutubeChannel` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `thumbnailUrl` to the `YoutubeVideo` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `YoutubeVideo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publishedAt` on table `YoutubeVideo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `YoutubeVideo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "YoutubeChannel" ALTER COLUMN "author" SET NOT NULL;

-- AlterTable
ALTER TABLE "YoutubeVideo" ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "publishedAt" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
