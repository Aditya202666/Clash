"use server"

import { revalidateTag } from "next/cache";

export const clearCacheAction = async(tag: string) => {

    revalidateTag(tag)

}