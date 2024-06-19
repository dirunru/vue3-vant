<template>
	<div class="container">
		<div id="reader"></div>
		<slot name="navBar"></slot>
		<button @click="getCameras">扫码</button>
		<span>{{ result }}</span>
	</div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import { showToast } from "vant";

const cameraId = ref("");
const devicesInfo = ref("");
const html5QrCode = ref(null);
const result = ref("");

onMounted(() => {
	// getCameras()
});

onUnmounted(() => {
	stop();
});

const getCameras = () => {
	Html5Qrcode.getCameras()
		.then((devices) => {
			console.log("摄像头信息", devices);
			showToast("摄像头信息", devices);
			if (devices && devices.length) {
				// 如果有2个摄像头，1为前置的
				if (devices.length > 1) {
					cameraId.value = devices[1].id;
				} else {
					cameraId.value = devices[0].id;
				}
				devicesInfo.value = devices;
				// start开始扫描
				start();
			}
		})
		.catch((err) => {
			// handle err
			console.log("获取设备信息失败", err); // 获取设备信息失败
			showToast("获取设备信息失败");
		});
};
const start = () => {
	html5QrCode.value = new Html5Qrcode("reader");
	console.log("html5QrCode", html5QrCode);

	html5QrCode.value
		.start(
			cameraId.value,
			{
				fps: 10, // 设置每秒多少帧
				qrbox: { width: 250, height: 250 } // 设置取景范围
			},
			(decodedText, decodedResult) => {
				console.log("扫描的结果", decodedText, decodedResult);
				showToast("扫描的结果===", decodedText, decodedResult);
				result.value = decodedText;
				if (decodedText) {
					stop();
				}
			},
			(errorMessage) => {
				showToast("暂无扫描结果");
				console.log("暂无扫描结果", errorMessage);
			}
		)
		.catch((err) => {
			console.log(`Unable to start scanning, error: ${err}`);
		});
};
const stop = () => {
	html5QrCode.value
		?.stop()
		.then((ignore) => {
			// QR Code scanning is stopped.
			console.log("QR Code scanning stopped.", ignore);
			showToast("QR Code scanning stopped.");
		})
		.catch((err) => {
			// Stop failed, handle it.
			console.log("Unable to stop scanning.", err);
			showToast("Unable to stop scanning.");
		});
};
</script>

<style lang="less" scoped>
.container {
	position: relative;
	height: 40%;
	width: 100%;
	background: rgba(#000000, 0.48);
}
#reader {
	top: 50%;
	left: 0;
	transform: translateY(-50%);
}
</style>
