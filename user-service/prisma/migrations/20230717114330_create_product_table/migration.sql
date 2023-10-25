-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "price" INTEGER NOT NULL,
    "image" VARCHAR NOT NULL,
    "status" VARCHAR(32),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "sub_category_id" UUID NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
