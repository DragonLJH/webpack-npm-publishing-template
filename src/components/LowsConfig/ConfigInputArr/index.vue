<template>
    <div class="input-arr">
        <el-button type="primary" @click="inputArrDialog = true">Primary</el-button>
    </div>

    <el-dialog custom-class="el-dialog-input-arr" v-model="inputArrDialog" title="input-arr" fullscreen align-center
        destroy-on-close @close="closeDialog">
        <div class="el-dialog-input-arr-body">
            <div class="el-dialog-input-arr-body-types">
                <draggable v-model="data.types" :group="{ name: 'inputArr', pull: 'clone', put: false }"
                    @start="drag = true" @end="drag = false" :clone="typeClone" item-key="id">
                    <template #item="{ element }">
                        <div>{{ element.label }}</div>
                    </template>
                </draggable>

                <!-- <div v-for="(item, index) in types.data" :key="index">{{ item.label }}</div> -->
            </div>
            <div class="el-dialog-input-arr-body-main">
                <draggable v-model="data.inputArr" handle=".input-item-drag" group="inputArr" @start="drag = true"
                    @end="drag = false" item-key="id" @click="selectInputItem(-1)">
                    <template #item="{ element, index }">
                        <div class="input-item" :class="(index == activeInputItem) ? 'active' : ''"
                            @click.stop="selectInputItem(index)">
                            <div class="input-item-label">{{ element.label }}</div>
                            <div class="input-item-com">
                                <!-- <component :is="getCom(element.com)" :name="element.name" v-model="element.value"></component> -->
                                <InputArr v-bind="element"></InputArr>
                            </div>
                            <div class="input-item-drag">
                                <el-icon>
                                    <Rank />
                                </el-icon>
                            </div>
                        </div>
                    </template>
                </draggable>
                <div class="el-dialog-input-arr-body-main-footer">
                    <el-icon @click="footerC">
                        <Setting />
                    </el-icon>
                    <div v-for="(item, index) in checkboxGroup.data" :key="index">
                        {{ item.label }}
                    </div>
                </div>
            </div>
            <div class="el-dialog-input-arr-body-config">
                <div v-if="activeInputItem != -1">
                    <div class="item">
                        <div>label</div>
                        <div><el-input v-model="data.inputArr[activeInputItem].label"></el-input></div>
                    </div>
                    <div class="item">
                        <div>name</div>
                        <div><el-input v-model="data.inputArr[activeInputItem].name"></el-input></div>
                    </div>
                    <div v-if="data.inputArr[activeInputItem]?.options" class="item">
                        <div>options</div>
                        <div style="display: flex;align-items: center;gap: 10px;">
                            <el-select>
                                <el-option v-for="item in data.inputArr[activeInputItem].options" :key="item.value"
                                    :label="item.label" :value="''" />
                            </el-select>
                            <AddOptionsConfig v-model:options="data.inputArr[activeInputItem].options" />
                        </div>
                    </div>
                    {{ data.inputArr[activeInputItem] }}
                </div>
                <div v-if="footerConfig">
                    <obj-checkbox v-model:data="checkboxGroup.data"></obj-checkbox>
                </div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="inputArrDialog = false">Cancel</el-button>
                <el-button type="primary" @click="confirm">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, defineProps, defineEmits, onMounted, reactive, watchEffect } from "vue"
import { Rank, Setting } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'
import InputArr from '../../InputArr/index.vue'
import AddOptionsConfig from './AddOptionsConfig.vue'
import ObjCheckbox from './ObjCheckbox.vue'

