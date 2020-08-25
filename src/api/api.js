import axios from 'axios';


const baseQuestionsURL = `http://localhost:5000/questions`;
const baseAuthURL = `http://localhost:5000/auth`;

export const authApi = {
    async login(email, password) {
        return await axios.post(`${baseAuthURL}/login`, { email, password });
    }
}

export const questionsApi = {

    async getQuestionsFromDB() {
        const response = await axios.get(`${baseQuestionsURL}`);
        return response.data;
    },
    async getQuestionById(id) {
        const response = await axios.get(`${baseQuestionsURL}/${id}`);
        return response.data
    },
    async editQuestion(id, editQuestion, token) {
        await axios.post(`${baseQuestionsURL}/update/${id}`, editQuestion, { headers: { Authorization: token } });
    },
    async removeQuestion(id, token) {
        await axios.delete(`${baseQuestionsURL}/${id}`, { headers: { Authorization: token } });
    },
    async addNewQuestion(newQuestion) {
        await axios.post(`${baseQuestionsURL}/add`, newQuestion);
    }

}