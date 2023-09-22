import axios from  'axios'

async function performAPICall(URL){
    const userData = await axios.get(URL).then((response)=>{
        console.log(response.status);
        console.log(response.data);
        return response.data;
    }).catch((error)=>{
        console.log(error);
    })

    return userData;
}

export default performAPICall;