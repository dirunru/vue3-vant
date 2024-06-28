import { ElMessage } from 'element-plus'
import store from '../pinia/websocket'

let websocket: WebSocket | null = null; // 用于存储实例化后websocket
let rec: any; // 断线重连后，延迟5秒重新创建WebSocket连接  rec用来存储延迟请求的代码

// 创建websocket
function creatWebSocket(wsUrl: string) {
  console.log("websocket==================");
  // 判断当前浏览器是否支持WebSocket
  if ("WebSocket" in window) {
    console.log("当前浏览器支持 WebSocket");
  } else if ("MozWebSocket" in window) {
    console.log("当前浏览器支持 MozWebSocket");
  } else {
    console.log("当前浏览器不支持 WebSocket");
  }


  try {
    initWebSocket(wsUrl); // 初始化websocket连接
  } catch (e) {
    console.log("尝试创建连接失败");
    reConnect(wsUrl); // 如果无法连接上 webSocket 那么重新连接！可能会因为服务器重新部署，或者短暂断网等导致无法创建连接
  }
}



// 初始化websocket
function initWebSocket(wsUrl: string) {
  websocket = new WebSocket(wsUrl);
  console.log("websocket:", websocket);


  websocket.onopen = function () {
    websocketOpen();
  };


  //   // 接收
  websocket.onmessage = function (e: MessageEvent<any>) {
    websocketonmessage(e);
  };


  // 连接发生错误
  websocket.onerror = function () {
    console.log("WebSocket连接发生错误");
    //     isConnect = false; // 连接断开修改标识
    reConnect(wsUrl); // 连接错误 需要重连
  };


  websocket.onclose = function (e) {
    websocketclose(e);
  };
}



// 定义重连函数
let reConnect = (wsUrl: string) => {
  console.log("尝试重新连接");
  if (store.state.isConnected) return; // 如果已经连上就不在重连了
  rec && clearTimeout(rec);
  rec = setTimeout(function () {
    // 延迟5秒重连  避免过多次过频繁请求重连
    creatWebSocket(wsUrl);
  }, 5000);
};


// 创建连接
function websocketOpen() {
  console.log("连接成功");
  store.dispatch('connect'); // 修改连接状态
}
// 数据接收
function websocketonmessage(e: MessageEvent<any>) {
  console.log("数据接收", e.data);
  const data = JSON.parse(e.data);  // 解析JSON格式的数据
  // 下面的判断则是后台返回的接收到的数据  如何处理自己决定
  if (data.code === 400) {
    console.log("数据接收", data.msg);
    ElMessage({
      showClose: true,
      message: data.msg,
      type: 'warning',
    })


  } else if (data.code === 404) {
    ElMessage({
      showClose: true,
      message: data.msg,
      type: 'warning',
    })
  } else if (data.code === 0) {
    ElMessage({
      showClose: true,
      message: "连接成功",


      type: 'success',
    })
  } else if (data.code === 200) {
    ElMessage({
      showClose: true,
      message: data.msg,
      type: 'success',
    })
    // 成功后的相应处理  此处成功后播放音乐
    const audio = new Audio('./tipMusic.mp3');
    audio.play();
  } else {
    ElMessage({
      showClose: true,
      message: data.msg,
      type: 'error',
    })
    // 延时5秒后刷新页面
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  // let data = JSON.parse(decodeUnicode(e.data))
}



// 关闭
function websocketclose(e: any) {
  console.log(e);
  store.dispatch('disconnect'); // 修改连接状态
  console.log("connection closed (" + e.code + ")");
}



// 数据发送
function websocketsend(data: any) {
  console.log("发送的数据", data, JSON.stringify(data));
  if (websocket && store.state.isConnected) { // 检查连接状态
    websocket.send(JSON.stringify(data));
    
  } else {
    ElMessage({
      showClose: true,
      message: "请选择设备连接",
      type: 'error',
    })
  }
}


// 实际调用的方法==============

// 发送
function sendWebSocket(data: any) {
  // 如果未保持连接状态 不允许直接发送消息 提示请选择连接设备
  if (!store.state.isConnected) {
    ElMessage({
      showClose: true,
      message: "请选择设备连接",
      type: 'error',
    })


  } else {
    websocketsend(data);
    console.log("------------------");
    
  }
}


// 关闭
let closeWebSocket = () => {
  if (websocket) {
    websocket.close();
    ElMessage({
      showClose: true,
      message: "设备已关闭",
      type: 'success',
    })
  }
};


export {
  initWebSocket,
  sendWebSocket,
  creatWebSocket,
  closeWebSocket,
};
————————————————

                            版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                        
原文链接：https://blog.csdn.net/weixin_44096999/article/details/131204105