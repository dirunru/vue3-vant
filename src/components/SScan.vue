<template>
  <div class="yd-scan" :style="{ display: showScan ? '' : 'none' }">
    <div class="ku-scanner-header">
      <van-icon name="cross" class="icon" @click="stop" />
    </div>
    <div class="container">
      <div id="reader"></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onUnmounted, nextTick } from 'vue';
  import { Html5Qrcode } from 'html5-qrcode';
  import { showFailToast } from 'vant';

  const cameraId = ref('');
  const devicesInfo = ref('');
  const html5QrCode = ref(null);
  const result = ref('');
  const showScan = ref(false);

  const emit = defineEmits(['on-err', 'on-success']);
  onUnmounted(() => {
    stop();
  });
  const open = () => {
    showScan.value = true;
    nextTick(() => {
      getCameras();
    });
  };
  const getWidthHeight = () => {
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    return {
      w,
      h
    };
  };
  const getCameras = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        console.log('摄像头信息*******', devices);
        let rearCameraId = '';
        if (devices && devices.length) {
          for (let device of devices) {
            if (device.label.includes('facing back') || device.label.includes('后置相机')) {
              rearCameraId = device.id;
              break; // 找到第一个后置摄像头就停止循环
            }
          }
          if (rearCameraId) {
            cameraId.value = rearCameraId;
            devicesInfo.value = devices;
            start();
          } else {
            showFailToast('没有找到后置摄像头');
            // console.error('没有找到后置摄像头')
          }
        }
      })
      .catch((err) => {
        console.log('获取设备信息失败', err);
      });
  };

  // const getCameras = () => {
  //   Html5Qrcode.getCameras()
  //     .then(devices => {
  //       console.log('摄像头信息', devices)
  //       if (devices && devices.length) {
  //         // 如果有2个摄像头，1为前置的
  //         // if (devices.length > 1) {
  //         //   cameraId.value = devices[1].id
  //         // } else {
  //         //   cameraId.value = devices[0].id
  //         // }
  //         cameraId.value = devices[0].id
  //         devicesInfo.value = devices
  //         // start开始扫描
  //         start()
  //       }
  //     })
  //     .catch(err => {
  //       // handle err
  //       console.log('获取设备信息失败', err) // 获取设备信息失败
  //       // alert('获取设备信息失败')
  //     })
  // }
  let start = () => {
    html5QrCode.value = new Html5Qrcode('reader');
    const { w, h } = getWidthHeight();
    const minVal = Math.min(w, h);
    const minWidth = (minVal * 0.7).toFixed(0);
    html5QrCode.value
      ?.start(
        cameraId.value,
        {
          fps: 10, // 设置每秒多少帧
          qrbox: { width: minWidth, height: minWidth } // 设置取景范围
        },
        (decodedText, decodedResult) => {
          console.log('扫描的结果', decodedText, decodedResult);
          emit('on-success', decodedText, decodedResult);
          result.value = decodedText;
          if (decodedText) {
            stop();
          }
        },
        (errorMessage) => {
          console.log('暂无扫描结果', errorMessage);
        }
      )
      .catch((err) => {
        console.log(`Unable to start scanning, error: ${err}`);
      });
  };

  const stop = () => {
    try {
      showScan.value = false;
      html5QrCode.value
        ?.stop()
        .then((ignore) => {
          console.log('QR Code scanning stopped.', ignore);
        })
        .catch((err) => {
          console.log('Unable to stop scanning.', err);
        });
    } catch (err) {
      console.log('异常', err);
    }
  };

  defineExpose({ open, stop });
</script>

<style scoped lang="less">
  .yd-scan {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;
    .container {
      position: relative;
      height: 100%;
      width: 100%;
      background: rgba(#000000, 0.48);
      #reader {
        height: 100vh;
        /deep/ video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
        }
      }
    }
  }
  .icon {
    position: fixed;
    right: 2rem;
    top: 2rem;
    font-size: 1.7rem;
    color: #fff;
    z-index: 111;
  }
</style>
