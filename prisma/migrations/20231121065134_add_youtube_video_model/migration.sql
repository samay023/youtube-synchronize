/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "YoutubeVideo" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT,
    "publishedAt" TIMESTAMP(3),
    "description" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeVideo_id_key" ON "YoutubeVideo"("id");
