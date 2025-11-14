"use client"
import styled from "styled-components";
import {useState} from "react";
import checkLink from "@/lib/checkLink";
import createNewAlias from "@/lib/createNewAlias";

const StyledInput = styled.input`
    border: 1px #ccc solid;
    border-radius: 5px;
    width: 100%;
    padding: 5px;
`

const StyledDiv = styled.div`
    margin: 10% auto;
    padding: 80px;
    border-radius: 10px;
    border: 1px #ccc solid;
    width: 40%;
`

const StyledButton = styled.button`
    background-color: yellowgreen;
    border-radius: 10px;
    display: block;
    width: 100%;
    margin: 5% auto;
    padding: 5px;
`

export default function Home() {

    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortened, setShortened] = useState("");
    const [bool, setBool] = useState(true);

    async function makeUrl(){
        const boolean = await createNewAlias(alias, url);
        if (!checkLink(url)){
            setShortened("Invalid URL")
            setBool(false);
        } else if (!boolean){
            setShortened("Invalid Alias");
            setBool(false);
        }else {
            setShortened(`mp-5-three-indol.vercel.app${alias}`)
        }
    }



  return (
    <StyledDiv>
        <p>URL</p>
        <StyledInput onChange={(e) => setUrl(e.target.value)} value={url}/>
        <p>Alias</p>
        <StyledInput onChange={(e) => setAlias(e.target.value)} value={alias}/>
        <StyledButton onClick={makeUrl}>Shorten URL</StyledButton>
        {bool?<button>{shortened}</button>:<p>{shortened}</p>}
    </StyledDiv>
  );
}
