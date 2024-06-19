import axios from 'axios'
import qs from 'qs'

const httptool = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 1000,
})

function urlBuilder(param){
    return "http://localhost:8088/" + param 
}

export function getTableDataRequest(param) {
    return axios.get(urlBuilder(param))
}

export function postRequestForClass(path, obj) {
    
    return axios.post(urlBuilder(path), obj, {
        headers: { 'Content-Type': 'application/json' }
    })
}

export function postRequestWithStringParm(path, param) {
    return axios.post(urlBuilder(path), qs.stringify({"filePath": param}, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }))
}