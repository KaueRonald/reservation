/*
  Warnings:

  - Changed the type of `type` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Manicure', 'Pedicure', 'Massagem', 'Cabeleireiro', 'Estetica', 'Depilacao', 'Maquiagem', 'Bronzeamento', 'Design_de_sobrancelhas');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Agendado', 'Confirmado', 'Cancelado');

-- AlterTable
ALTER TABLE "services" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL;
