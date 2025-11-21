import axios from "axios";

function getMap (){
    return axios.get('/assets/map.json');
}

export default {
    getMap
}