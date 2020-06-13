import PlatformPath from 'path';
import url from 'url';
import axios from 'axios';

const apiURL = "https://avatar.labpro.dev/friends/"
const graphStartPoint = "1"

// Based on: https://malcoded.com/posts/react-http-requests-axios/
// Get friends data from an index
export async function GetData (index) {
    const p = url.resolve(apiURL, index);
    const response = await axios.get(p);
    console.log(response.data);
    return response.data;
}

// Get all person from API
export async function GetAllPerson () {
    let list = await TraverseGraphLoop (graphStartPoint, []);
    return list;
}

// Recursive function to get all person
// Id is the id of the person
// Currentlist is the currently tracked people data
async function TraverseGraphLoop (id, currentList) {
    if (currentList.some(e => e.id === id)) {
        return currentList;
    }

    // Get Friends List
    const response = await GetData(id);
    let list = currentList;
    if (response.status === 200)  {
        // Save name in currentList
        // console.log(list.filter(e => e.id === id)[0]);
        currentList.push({id: id, name: response.payload.name});
        let friends = response.payload.friends;
        for (let i = 0; i < friends.length; i++) {
            list = await TraverseGraphLoop(friends[i].id, list);
            // console.log (friends[i].id);
        }
    } else if (response.status === 404) {
        console.log("Missing: " + id);
    }

    return list;
}