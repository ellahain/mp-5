import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";

export default async function getAllAliases(): Promise<AliasProps[]> {
    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const data = await aliasCollection.find().toArray();

    const aliases: AliasProps[] = data.map((a) => ({
        id: a._id.toHexString(),
        alias: a.alias, url: a.url,
    }));


    return aliases.reverse();
}