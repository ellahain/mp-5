"use server"

import getCollection, {ALIAS_COLLECTION} from "@/db";
import checkLink from "./checkLink";


export default async function createNewAlias(alias: string, url: string): Promise<boolean> {
    console.log("createNewAlias");
    const a = {
        alias: alias,
        url: url,
    }

    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    /*learned about .hasNext() from documentation: https://www.mongodb.com/docs/manual/tutorial/iterate-a-cursor/#std-label-read-operations-cursors*/
    if (await aliasCollection.find({alias: `${a.alias}`}).hasNext() || !checkLink(url) || alias==="") {
        return false;
    } else {
        const res = await aliasCollection.insertOne({...a});

        if (!res.acknowledged) {
            throw new Error("DB insert failed");
        }
        return true;
    }
}