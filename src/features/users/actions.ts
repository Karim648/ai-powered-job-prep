"use server";

import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getUserIdTag } from "./dbCache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { UserTable } from "@/db/schema";

export async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
}
