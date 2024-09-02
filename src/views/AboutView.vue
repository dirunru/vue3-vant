<template>
  <div>
    <van-button @click="scanQRCode">扫描</van-button>
    <SScan ref="scanRef" @on-err="handleErr" @on-success="onDecode" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import SScan from '@/components/SScan.vue';

  // -------------调用扫码页面-------------------
  const scanRef = ref(null);
  // 点击进行扫码
  const scanQRCode = () => {
    // app套壳的时候扫码，如果没有套壳就直接调用scanRef.value?.open();
    if (window.WebViewJavascriptBridge) {
      window.WebViewJavascriptBridge?.scanQRCode();
    } else {
      scanRef.value?.open();
    }
  };
  const onDecode = (result) => {
    console.log('扫码结果：', result);
  };
  const handleErr = (msg) => {
    console.log('handleErr', msg);
    showFailToast(msg);
  };
  //返回的结果是字符串,套壳app扫码结果
  window.scanQRCodeCallBack = (val) => {
    console.log('扫码结果：111', val);
  };
</script>

<style lang="less" scoped></style>
