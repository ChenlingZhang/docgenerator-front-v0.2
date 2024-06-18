import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

const httptool = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 1000,
})

export function getTableDataRequest(param) {
    const url = "http://localhost:8088/"+param
    return axios.get(url)
}