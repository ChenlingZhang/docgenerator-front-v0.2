import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

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