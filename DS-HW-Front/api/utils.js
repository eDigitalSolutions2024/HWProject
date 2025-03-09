import axios from 'axios';
import { getToken } from '@Utilities/token';

const envUrl = process.env[process.env.NODE_ENV];

export async function downloadAttachmentApi(id) {
    const url = `${envUrl}/attachment/${id}`;
    const token = await getToken();
    const params = {
        method: 'GET',
        responseType: 'blob',
        xtoken: token
    }

    
    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function getAttachment(id) {
    const url = `${envUrl}/utils/attachment/${id}`;
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token,
        },
        responseType: 'blob',
    }
    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}