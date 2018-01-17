import jwt from './../../helpers/jwt'

export default {
    actions:{
        loginRequest({dispatch},formData){
            axios.post('/api/login', formData).then(response => {
                //保存 access_token
                jwt.setToken(response.data.token)

                dispatch('setAuthUser')
            }).catch(error => {

            })
        }
    }
}