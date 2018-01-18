<template>
    <div>
        <top-menu></top-menu>
        <transition name="fade" mode="out-in">
            <!--组件内容会填充到这里-->
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import TopMenu from './common/TopMenu'
    import JwtToken from './../helpers/jwt'
    import Cookie from 'js-cookie'

    export default {
        //每次刷新时（重新创建）检测本地是否有token，有就去请求api加载用户数据
        created() {
            if (JwtToken.getToken()) {
                this.$store.dispatch('setAuthUser')
            } else {
                if (Cookie.get('auth_id')) {
                    this.$store.dispatch('refreshToken')
                }
            }
        },
        components: {
            TopMenu
        }
    }
</script>
