import {redirect} from "next/navigation"


export default function AliasPage(url: string) {
    redirect(`${url}`)
}