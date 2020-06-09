import PlatformPath from 'path'

const apiURL = "https://avatar.labpro.dev/"
const friendsAPI = "friends/"
const graphStartPoint = "1"

// Based on: https://malcoded.com/posts/react-http-requests-axios/
// Get friends data from an index
export async function GetData (index) {
    const p = PlatformPath.join(apiURL, friendsAPI, index);
    const response = await fetch(p);
    return await response.json();
}

// Get all person from API
export async function GetAllPerson () {
    var list = await TraverseGraphLoop (graphStartPoint, []);
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
    var list = currentList;
    if (response.status === 200)  {
        // Save name in currentList
        // console.log(list.filter(e => e.id === id)[0]);
        currentList.push({id: id, name: response.payload.name});
        var friends = response.payload.friends;
        for (let i = 0; i < friends.length; i++) {
            list = await TraverseGraphLoop(friends[i].id, list);
            // console.log (friends[i].id);
        }
    } else if (response.status === 404) {
        console.log("Missing: " + id);
    }

    return list;
}