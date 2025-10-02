-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "public"."doctors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT,
    "registrationNumber" TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "gender" "public"."Gender" NOT NULL,
    "appointmentFee" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL,
    "currentWorkingPlace" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "public"."doctors"("email");

-- AddForeignKey
ALTER TABLE "public"."doctors" ADD CONSTRAINT "doctors_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
