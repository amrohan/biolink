-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Theme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "themeName" TEXT NOT NULL DEFAULT 'Monochrome',
    "bgColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "textColor" TEXT NOT NULL DEFAULT '#000000',
    "subTextColor" TEXT NOT NULL DEFAULT '#666666',
    "cardColor" TEXT NOT NULL DEFAULT '#F0F0F0',
    "cardTextColor" TEXT NOT NULL DEFAULT '#333333',
    "bgImage" TEXT
);
INSERT INTO "new_Theme" ("bgColor", "bgImage", "cardColor", "cardTextColor", "id", "subTextColor", "textColor") SELECT "bgColor", "bgImage", "cardColor", "cardTextColor", "id", "subTextColor", "textColor" FROM "Theme";
DROP TABLE "Theme";
ALTER TABLE "new_Theme" RENAME TO "Theme";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
