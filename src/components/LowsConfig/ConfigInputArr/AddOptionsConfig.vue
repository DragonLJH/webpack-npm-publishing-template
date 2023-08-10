<template>
    <el-icon size="30"  @click="dialogOptions = true" >
        <Plus />
    </el-icon>
    <el-dialog v-model="dialogOptions" title="增加下拉框数据" width="100%">

        <el-form ref="formOptions" :model="ruleForm" :inline="true" :rules="rules">
            <el-form-item label="label" prop="label">
                <el-input v-model="ruleForm.label" autocomplete="off" />
            </el-form-item>
            <el-form-item label="name" prop="name">
                <el-input v-model="ruleForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formOptions)">Add</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="optionsData.table" stripe style="width: 100%">
            <el-table-column prop="label" label="Label" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="operate" label="Operate">
                <template #default="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>

        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogOptions = false">Cancel</el-button>
                <el-button type="primary" @click="confirm">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref, reactive } from "vue"
import { Plus } from '@element-plus/icons-vue'

const props = defineProps(["options"])
const emits = defineEmits(["update:options"])

const optionsData = reactive({
    table: []
})
const dialogOptions = ref(false)
const formOptions = ref()
const ruleForm = reactive({
    label: "",
    name: ""
})
const rules = reactive({
    label: [
        {
            required: true,
            message: 'label不能为空',
            trigger: 'change',
        },
    ],
    name: [
        {
            required: true,
            message: 'name不能为空',
            trigger: 'change',
        },
    ],
})

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            optionsData.table.push({ ...ruleForm })
            ruleForm.label = ""
            ruleForm.name = ""
            formEl.resetFields()
        } else {
            return false
        }
    })
}

const confirm = () => {
    dialogOptions.value = false
    emits("update:options", optionsData.table)
}

</script>