-- CreateTable
CREATE TABLE "public"."specialties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."doctor_specialties" (
    "specialtiesId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctor_specialties_pkey" PRIMARY KEY ("specialtiesId","doctorId")
);

-- AddForeignKey
ALTER TABLE "public"."doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialtiesId_fkey" FOREIGN KEY ("specialtiesId") REFERENCES "public"."specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."doctor_specialties" ADD CONSTRAINT "doctor_specialties_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
