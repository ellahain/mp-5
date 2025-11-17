import {redirect, RedirectType} from "next/navigation"
import getCollection, {ALIAS_COLLECTION} from "@/db";


export default async function AliasPage({params,}: {params: Promise<{alias: string} >}) {
    const {alias} = await params;
    const collection = await getCollection(ALIAS_COLLECTION);
    const doc = await collection.findOne({alias: alias});

    if (!doc) {
        redirect("404");
    }
    redirect(`${doc.url}`, RedirectType.replace)
}