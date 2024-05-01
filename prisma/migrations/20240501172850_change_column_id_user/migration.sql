/*
  Warnings:

  - The primary key for the `user_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `userId` on the `user_permissions` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_PermissionToUser` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_permissions" (
    "userId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "permissionId")
);
INSERT INTO "new_user_permissions" ("permissionId", "userId") SELECT "permissionId", "userId" FROM "user_permissions";
DROP TABLE "user_permissions";
ALTER TABLE "new_user_permissions" RENAME TO "user_permissions";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "display_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "currency" TEXT,
    "roleId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME,
    CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("created_at", "currency", "deleted_at", "display_name", "email", "id", "name", "password", "roleId", "updated_at") SELECT "created_at", "currency", "deleted_at", "display_name", "email", "id", "name", "password", "roleId", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new__PermissionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "permissions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PermissionToUser" ("A", "B") SELECT "A", "B" FROM "_PermissionToUser";
DROP TABLE "_PermissionToUser";
ALTER TABLE "new__PermissionToUser" RENAME TO "_PermissionToUser";
CREATE UNIQUE INDEX "_PermissionToUser_AB_unique" ON "_PermissionToUser"("A", "B");
CREATE INDEX "_PermissionToUser_B_index" ON "_PermissionToUser"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
