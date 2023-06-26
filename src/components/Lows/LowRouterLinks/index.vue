<template>
    <div class="low-router-links">
        <!-- <el-menu :router="true" class="el-menu-demo" mode="horizontal" :default-active="activeIndex">
            <el-menu-item index="/Navigation/qwe">qwe</el-menu-item>
            <el-menu-item index="/Navigation/asd">asd</el-menu-item>
            <el-menu-item index="/Navigation/zxc">zxc</el-menu-item>
        </el-menu> -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
            <template v-for="(item, index) in data.props.paths" :key="index">
                <el-menu-item :index="prefixPath(item.path)">{{ item.label }}</el-menu-item>
            </template>
            <!-- <el-menu-item index="/LowView/Navigation/qwe">qwe</el-menu-item>
            <el-menu-item index="/LowView/Navigation/asd">asd</el-menu-item>
            <el-menu-item index="/LowView/Navigation/zxc">zxc</el-menu-item> -->
        </el-menu>
    </div>
</template>
<script setup>
import { defineProps, ref, computed } from "vue"
import { useRouter } from "../../../utils/index.js"
const data = defineProps(["props"])
console.log("props", data.props)
const activeIndex = computed(() => {
    return useRouter()?.$route?.path
})

const prefixPath = (value) => {
    return "/LowView/Navigation/" + value
}


</script>
<style>
.low-router-links {
    width: 100%;
    height: 100%;
}
 
</style>