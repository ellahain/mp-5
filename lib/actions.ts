'use server'

import { redirect } from 'next/navigation'
import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";

export async function navigate(alias: string) {
    const postsCollection = await getCollection(ALIAS_COLLECTION);
    const data = postsCollection.find({alias: `${alias}`});
    console.log(data);
    redirect(`${data}`)
}