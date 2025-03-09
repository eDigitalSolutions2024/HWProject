import axios from 'axios';

const envUrl = process.env[process.env.NODE_ENV];


export function signUpApi(data) {

}

export function loginApi(data) {
    const url = `${envUrl}/auth/login`

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.post(url, data, params)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err.response?.data;
        })
}



export async function getUserApi(data) {

}