<template>
    <el-checkbox-group v-model="checkboxs.data" size="large" @change="checkboxGroupChange"> 
        <el-checkbox v-for="([label,value], index) in Object.entries(checkboxs.list)" :key="index"  border :label="label">{{value  }} </el-checkbox> 
    </el-checkbox-group>
</template>
<script setup>
import { defineProps, defineEmits, ref, reactive,onMounted } from "vue"

const props = defineProps(["data"])
const emits = defineEmits(["update:data"])

const checkboxs = reactive({
    list: {
        bc: "保存",
        tj: "提交",
        qx: "取消",
    },
    data: []
})
const checkboxGroupChange = (value) => {
    let data = checkboxs.data.map((item)=>{ 
        return {label:checkboxs.list[item],value:item}
    })
    emits("update:data",data)
    console.log("checkboxGroupChange",data)
}

onMounted(()=>{
    if(props.data) checkboxs.data = props.data.map(item=>item.value)
})

</script>