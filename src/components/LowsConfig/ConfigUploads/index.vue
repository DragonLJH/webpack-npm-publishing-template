<template>
    <div class="config-uploads">
        <el-upload style="width: 100%;" v-model:file-list="props.srcArr" class="upload-demo"
            :action="'http://localhost:8787/userImgStorage/uploadImg/' + userName" name="uploadImg" :show-file-list="false"
            :on-success="handleAvatarSuccess" :on-remove="handleRemove">
            <el-button type="primary">Primary</el-button>
        </el-upload>
        <div class="inputMsg" v-for="(item, index) in props.srcArr" :key="item.url">
            <el-image class="inputMsg-img" :initial-index="index" :preview-src-list="props.srcArr.map(res => {
                return getImg(res.url)
            })" style="width: 50px; height: 50px;" :src="getImg(item.url)" fit="contain" />
            <el-input @change="(val) => textareaChage(val, item.url)" v-model="item.name" :rows="2" type="textarea"
                placeholder="标题" clearable />
            <el-icon @click="inputMsgClose(index)">
                <CloseBold />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, reactive } from "vue"
import { CloseBold } from '@element-plus/icons-vue'
import { useThis, repeatConfirmation } from '../../../utils/index';
const { api, userName } = useThis()
const props = defineProps(["srcArr"])
const emits = defineEmits(["update:srcArr"])
const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    console.log({
        response,
        uploadFile
    })
    if (response.src) {
        emits("update:srcArr", [...props.srcArr, { name: "", url: response.src }])
    }
    // emits("update:src", URL.createObjectURL(uploadFile.raw))

}
const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)

}

const inputMsgClose = (index) => {
    repeatConfirmation("是否删除", () => {
        let res = [...props.srcArr]
        res.splice(index, 1)
        emits("update:srcArr", res)
    })
}
const textareaChage = (keyword, imgSrc) => {
    api.POSTAPI("/userImgStorage/updateKByImgSrc", { imgSrc, keyword }).then(val => {
        console.log("textareaChage", val) 
    })
}
onMounted(() => {
    console.log("onMounted", props.srcArr)
})
const getImg = (val) => {
    return "http://127.0.0.1:5500/img/" + userName + "/" + val
}
const getBackgroundImage = (val) => {
    return "url(http://127.0.0.1:5500/img/" + userName + "/" + val + ")"
}
</script>
<style scoped>
.inputMsgs {}

.inputMsg {
    position: relative;
    border: solid 1px #ccc;
    height: 50px;
    display: flex;
    align-items: center;
    gap: 5px;
    overflow: hidden;
    margin: 10px 0px 0px 0px;
    box-shadow: 1px 1px 10px 1px #ccc;
    padding-right: 5px;
}

.inputMsg-img {
    box-shadow: 1px 1px 10px 1px #ccc;
}
</style>