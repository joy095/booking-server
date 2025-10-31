alter table "user" add column "phoneNumber" text unique;

alter table "user" add column "phoneNumberVerified" boolean;

alter table "user" add column "username" text unique;

alter table "user" add column "displayUsername" text;

create table "jwks" ("id" text not null primary key, "publicKey" text not null, "privateKey" text not null, "createdAt" timestamptz not null);