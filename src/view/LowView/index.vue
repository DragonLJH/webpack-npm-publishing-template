<template>
    <div class="low-view">
        <div class="header">
            <el-button v-if="props.isChilren && useRouter()?.$route?.params.id" type="primary"
                @click="publishLowRouterView()">发布</el-button>
        </div>
        <div class="center">
            <div class="drag" @dragstart="dragstart">
                <div class="drag-item" v-for="(item, index) in list" :key="Math.random() * 1000" draggable="true"
                    :data-index="index">
                    {{ item.lable }}
                </div>
            </div>
            <div class="canvas" ref="canvas" @drop="drop" @dragover.prevent="() => { }" @mousedown=" targetIndex = -1">
                <Control v-for="(item, index) in canvasItems.data" :key="Math.random() * 1000" :style="toPx(item.style)"
                    :target-index="targetIndex" @controldown="mousedown" :index="index" @closeItem="closeItem">
                    <component :is="item.is" :props="item.props" />
                </Control>
                <!-- <div class="canvas-control" :class="targetIndex == index ? 'active' : ''"
                    v-for="(item, index) in canvasItems.data" :key="Math.random() * 1000" :style="toPx(item.style)"
                    @mousedown.stop="(e) => mousedown(e, index)">
                    <div class="icon close" @click="closeItem(index)"></div>
                    <div class="drop" :class="drop" @mousedown.stop="(e) => mousedown(e, index, drop)"
                        v-for=" drop in ['r', 'b', 'rb']" :key="Math.random() * 1000"></div>
                </div> -->
            </div>
            <div class="config">
                <template v-if="targetIndex !== -1">
                    <div class="demo-collapse">
                        <el-collapse v-model="activeNames">
                            <el-collapse-item title="位置大小" name="1">
                                <div class="config-item" v-for="([k, v], index) in Object.entries(myStyleConfig)"
                                    :key="index">
                                    <el-text style="width: 3rem;" truncated :title="v.label">{{ v.label }}</el-text>
                                    <el-input-number v-model="canvasItems.data[targetIndex].style[k]" :min="v.min"
                                        size="small" :precision="2" />
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="样式属性" name="2">
                                <div class="config-item"
                                    v-for="([k, v], index) in Object.entries(myPropsConfig.get(canvasItems.data[targetIndex].is))"
                                    :key="index">
                                    <el-text style="width: 3rem;" truncated :title="v.label">{{ v.label }}</el-text>
                                    <template v-if="v.type == 'String'">
                                        <el-input v-model="canvasItems.data[targetIndex].props[k]"
                                            placeholder="Please input" />
                                    </template>
                                    <template v-if="v.type == 'Object'">
                                        {{ canvasItems.data[targetIndex].props[k] }}
                                    </template>
                                    <template v-if="v.type == 'Array'">
                                        <el-select v-model="canvasItems.data[targetIndex].props[k]" clearable
                                            placeholder="Select">
                                            <el-option v-for="item in v.data" :key="item.value" :label="item.label"
                                                :value="item.value" />
                                        </el-select>
                                    </template>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </template>


                <!-- <template v-if="targetIndex !== -1">
                    <div class="config-item" v-for="([k, v], index) in Object.entries(myStyleConfig)" :key="index">
                        <el-text style="width: 3rem;" truncated :title="v.label">{{ v.label }}</el-text>
                        <el-input-number v-model="canvasItems.data[targetIndex].style[k]" :min="v.min" size="small"
                            :precision="2" />
                    </div>
                    <div class="config-item"
                        v-for="([k, v], index) in Object.entries(myPropsConfig.get(canvasItems.data[targetIndex].is))"
                        :key="index">
                        <el-text style="width: 3rem;" truncated :title="v.label">{{ v.label }}</el-text>
                        <template v-if="v.type == 'String'">
                            <el-input v-model="canvasItems.data[targetIndex].props[k]" placeholder="Please input" />
                        </template>
                        <template v-if="v.type == 'Object'">
                            {{ canvasItems.data[targetIndex].props[k] }}
                        </template>
                        <template v-if="v.type == 'Array'">
                            <el-select v-model="canvasItems.data[targetIndex].props[k]" clearable placeholder="Select">
                                <el-option v-for="item in v.data" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </template>
                    </div>
                </template> -->
                <div v-if="targetIndex !== -1 && canvasItems?.data[targetIndex].is == 'LowRouterLinks'">
                    <el-button text @click="LowRouterLinksDialog = true">
                        新增导航栏
                    </el-button>
                </div>
                <div v-if="targetIndex !== -1 && canvasItems?.data[targetIndex].is == 'LowRouterView'">
                    <el-button text @click="LowRouterViewDialog = true">
                        导航视图修改
                    </el-button>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
    <el-dialog v-if="targetIndex !== -1 && canvasItems?.data[targetIndex].is == 'LowRouterView'"
        v-model="LowRouterViewDialog" title="Warning" fullscreen align-center>
        <div style="height: 100vh;">
            <LowView is-chilren :keyword="keyword"></LowView>
        </div>
    </el-dialog>
    <el-dialog v-if="targetIndex !== -1 && canvasItems?.data[targetIndex].is == 'LowRouterLinks'"
        v-model="LowRouterLinksDialog" title="Warning" fullscreen align-center>
        <div>{{ canvasItems.data[targetIndex].props.paths }}</div>
        <el-form ref="formRef" :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题" prop="label" :rules="[
                { required: true, message: '标题不能为空' },
            ]
                ">
                <el-input v-model="formInline.label" placeholder="输入标题" clearable />
            </el-form-item>
            <el-form-item label="路径" prop="path" :rules="[
                { required: true, message: '路径不能为空' },
            ]
                ">
                <el-input v-model="formInline.path" placeholder="输入路径" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
                <el-button @click="resetForm(formRef)">Reset</el-button>
                <el-button type="primary" @click="publish()">发布</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { reactive, ref, defineProps, computed, onMounted } from 'vue';
