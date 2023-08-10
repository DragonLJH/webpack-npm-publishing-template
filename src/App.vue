<template>
    <el-menu :default-active="route.path" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
        <template v-for="(item, index) in routerStore.data.router" :key="item.name">
            <el-menu-item :index="item.path">{{ item.name }}</el-menu-item>
        </template>
    </el-menu>
    <div class="app-main">
        <router-view></router-view>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router"
import { useRouterStore } from "./store/index"
const route = useRoute()

const routerStore = useRouterStore()
routerStore.getRouter()
console.log("app", routerStore.data)
</script>
<style scoped>
.el-menu-demo {
    height: 50px;
}

.app-main {
    height: calc(100% - 50px);
}
</style>