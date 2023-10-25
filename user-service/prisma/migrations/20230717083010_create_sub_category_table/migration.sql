-- CreateTable
CREATE TABLE "sub_category" (
    "id" UUID NOT NULL,
    "title" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "category_id" UUID NOT NULL,

    CONSTRAINT "sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sub_category_title_key" ON "sub_category"("title");

-- AddForeignKey
ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
