<template>
    <div class="router-view-children">
        <div class="router-view-children-top">
            <el-button v-if="props.parentName" type="primary" :icon="Plus" @click.stop="dialogForm = true" />
        </div>

        <template v-for="(item, index) in props.data" :key="index">
            <div class="router-view-children-item">
                {{ item.name }}
                <template v-if="item.children">
                    <Children v-model:data="item.children" :parent-name="item.name" />
                </template>
            </div>
        </template>
    </div>
    <el-dialog v-model="dialogForm" title="新增路由" @close="dialogClose" destroy-on-close>
        <el-form :model="routerForm" ref="routerFormRef">
            <el-form-item label="路由名称">
                <el-input v-model="routerForm.name" placeholder="路由名称" clearable />
            </el-form-item>
            <el-form-item label="路由路径">
                <el-input v-model="routerForm.path" placeholder="路由路径" clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogForm = false">取消</el-button>
                <el-button type="primary" @click="iClick">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { reactive, ref, defineProps, defineEmits } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import Children from "./children.vue"
import RouterView from "../../components/Lows/LowRouterView/index.vue"
const router = useRouter()
const route = useRoute()
const routerView = {
    template: "<router-view></router-view>"
}

const props = defineProps(["data", "parentName"])
const emits = defineEmits(["update:data"])

const dialogForm = ref(false)
const routerFormRef = ref()
const routerForm = reactive({
    name: '',
    path: '',
})
const iClick = () => {
    dialogForm.value = false
    if (props.parentName) {
        router.addRoute(props.parentName, { ...routerForm, component: routerView })
    } else {
        router.addRoute({ ...routerForm, component: routerView }) 
    }
    console.log("iClick", router.getRoutes())
}
const dialogClose = () => {
    routerForm.name = ''
    routerForm.path = ''
}
console.log("router-view-children", props)
</script>
<style scoped>
.router-view-children {
    position: relative;
    padding: 20px;
    margin: 20px;
    line-height: 30px;
    box-sizing: border-box;
    border: solid 1px #ccc;
}

.router-view-children-top {
    display: flex;
    justify-content: flex-end;
}

.router-view-children-item {
    border: solid 1px #ccc;
}
</style>