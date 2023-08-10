<template>
    <template v-if="props.com == 'Input'">
        <el-input :name="props.name"></el-input>
    </template>
    <template v-if="props.com == 'Select'">
        <el-select :name="props.name">
            <el-option v-for="item in props.options" :key="item.value" :label="item.label" :value="''" />
        </el-select>
    </template>
    <template v-if="props.com == 'DatePicker'">
        <el-date-picker :name="props.name"></el-date-picker>
    </template>
</template>
<script setup>
import { ref, defineProps, defineEmits, onMounted, reactive } from "vue"


const props = defineProps(['com', 'name', 'options'])
const emits = defineEmits([''])
onMounted(() => {   
    console.log("onMounted", props)
})
</script>
<style scoped>

</style>