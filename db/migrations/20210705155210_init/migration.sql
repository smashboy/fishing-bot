-- CreateTable
CREATE TABLE "BotAuth" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
