import axios from "axios";

function getChampions() {
    return axios.get('https://ddragon.leagueoflegends.com/cdn/15.21.1/data/fr_FR/champion.json')
    
}

function getChampionDetails(id) {
    return axios.get('https://ddragon.leagueoflegends.com/cdn/15.21.1/data/fr_FR/champion/' +id + '.json')
}

export default {
    getChampions,
    getChampionDetails
}