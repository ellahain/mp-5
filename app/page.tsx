"use client"
import styled from "styled-components";
import {useState} from "react";
import checkLink from "@/lib/checkLink";
import createNewAlias from "@/lib/createNewAlias";
import Link from "next/link";

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
/*Learned to do hover features from: https://styled-components.com/docs/basics*/
const StyledButton = styled.button`
    background-color: yellowgreen;
    color: white;
    border-radius: 10px;
    display: block;
    width: 100%;
    margin: 5% auto;
    padding: 5px;
    
    &:hover{
        cursor: pointer;
        background-color: black;
    }
`

const StyledLink = styled(Link)`
    text-decoration: underline;
`

export default function Home() {

    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortened, setShortened] = useState("");

    async function makeUrl(){
        const boolean = await createNewAlias(alias, url);
        if (!checkLink(url)){
            setShortened("Invalid URL")
        } else if (!boolean){
            setShortened("Invalid Alias");
        } else {
            setShortened(`https://mp-5-three-indol.vercel.app/${alias}`)
        }
    }



  return (
    <StyledDiv>
        <p>URL</p>
        <StyledInput onChange={(e) => setUrl(e.target.value)} value={url}/>
        <p>Alias</p>
        <StyledInput onChange={(e) => setAlias(e.target.value)} value={alias}/>
        <StyledButton onClick={makeUrl}>Shorten URL</StyledButton>
        <p>Your Shortened URL</p>
        {<StyledLink href={shortened} target="_blank">{shortened}</StyledLink>}
    </StyledDiv>
  );
}