const props = defineProps({
    inputArr: {
        type: Array
    }
})
const emits = defineEmits(["update:inputArr"])
const comObj = {
    "Input": "el-input",
    "Select": "el-select",
    "DatePicker": "el-date-picker",
    // "Radio": "el-radio-group",
    // "Checkbox": "el-checkbox",
}
const getCom = (val) => {
    return comObj[val]
}
const data = reactive({
    types: [{ name: "Input", label: "输入框" }, { name: "Select", label: "选择器", options: [] },
    // { name: "Radio", label: "单选框" }, { name: "Checkbox", label: "多选框" },
    { name: "DatePicker", label: "日期选择器" }],
    inputArr: []
})
const id = ref(0)
const inputArrDialog = ref(false)
const drag = ref(false)
const activeInputItem = ref(-1)
const footerConfig = ref(false)
const checkboxGroup = reactive({
    data: []
}) 

const typeClone = (res) => {
    id.value += 1
    return {
        ...res,
        com: res.name,
        name: "",
        label: "",
        value: "",
        id: id.value
    }
}

const selectInputItem = (value) => {
    activeInputItem.value = value
    footerConfig.value = false
}

const confirm = () => {
    inputArrDialog.value = false
    emits("update:inputArr", [...data.inputArr, checkboxGroup.data])
}

const footerC = () => {
    activeInputItem.value = -1
    footerConfig.value = true
}

const closeDialog = () => {
    data.inputArr = []
}
watchEffect(() => {
    data.inputArr = props.inputArr.slice(0, -1)
    checkboxGroup.data = props.inputArr.slice(-1)[0] 
})
onMounted(() => {
    // const inputArr = props.inputArr.slice(0, -1)
    // const buttonForm = props.inputArr.slice(-1)[0]
    // data.inputArr = inputArr
    // checkboxGroup.data = buttonForm
})
</script>

<style scoped>
.el-dialog-input-arr-body {
    width: 100%;
    height: 70vh;
    border: solid 1px #ccc;
    display: flex;
    gap: 10px;
    box-sizing: border-box;
}

.el-dialog-input-arr-body>div {
    height: 100%;
    outline: solid 1px #ccc;
}

.el-dialog-input-arr-body-types {
    width: 100px;
}

.el-dialog-input-arr-body-types>div>div {
    margin: 2px 5px;
    padding: 2px 5px;
    width: calc(100% - 10px);
    border: solid 1px #ccc;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
}

.el-dialog-input-arr-body-config {
    width: 200px;
    padding: 0px 10px;
    box-sizing: border-box;
}

.el-dialog-input-arr-body-config .item {
    margin-top: 10px;
}

.el-dialog-input-arr-body-main {
    width: calc(100% - 320px);
}

.el-dialog-input-arr-body-main>div:first-child {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-wrap: wrap;
    gap: 5px 10px;
    flex-wrap: wrap;
    align-content: flex-start;
}

.el-dialog-input-arr-body-main>.el-dialog-input-arr-body-main-footer {
    position: relative;
    height: 50px;
    border-top: solid 1px #ccc;
    box-sizing: border-box;
    padding-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.el-dialog-input-arr-body-main-footer>.el-icon {
    position: absolute;
    top: 0;
    right: 0;
}

.el-dialog-input-arr-body-main-footer>div {
    padding: 5px 15px;
    border: solid 1px #ccc;
    box-shadow: 1px 1px 5px 1px #ccc;
    cursor: pointer;
    border-radius: 10px;
}

.el-dialog-input-arr-body-main-footer>div:hover {
    background-color: #999;
    color: #fff;
}

.input-item {
    --i-h: 40px;
    display: flex;
    outline: solid 1px #ccc;
    margin-top: 5px;
    height: var(--i-h);
    align-items: center;
    float: left;
    width: calc(50% - 5px);
}

.input-item.active {
    outline: solid 1px #0bb6f9;
}

.input-item-label {
    background-color: #eee;
    width: 100px;
    height: var(--i-h);
    box-sizing: border-box;
    border-right: solid 1px #ccc;
    text-align: center;
    line-height: var(--i-h);
}

.input-item-com {
    width: calc(100% - 132px);
    overflow: hidden;
}

.input-item-com>>>.el-input {
    width: 100%;
}

.input-item-drag {
    position: relative;
    width: 32px;
    height: 32px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>