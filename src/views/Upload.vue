<template>
  <div class="s-upload">
    <s-upload
      :name="name"
      :action="'http://10.68.0.3:9900/api-file/files-minio'"
      :before-upload="beforeAvatarUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-progress="onProgress"
    >
      <img class="upload-img" src="@/assets/img/images/upload-img-video-icon.png" alt="" />
    </s-upload>
    <div v-show="uploadbool">
      <div>
        <label>文件名：</label>
        {{ file.name ? file.name : '' }}
        <span class="mb">{{ file.size ? formatSize(file.size) : '0b' }}</span>
      </div>
      <div>
        <label>已上传</label><span class="jindu">{{ percent }}%</span>
      </div>
    </div>
    <!-- autoplay:自动播放 loop：循环播放 -->
    <video v-show="uploadbool" controls class="video" id="video" :src="videoUrl" crossorigin="anonymous"></video>
  </div>
</template>

<script setup>
  import SUpload from '@/components/SUpload.vue'
  import { ref } from 'vue'
  const percent = ref(0) // 进度
  const videoUrl = ref('')
  const file = ref({})
  const uploadbool = ref(false)
  const beforeAvatarUpload = file => {
    console.log('上传之前', file)
    //我们可以通过file里的信息上传前判断文件的大小、格式、时长
    file.value = file
    videoUrl.value = getFullPath(file)
    uploadbool.value = true
    return true
  }
  const onProgress = e => {
    //e.loaded 已上传的，e.total总共
    percent.value = parseInt((e.loaded / e.total).toFixed(2) * 100)
  }
  const uploadSuccess = (res, file) => {
    console.log('上传成功', res, file)
  }
  const uploadError = (err, file) => {
    console.log('上传失败', err, file)
  }
  // 把文件转换成base64地址
  //window.webkitURL.createObjectURL(file) 方法，将正在上传的文件转换成了可访问的 URL 对象，然后直接在浏览器中播放视频。
  const getFullPath = file => {
    return window.webkitURL.createObjectURL(file)
  }

  const formatSize = bytes => {
    if (bytes < 1024) {
      return bytes + 'B'
    }
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + 'KB'
    }
    if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(1) + 'MB'
    }
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + 'GB'
  }
</script>
<style lang="less" scoped>
  .s-upload {
    label {
      font-weight: bold;
      font-size: 16px;
    }
    .upload-img {
      width: 60px;
      height: 60px;
    }
    .jindu {
      margin-left: 4px;
      color: #4a90e2;
      font-weight: bold;
      font-size: 16px;
    }
    .video {
      background: black;
      width: 200px;
      height: 100px;
    }
    .mb {
      color: #999;
      font-size: 15px;
      margin: 0 20px 0 10px;
    }
  }
</style>
