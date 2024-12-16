/*
  Warnings:

  - You are about to alter the column `descuentoServicio` on the `Servicio` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Servicio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreServicio" TEXT NOT NULL,
    "duracionServicio" TEXT NOT NULL,
    "costoServicio" REAL NOT NULL,
    "descuentoServicio" INTEGER NOT NULL DEFAULT 0,
    "tipoServicio" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Servicio" ("available", "costoServicio", "descuentoServicio", "duracionServicio", "id", "nombreServicio", "tipoServicio") SELECT "available", "costoServicio", "descuentoServicio", "duracionServicio", "id", "nombreServicio", "tipoServicio" FROM "Servicio";
DROP TABLE "Servicio";
ALTER TABLE "new_Servicio" RENAME TO "Servicio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
