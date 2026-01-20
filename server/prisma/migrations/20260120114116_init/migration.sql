-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('CREATED', 'ON_GOING', 'COMPLETED', 'PROBLEM');

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'CREATED',
    "problem_desc" TEXT,
    "ai_recommendation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
