import PlatformPath from 'path'

// Based on: https://malcoded.com/posts/react-http-requests-axios/
async function GetData (index){
    const p = PlatformPath.join("https://avatar.labpro.dev/friends/", index.toString());
    const response = await fetch(p);
    return await response.json();
}

export default GetData;