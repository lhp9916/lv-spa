import jwt from './../../helpers/jwt'
import * as types from "../mutation-type";

export default {
    actions: {
        loginRequest({dispatch}, formData) {
            return axios.post('/api/login', formData).then(response => {
                dispatch('loginSuccess',response.data)
            })
        },
        logoutRequest({dispatch}) {
            return axios.post('/api/logout').then(response => {
                jwt.removeToken()
                jwt.removeAuthId()
                dispatch('unsetUser')
            })

        },
        loginSuccess({dispatch}, data) {
            jwt.setToken(data.token)
            jwt.setAuthId(data.auth_id)
            dispatch('setAuthUser')
        }
    }
}