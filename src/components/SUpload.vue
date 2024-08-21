<template>
  <div @click="uploadClick">
    <input
      :name="props.name"
      :accept="props.accept"
      type="file"
      style="display: none"
      ref="uploadInput"
      @change="uploadFileChange"
    />
    <!-- 插槽用来插入自定义上传布局 -->
    <slot></slot>
  </div>
</template>

<script setup>
  import { ref, defineProps, toValue } from 'vue';
  import { showFailToast } from 'vant';

  const props = defineProps({
    // 上传地址
    action: {
      type: String,
      default: ''
    },
    // 上传文件名
    name: {
      type: String,
      default: 'file'
    },
    // 是否在选取文件后立即进行上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 文件上传的类型
    accept: {
      type: String,
      default: 'video/*' // image/*
    },
    // 上传文件前
    beforeUpload: {
      type: Function,
      default: () => Function
    },
    // 上传文件时的钩子
    onProgress: {
      type: Function,
      default: () => Function
    },
    // 默认最大上传1MB
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 1
    },
    onSuccess: {
      type: Function,
      default: () => Function
    },
    onError: {
      type: Function,
      default: () => Function
    }
  });
  const file = ref(null);
  const files = ref([]);
  const uploadInput = ref(null);
  // 上传文件
  const uploadClick = () => {
    uploadInput.value.value = '';
    uploadInput.value.click();
  };
  // 文件改变时
  const uploadFileChange = (e) => {
    console.log('文件改变时-------------', e);
    const imgformat = /image\/(jpg|jpeg|png)$/;
    const videoformat = /video\/(mp4|mov|quicktime)$/;
    console.log('视频格式', e.target.files[0].type);
    if (!(imgformat.test(e.target.files[0].type) || videoformat.test(e.target.files[0].type))) {
      showFailToast('请上传 jpg/jpeg/png 格式图片或者 mp4/mov 格式视频');
      return false;
    }
    if (e.target.files[0].size > props.maxSize) {
      showFailToast(`文件大小不能超过 ${formatSize(props.maxSize)}`);
      return false;
    }
    file.value = e.target.files[0];
    uploadFile();
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + 'B';
    }
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + 'KB';
    }
    if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
    }
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + 'GB';
  };
  // 上传文件
  const uploadFile = () => {
    let beforeUploadbool = true;
    beforeUploadbool = props.beforeUpload && props.beforeUpload(toValue(file));
    // beforeUpload返回的值。 beforeUploadbool为false,终止上传
    if (!beforeUploadbool) {
      return;
    }
    submit();
  };
  const submit = () => {
    const xhr = new XMLHttpRequest(); // 1. 创建对象
    const form = new FormData(); // 创建一个空表单数据对象
    form.append(props.name, file.value); // 要上传的文件
    form.append('bucket', 'mom/proposal'); // 指定文件上传到的目标位置或目录
    xhr.open('POST', props.action, true); // 2. 与服务器建立连接
    let token =
      '4WP_rTGTnd1Ck2R2MoQiiRT2HUDwQ76aneCSLn2SflYlRefhxHvuggHfnYmx4-t9KUOOP2nUl6Ronxc-ipiiHkO3Q8QgBIOuH9spHSZhWTjHFsDUF5vC_nGa_9TMoVKN';
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.upload.onprogress = (e) => {
      // 监听文件传输进度
      props.onProgress && props.onProgress(e);
    };
    xhr.onload = (e) => {
      // 监听文件传输进度
      console.log('上传onload', e);
      if (e.target.readyState === 4 && e.target.status === 200) {
        //4 && 200
        props.onSuccess && props.onSuccess(JSON.parse(e.target.response), file.value);
      }
    };
    xhr.onerror = (error) => {
      props.onError && props.onError(error, file.value);
    };
    console.log('form', form);
    xhr.send(form); // 3. 发送请求;
  };
</script>

<style></style>
