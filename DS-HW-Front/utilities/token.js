const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
import jwtDecode from "jwt-decode";
import { getUserData } from "@Api/users";
import cookies from "js-cookie"

export function setToken(token) {
    cookies.set(`${ACCESS_TOKEN }`, token)
}

export function getToken() {
    const Token = cookies.get(ACCESS_TOKEN)
    if (!Token || Token === 'null') return null;
    return TokenExpire(Token) ? null : Token;
}

export function removeToken() {
    cookies.remove(ACCESS_TOKEN)
}

export function TokenExpire(Token) {
    const seconds = 60;
    const metaToken = jwtDecode(Token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000; //fecha de hoy;
    return now > exp;
}

export const login = async (token) => {
    const idUser = await jwtDecode(token).uid;
    const response = await getUserData(token);
    const userData = response.user;
    await setToken(token);
    if(userData) return userData 
    else throw new Error('Algo Salio mal...');
    
}