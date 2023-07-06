<template>
    <el-upload class="avatar-uploader" :action="'http://localhost:8787/userImgStorage/uploadImg/' + userName"
        name="uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess">
        <img v-if="props.src" :src="getImg(props.src)" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <el-icon><Plus /></el-icon>
        </el-icon>
    </el-upload>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
import { Plus } from '@element-plus/icons-vue'
import { useThis } from '../../../utils/index';
const { api, userName } = useThis()
const props = defineProps(["src"])
const emits = defineEmits(["update:src"])
const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    if (response.src) {
        api.GETAPI("/userImgStorage/obtainPath").then((value) => {
            emits("update:src", response.src)
        })
    }
    // emits("update:src", URL.createObjectURL(uploadFile.raw))

}

const getImg = (val) => {
    return "http://127.0.0.1:5500/img/" + userName + "/" + val
}
</script>
<style scoped>
.avatar-uploader {
    --w: 50px;
    --h: 50px;
}

.avatar-uploader .avatar {
    width: var(--w);
    height: var(--h);
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: var(--w);
    height: var(--h);
    text-align: center;
}
</style>