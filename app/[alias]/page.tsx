import {redirect} from "next/navigation"
import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";

export default async function AliasPage({params,}: { params: Promise<{ alias: string }>
}) {
    const alias = await params
    const postsCollection = await getCollection(ALIAS_COLLECTION);
    const data = await postsCollection.find({alias: `${alias}`}).toArray();
    const aliases: AliasProps[] = data.map((a) => ({
        id: a._id.toHexString(),
        alias: a.alias, url: a.url,
    }));
    console.log(aliases)
}