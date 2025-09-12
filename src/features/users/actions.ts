"use server";

import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getUserIdTag } from "./dbCache";

export async function getUser(id: string) {

  cacheTag(getUserIdTag(id));

  return await db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
}
