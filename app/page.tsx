"use client"
import styled from "styled-components";
import {useState} from "react";
import checkLink from "@/lib/checkLink";
import createNewAlias from "@/lib/createNewAlias";
import Link from "next/link";
import Image from "next/image";


const StyledBackground = styled.div`
    background-color: pink;
    width: 100vw;
    height: 100vh;
    padding: 8% 0;
    text-align: center;
    
    h1 {
        font-size: calc(10px + 2vw);
        font-weight: bold;
    }
`
const StyledURL = styled.input`
    border: 1px #ccc solid;
    border-radius: 5px;
    width: 100%;
    padding: 5px;
    margin-bottom: 20px;
`

const StyledAlias = styled.input`
    border: 1px #ccc solid;
    border-radius: 5px;
    width: 20%;
    padding: 5px;
    display: inline;
`

const StyledDiv = styled.div`
    margin: 0 auto;
    text-align: left;
    padding: 80px;
    border-radius: 10px;
    border: 1px #ccc solid;
    width: 80%;
    height: auto;
    background-color: white;
    
    h3 {
        font-size: calc(5px + 1vw);
        font-weight: bold;
    }
`
/*Learned to do hover features from: https://styled-components.com/docs/basics*/
const StyledButton = styled.button`
    background-color: mediumpurple;
    color: white;
    border-radius: 10px;
    display: block;
    width: 100%;
    margin: 5% auto;
    padding: 5px;

    &:hover {
        cursor: pointer;
        background-color: black;
    }
`

const CopyButton = styled.button`
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 2px 2px darkgrey;
    }
`

const StyledError = styled.p`
    color: red;
`

const StyledLink = styled(Link)`
    text-decoration: underline;
`

const StyledResult = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    padding: 3%;
`

export default function Home() {

    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortened, setShortened] = useState("");
    const [isLink, setIsLink] = useState(false);



    async function makeUrl() {
        /*Check validity of alias using encodeURIComponent as mentioned on Piazza, return early if fail so the rest of the function doesn't run*/
        if (encodeURIComponent(alias) !== alias) {
            setShortened("Invalid alias: you can only use URL characters");
            setIsLink(false);
            return;
        }

        /*Alias uses valid characters*/
        const boolean = await createNewAlias(alias, url);
        if (!checkLink(url)) {
            setShortened("Invalid URL")
            setIsLink(false);
        } else if (!boolean) {
            setShortened("Invalid Alias: Alias is already in use or empty");
            setIsLink(false);
        } else {
            setShortened(`https://mp-5-three-indol.vercel.app/${alias}`);
            setIsLink(true);
        }
    }

    /*Learned to do navigator.clipboard.writeText() from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp*/
    /*Learn to do window.confirm from https://www.w3schools.com/js/js_popup.asp*/
    function copy(){
        navigator.clipboard.writeText(shortened);
        window.confirm("Copied!");
    }


    return (
        <StyledBackground>
            <h1>CS391 URL Shortener</h1>
            <StyledDiv>
                <h3>URL</h3>
                <StyledURL onChange={(e) => setUrl(e.target.value)} value={url}/>
                <h3>Alias</h3>
                <span> https://mp-5-three-indol.vercel.app/</span>
                <StyledAlias onChange={(e) => setAlias(e.target.value)} value={alias}/>
                <StyledButton onClick={makeUrl}>Shorten URL</StyledButton>
                <StyledResult>
                    <p>Your Shortened URL:</p>
                    {isLink ? (<span><StyledLink href={shortened} target="_blank">{shortened}</StyledLink> <CopyButton onClick={copy}><Image src='/copy.png' alt="copy button" width={20} height={20}/></CopyButton></span>):
                    <StyledError>{shortened}</StyledError>}
                    </StyledResult>
            </StyledDiv>
        </StyledBackground>
    );
}
