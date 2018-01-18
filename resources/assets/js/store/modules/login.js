import jwt from './../../helpers/jwt'
import * as types from "../mutation-type";

export default {
    actions: {
        loginRequest({dispatch}, formData) {
            return axios.post('/api/login', formData).then(response => {
                //保存 access_token
                jwt.setToken(response.data.token)

                dispatch('setAuthUser')
            })
        },
        logoutRequest({dispatch}) {
            return axios.post('/api/logout').then(response => {
                jwt.removeToken()
                dispatch('unsetUser')
            })

        }
    }
}