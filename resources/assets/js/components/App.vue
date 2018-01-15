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

    export default {
        components: {
            TopMenu
        }
    }
</script>
