-- Deploy moovybox:tables to pg
BEGIN;

CREATE TABLE IF NOT EXISTS "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "pseudo" TEXT NOT NULL, 
    "email" TEXT NOT NULL CHECK ("email" ~* '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$') UNIQUE,
    "password" TEXT NOT NULL CHECK ("password" ~* '^.{60}$'),
    "confirmed" BOOLEAN NOT NULL DEFAULT false
); 

CREATE TABLE IF NOT EXISTS "move" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL, 
    "date" DATE NOT NULL, 
    "address" TEXT, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    CONSTRAINT one_label_one_move UNIQUE("user_id","label")
); 

CREATE TABLE IF NOT EXISTS "box" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "code" TEXT NOT NULL, 
    "label" TEXT NOT NULL, 
    "destination_room" TEXT NOT NULL, 
    "fragile" BOOLEAN NOT NULL DEFAULT false, 
    "heavy" BOOLEAN NOT NULL DEFAULT false, 
    "floor" BOOLEAN NOT NULL DEFAULT false, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "move_id" INT NOT NULL REFERENCES "move"("id") ON DELETE CASCADE 
); 

CREATE SEQUENCE box_code_seq
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  NO MAXVALUE
  CACHE 1 OWNED BY box.code;

ALTER TABLE "box" ALTER "code" SET DEFAULT lpad(to_hex(nextval('box_code_seq')), 8, '0');

CREATE TABLE IF NOT EXISTS  "item" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "box_id" INT NOT NULL REFERENCES "box"("id") ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS  "inventory" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
); 

CREATE TABLE IF NOT EXISTS "general_task" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "label" TEXT NOT NULL,
   "description" TEXT
);

CREATE TABLE IF NOT EXISTS "move_generates_general_task" (
   "move_id" INT NOT NULL REFERENCES "move"("id") ON DELETE CASCADE,
   "general_task_id" INT NOT NULL REFERENCES "general_task"("id") ON DELETE CASCADE,
   "date_completion" DATE NOT NULL DEFAULT NOW(), 
  --  Comment ecrire que c'est égale à la date "move.date"
   "contact" TEXT,
   "is_realised"  BOOLEAN NOT NULL DEFAULT false,
   PRIMARY KEY (move_id,general_task_id)
);

COMMIT;