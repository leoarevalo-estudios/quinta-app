-- CreateTable
CREATE TABLE "TokenRecuperacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expira" DATETIME NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenRecuperacion_token_key" ON "TokenRecuperacion"("token");
