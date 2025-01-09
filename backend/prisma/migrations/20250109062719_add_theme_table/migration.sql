-- CreateTable
CREATE TABLE "Theme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bgColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "textColor" TEXT NOT NULL DEFAULT '#000000',
    "subTextColor" TEXT NOT NULL DEFAULT '#666666',
    "cardColor" TEXT NOT NULL DEFAULT '#F0F0F0',
    "cardTextColor" TEXT NOT NULL DEFAULT '#333333',
    "bgImage" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auth0Id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "picture" TEXT,
    "themeId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "User_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("auth0Id", "id", "name", "picture", "username") SELECT "auth0Id", "id", "name", "picture", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_auth0Id_key" ON "User"("auth0Id");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
