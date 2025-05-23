-- CreateEnum
CREATE TYPE "Repostatus" AS ENUM ('PENDING', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('EMERGENCY', 'NON_EMERGENCY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reportType" TEXT NOT NULL,
    "location" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "image" TEXT,
    "status" "Repostatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_reportId_key" ON "Report"("reportId");

-- CreateIndex
CREATE INDEX "Report_reportId_idx" ON "Report"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
