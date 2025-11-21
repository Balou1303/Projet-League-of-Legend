import axios from "axios";

function getRegions() {
    return axios.get('/assets/regions.json');
}

export default {
    getRegions,
}