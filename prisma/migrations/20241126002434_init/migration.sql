-- CreateTable
CREATE TABLE "Servicio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreServicio" TEXT NOT NULL,
    "duracionServicio" TEXT NOT NULL,
    "costoServicio" REAL NOT NULL,
    "descuentoServicio" REAL NOT NULL,
    "tipoServicio" TEXT NOT NULL
);
