-- CreateTable
CREATE TABLE "KelvinPreorder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization" TEXT,
    "city" TEXT,
    "absoluteZeroRazz" INTEGER NOT NULL,
    "minusFortyMango" INTEGER NOT NULL,
    "punch27315" INTEGER NOT NULL,
    "freezingPointLime" INTEGER NOT NULL,
    "note" TEXT,
    "ipHash" TEXT NOT NULL,
    "userAgent" TEXT,

    CONSTRAINT "KelvinPreorder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KelvinPreorder_ipHash_createdAt_idx" ON "KelvinPreorder"("ipHash", "createdAt");

-- CreateIndex
CREATE INDEX "KelvinPreorder_email_idx" ON "KelvinPreorder"("email");
