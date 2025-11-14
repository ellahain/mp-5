"use client"
import {redirect, useParams} from "next/navigation"
import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";
import getAllAliases from "@/lib/getAllAliases";
import {useState} from "react";




export default function AliasPage() {
    const alias = useParams()
    const [value, setValue] = useState<AliasProps>({id: "", alias: "", url: ""} as AliasProps)

    async function getURL() {
        const aliasCollection = await getAllAliases()
        for (let i = 0; i<aliasCollection.length; i++){
            if (aliasCollection[i]===alias){
                setValue(aliasCollection[i])
            }
        }
    }

    const info = getURL();

    redirect(`${value.url}`)


}