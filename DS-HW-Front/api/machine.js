import axios from 'axios';
import { getToken } from '@Utilities/token';

const envUrl = process.env[process.env.NODE_ENV];

//Get current Machine
export async function getMachineById(id) {
    const url = `${envUrl}/machineCalibration/id/${id}`;
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

// get machine by id no auth
export async function getMachineByIdNoAuth(id) {
    const url = `${envUrl}/machineCalibration/guest/id/${id}`;
    const params = {
        headers: {
            'Content-Type': 'application/json',
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

export async function generateQR(id) {
    const url = `${envUrl}/machineCalibration/guest/qr/id/${id}`;
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
 
//Get Machine List
export async function getMachineListApi(page = 1, search = '', role = '', limit = 1000) {
    // ?page=${page}&search=${search}&role=${role}&limit=${limit}
    const url = `${envUrl}/machineCalibration/`
    const token = await getToken();
   
    return axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        },
        params: {
            page,
            search,
            role,
            limit
        }
    })
    .then(response => response.data)
    .catch(err => err.response.data);
}

//Get All Machine List
export async function getAllMachineListApi(page = 1, search = '', role = '', limit = 1000) {
    // ?page=${page}&search=${search}&role=${role}&limit=${limit}
    const url = `${envUrl}/machineCalibration/allmachines`
    const token = await getToken();

    return axios.get(url, {
        headers: {
            'Content-Type': 'aplication/json',
            xtoken : token
        },
        params :{
            page,
            search,
            role,
            limit
        }
    })
    .then(response => response.data)
    .catch(err => err.response.data);
}

export async function getMachineImage(machineId) {
    const url = `${envUrl}/machineCalibration/image/${machineId}`;
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

export async function getMachineImageNoAuth(machineId) {
    const url = `${envUrl}/machineCalibration/guest/image/${machineId}`;

    const params = {
        headers: {
            'Content-Type': 'application/json',
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

export async function getMachineTag(machineId) {
    const url = `${envUrl}/machineCalibration/tag/image/${machineId}`;
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

export async function getMachineTagNoAuth(machineId) {
    const url = `${envUrl}/machineCalibration/guest/tag/image/${machineId}`;

    const params = {
        headers: {
            'Content-Type': 'application/json',
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

//Get Users List
// export async function getUserInfoListApi() {
//     const url = `${envUrl}/user/info`
//     const token = await getToken();
//     const params = {
//         headers: {
//             'Content-Type': 'application/json',
//             xtoken: token
//         }
//     }
//     return axios.get(url, params)
//         .then(response => {
//             return response.data;
//         })
//         .catch(err => {
//             return err;
//         })
// }

export async function createMachineApi(data) {
    const url = `${envUrl}/machineCalibration`;
    const token = await getToken();

    // Convert `data` into `FormData`
    const formData = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === "cargar_certificado" && data[key]?.[0]) {
                // Append the file correctly
                formData.append(key, data[key][0]); 
            } else {
                formData.append(key, data[key]);
            }
        }
    }

    console.log('createMachineApi formData:', formData);

    // Set up headers (do not manually set Content-Type for FormData)
    const params = {
        headers: {
            xtoken: token
        }
    };

    return axios.post(url, formData, params)
        .then(response => {
            console.log('create machine api response:', response);
            return response.data;
        })
        .catch(err => {
            console.error('Error in createMachineApi:', err);
            return err;
        });
}


export async function updateMachineByAdminApi(data) {
    const url = `${envUrl}/machineCalibration/updatebyadmin/${data._id}`

    const token = await getToken();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            xtoken: token
        }
    }

    const formData = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }

    delete data._id;
    return axios.put(url, formData, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })
}

export async function deleteMachine(id) {
    const url = `${envUrl}/machineCalibration/deletebyadmin/${id}`
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
            console.error('Error al eliminar máquina:', err);
            return err.response?.data || { error: 'Ocurrió un error inesperado al eliminar la máquina.' };
            //return err;
        })
}

export async function updateMachineImageApi(id, file) {
    const url = `${envUrl}/machineCalibration/updatebyadmin/${id}`;
    const token = await getToken();
    const formData = new FormData()
    formData.append('foto_equipo', file);

    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };
    return axios.put(url, formData, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })

}

export async function updateMachineTagImageApi(id, file) {
    const url = `${envUrl}/machineCalibration/updatebyadmin/${id}`;
    const token = await getToken();
    const formData = new FormData()
    formData.append('foto_etiqueta_calibracion', file);

    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };
    return axios.put(url, formData, params)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err;
        })

}
export async function updateMachineCertificadoApi(id, file) {
    const url = `${envUrl}/machineCalibration/updatebyadmin/${id}`;
    const token = await getToken();

    const formData = new FormData();
    formData.append('cargar_certificado', file);

    const params = {
        headers: {
            'Content-Type': 'multipart/form-data',
            xtoken: token
        }
    };

    return axios.put(url, formData, params)
        .then(response => response.data)
        .catch(err => err);
}

