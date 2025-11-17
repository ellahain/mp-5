import {redirect, RedirectType} from "next/navigation"
import getCollection, {ALIAS_COLLECTION} from "@/db";

/*From redirect documentation*/
export default async function AliasPage({params,}: {params: Promise<{alias: string} >}) {
    const {alias} = await params;
    let collection = null;
    let doc = null;

    try {
        collection = await getCollection(ALIAS_COLLECTION);
        doc = await collection.findOne({alias: alias});
    } catch (e){
        console.error(e);
        redirect("404");
    }

    if (!doc) {
        redirect("404");
    }
    redirect(`${doc.url}`, RedirectType.replace)
}