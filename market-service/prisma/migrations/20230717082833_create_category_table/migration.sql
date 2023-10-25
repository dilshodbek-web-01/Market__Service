-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL,
    "title" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");
