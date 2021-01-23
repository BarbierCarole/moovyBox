BEGIN;
CREATE TABLE task (
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"label" TEXT NOT NULL,
	"date" DATE NOT NULL,
	"note" TEXT,
	"contact" TEXT,
	"user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "move_id" INT NOT NULL REFERENCES "move"("id") ON DELETE CASCADE,
    CONSTRAINT one_task_one_move UNIQUE("move_id","id")
);
COMMIT;