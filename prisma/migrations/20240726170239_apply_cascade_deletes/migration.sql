/*
  Warnings:

  - Added the required column `invoiceDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paid` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDue` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invoiceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("city", "country", "email", "id", "name", "postCode", "streetAddress", "userId") SELECT "city", "country", "email", "id", "name", "postCode", "streetAddress", "userId" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL DEFAULT -1,
    "userAddressId" INTEGER NOT NULL DEFAULT -1,
    "clientId" INTEGER NOT NULL DEFAULT -1,
    "invoiceDate" DATETIME NOT NULL,
    "paymentDue" DATETIME NOT NULL,
    "paid" BOOLEAN NOT NULL,
    CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Invoice_userAddressId_fkey" FOREIGN KEY ("userAddressId") REFERENCES "UserAddress" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("clientId", "id", "published", "title", "userAddressId", "userId") SELECT "clientId", "id", "published", "title", "userAddressId", "userId" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_UserAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "streetAddress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserAddress" ("city", "country", "id", "postalCode", "streetAddress", "userId") SELECT "city", "country", "id", "postalCode", "streetAddress", "userId" FROM "UserAddress";
DROP TABLE "UserAddress";
ALTER TABLE "new_UserAddress" RENAME TO "UserAddress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
