import axios from 'axios';
import { getToken } from '@Utilities/token';

const envUrl = process.env[process.env.NODE_ENV];

export async function getCurrentUser(id) {
    const url = `${envUrl}/user/id/${id}`;
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    };

    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}
//Get Users List
export async function getUserListApi(page = 1, search = '', role = '', limit = 10) {
    const url = `${envUrl}/user?page=${page}&search=${search}&role=${role}&limit=${limit}`
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
            return err.response.data;
        })
}

//Get Users List
export async function getUserInfoListApi() {
    const url = `${envUrl}/user/info`
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

export async function createUserApi(data) {
    const url = `${envUrl}/user/`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.post(url, data, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function updateUserApi(data) {
    const url = `${envUrl}/user/`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    delete data._id;
    return axios.put(url, data, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function updateUserByAdminApi(data) {
    const url = `${envUrl}/user/updatebyadmin/${data.id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    delete data._id;
    return axios.put(url, data, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteUserApi(id) {
    const url = `${envUrl}/user/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }

    return axios.delete(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function updateUserImageApi(id, file) {
    const url = `${envUrl}/user/updateimage/${id}`;
    const token = await getToken();
    const formData = new FormData()
    formData.append('file', file);

    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };
    return axios.post(url, formData, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })

}

export async function getUserImage(userId) {
    const url = `${envUrl}/user/image/${userId}`;
    const token = await getToken();

    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token,
        },
        responseType: 'blob',
    };
    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function updateUserPasswordApi(id, password) {
    const url = `${envUrl}/user/password/${id}`
    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }
    return axios.put(url, password, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export function getUserData(token = '') {
    const url = `${envUrl}/user/auth`;
    const auxToken = getToken()
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token ? token : auxToken
        }
    };

    return axios.get(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}


export async function getTimeLineActionsByUserIdApi(userId, page = 1, target='', description='', startdate='', enddate='', actiontype='', limit=10) {
    const url = `${envUrl}/user/timeline/actions/${userId}?page=${page}&limit=${limit}&target=${target}&description=${description}&startdate=${startdate}&enddate=${enddate}&actiontype=${actiontype}`
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
            return err.response.data;
        })
}

export async function getCurrentUserAttachmentsApi(userId) {
    const url = `${envUrl}/user/attachments/${userId}`
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
            return err.response.data;
        })
}

export async function createNewUserAttachmentApi(id, files) {
    const url = `${envUrl}/user/attachments/${id}`;

    const token = await getToken();
    const formData = new FormData()
    console.log("Files Api: ", files)
    
    for (let i = 0; i < files?.length; i++) {
        formData.append('files', files[i]);
      }

    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };

    return axios.post(url, formData, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteUserAttachmentApi(userId, attachmentId) {
    const url = `${envUrl}/user/attachments/${userId}/${attachmentId}`;

    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };
    return axios.delete(url, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}