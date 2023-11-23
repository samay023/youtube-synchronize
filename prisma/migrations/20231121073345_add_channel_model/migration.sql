-- CreateTable
CREATE TABLE "YoutubeChannel" (
    "id" TEXT NOT NULL,
    "author" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeChannel_id_key" ON "YoutubeChannel"("id");

-- AddForeignKey
ALTER TABLE "YoutubeVideo" ADD CONSTRAINT "YoutubeVideo_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "YoutubeChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
