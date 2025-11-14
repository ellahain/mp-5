
export default function checkLink(url: string){
    /*https://dev.to/theudemezue/how-to-validate-url-in-javascript-2ipi*/
        try{
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
}