import { toPx, useThis, useRouter } from '../../utils/index';
import { Plus } from '@element-plus/icons-vue'
import Control from "./Control.vue"
import LowView from "./index.vue"
const props = defineProps({
    isChilren: { type: Boolean },
    keyword: {
        type: String,
        default: ""
    }
})
const activeNames = ref([])
const LowRouterLinksDialog = ref(false)
const LowRouterViewDialog = ref(false)
const { strLows, myPropsConfig, myStyleConfig, api } = useThis()
const canvas = ref()
const targetIndex = ref(-1)
const keyword = computed(() => {
    return useRouter().$route.params.id
})

const list = props.isChilren ? strLows.filter((item) => {
    return item.is.indexOf('Router') == -1
}) : strLows



const formRef = ref()
const formInline = reactive({
    label: "",
    path: ""
})
const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            canvasItems.data[targetIndex.value].props.paths.push({ ...formInline })
            formEl.resetFields()
        } else {
            return false
        }
    })
}

const publishFetch = (item, res = []) => {
    return api.POSTAPI("insertOrUpdateFile", { userName: "18022429170", value: item, res })
}

const publish = () => {
    const res = canvasItems.data[targetIndex.value].props.paths
    Promise.all(res.map((item) => {
        return publishFetch(item.path)
    })).then((value) => {
        console.log(value)
    })
}
const publishLowRouterView = () => {
    if (props.keyword) {
        publishFetch(props.keyword, canvasItems.data)
    }

}
const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

const canvasItems = reactive({
    data: []
})

const dragstart = (e) => {
    e.dataTransfer.setData("index", e.target.dataset.index);
}

const drop = (e) => {
    const index = e.dataTransfer.getData("index")
    const item = JSON.parse(JSON.stringify(list[index]))
    console.log("drop", item)
    const { x: eX, y: eY } = e
    const { x: cX, y: cY } = canvas.value.getBoundingClientRect()
    let left = eX - cX
    let top = eY - cY
    item.style = { ...item.style, top, left }
    canvasItems.data.push(item)
}
const mousedown = (dE, index, flag) => {
    targetIndex.value = index
    const { x: eX, y: eY } = dE
    const { top: sY, left: sX, width: sW, height: sH } = canvasItems.data[index].style
    // getBoundingClientRect()获取 canvas 元素的左，上，右和下分别相对浏览器视窗的位置  
    const { width: cW, height: cH } = canvas.value.getBoundingClientRect()
    const move = (mE) => {
        const { x: mX, y: mY } = mE

        let width = sW, height = sH, left = sX, top = sY
        if (flag) {
            if (flag.indexOf("r") !== -1) width += (mX - eX)
            if (flag.indexOf("b") !== -1) height += (mY - eY)
            if (width < 5) width = 5
            if (width > cW - sX) width = (cW - sX)
            if (height < 5) height = 5
            if (height > cH - sY) height = (cH - sY)

        } else {
            left += (mX - eX)
            top += (mY - eY)
            if (left < 0) left = 0
            if (left > cW - sW) left = (cW - sW)
            if (top < 0) top = 0
            if (top > cH - sH) top = (cH - sH)
        }
        canvasItems.data[index].style = { ...canvasItems.data[index].style, width, height, top, left }
    }
    const up = () => {
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
    }
    document.addEventListener("mousemove", move)
    document.addEventListener("mouseup", up)

}

const closeItem = (index) => {
    targetIndex.value = -1
    canvasItems.data.splice(index, 1)
    console.log("closeItem", index)
}

onMounted(() => {
    if (props.isChilren) {
        api.GETAPI("queryUKReadFile", { userName: "18022429170", value: props.keyword }).then((value) => {
            canvasItems.data = JSON.parse(value.data)
        })
    }
}) 
</script>
<style scoped>
.low-view {
    width: 100%;
    height: 100%;
    --h-hf: 50px;
}

.header,
.footer {
    height: var(--h-hf);
    box-sizing: border-box;
}

.header {
    border-bottom: solid 1px #ccc;
}

.footer {
    border-top: solid 1px #ccc;
}

.center {
    height: calc(100% - var(--h-hf)*2);
    display: flex;
}

.center>div {
    height: 100%;
}

.drag,
.config {
    width: 200px;
    padding: 10px;
    box-sizing: border-box;
}

.config-item {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    margin-top: 10px;
}


.drag {
    border-right: solid 1px #ccc;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 10px;
}

.drag-item {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0px 10px;
    border: solid 1px #ccc;
    box-sizing: border-box;
}

.config {
    border-left: solid 1px #ccc;
}

.canvas {
    width: calc(100% - 400px);
    position: relative;
}
</style>


