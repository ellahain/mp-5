import {redirect, RedirectType} from "next/navigation"
import getAllAliases from "@/lib/getAllAliases";


export default async function AliasPage({params,}: {params: Promise<{alias: string} >}) {
    const alias = await params
    const aliasCollection = await getAllAliases()
    let doc = {id: "", alias: "", url: ""};

    for (let i = 0; i<aliasCollection.length; i++){
        if (aliasCollection[i].alias===alias.alias){
            doc = aliasCollection[i]
            break;
        }
    }

    redirect(`${doc.url}`, RedirectType.replace)
}