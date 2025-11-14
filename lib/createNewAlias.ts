"use server"

import getCollection, {ALIAS_COLLECTION} from "@/db";
import getAllAliases from "@/lib/getAllAliases";
import checkLink from "./checkLink";
import {AliasProps} from "@/types";

export default async function createNewAlias(alias: string, url: string): Promise<boolean> {
    console.log("createNewAlias");
    const a = {
        alias: alias,
        url: url,
    }

    function checkDuplicates(aliasArray: AliasProps[], a: string) {
        for (let i = 0; i < aliasArray.length; i++) {
            if (aliasArray[i].alias === a) {
                return false;
            }
        }
        return true;
    }

    const aliasCollection = await getAllAliases();

    if (!checkDuplicates(aliasCollection, a.alias) || !checkLink(url)) {
        return false;
    } else {
        const aliasesCollection = await getCollection(ALIAS_COLLECTION);
        const res = await aliasesCollection.insertOne({...a});

        if (!res.acknowledged) {
            throw new Error("DB insert failed");
        }
        return true;
    }
}