import axios from "axios";

function getQuestions() {
    return axios.get('assets/questions.json');
}


export default {
    getQuestions
}