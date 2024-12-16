-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Servicio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreServicio" TEXT NOT NULL,
    "duracionServicio" TEXT NOT NULL,
    "costoServicio" REAL NOT NULL,
    "descuentoServicio" REAL NOT NULL DEFAULT 0.00,
    "tipoServicio" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Servicio" ("available", "costoServicio", "descuentoServicio", "duracionServicio", "id", "nombreServicio", "tipoServicio") SELECT "available", "costoServicio", "descuentoServicio", "duracionServicio", "id", "nombreServicio", "tipoServicio" FROM "Servicio";
DROP TABLE "Servicio";
ALTER TABLE "new_Servicio" RENAME TO "Servicio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
