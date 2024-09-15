ALTER TABLE "items" DROP CONSTRAINT "items_condition_id_fkey";
--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "condition_id" SET DATA TYPE varchar(255);