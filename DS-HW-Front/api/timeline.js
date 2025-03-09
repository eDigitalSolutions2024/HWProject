import axios from 'axios';
import { getToken } from '@Utilities/token';
const envUrl = process.env[process.env.NODE_ENV];


export async function getTimeLineListApi(page = 1) {
    const url = `${envUrl}/timeline/?page=${page}`;
    const token = await getToken();
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}