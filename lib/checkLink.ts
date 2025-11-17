
export default function checkLink(url: string){
    let valid = false;
    /*https://dev.to/theudemezue/how-to-validate-url-in-javascript-2ipi*/
        try{
            new URL(url);
            valid = true;
        } catch (error) {
            valid = false;
        }

        if (url===""){
            valid = false;
        }
        const regex = /https?:\/\/(.+)/;
        valid = regex.test(url);

        console.log(valid);

        return valid;
}