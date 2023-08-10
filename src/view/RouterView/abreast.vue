<template>
    <div class="router-view-abreast">
        <el-button type="primary" :icon="Plus" @click.stop="dialogForm = true" />
        <div class="router-view-abreast-item" v-for="(item, index) in props.data" :key="index">
            <div>{{ item.name }}</div>
            <div>{{ item.path }}</div>
        </div>
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
import { reactive, ref, defineProps, defineEmits, onMounted, defineComponent, h } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()



const props = defineProps(["data"])
const emits = defineEmits(["update:data"])

const dialogForm = ref(false)
const routerFormRef = ref()
const routerForm = reactive({
    name: '',
    path: '',
})
const iClick = () => {
    const routerView = defineComponent((props) => {
        return () => {
            // 渲染函数或 JSX
            return h('div', {
                class: props.class
            }, h('router-view'))
        }
    }, {
        props: ["class"]
    })
    dialogForm.value = false
    router.addRoute({ ...routerForm, component: routerView.setup({ class: dialogForm.name }) })
    emits("update:data", router.getRoutes())
}
const dialogClose = () => {
    routerForm.name = ''
    routerForm.path = ''
}
onMounted(() => {
    console.log("onMounted", router.getRoutes())

})
</script>