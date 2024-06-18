<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route?.meta?.isRouterKeepAlive ? route?.fullPath : route?.name">
      <template v-slot:navBar>
        <van-nav-bar
          :title="route.meta.title"
          left-text="返回"
          right-text="按钮"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
          <!-- <template #title> </template>
          <template #right> </template>
          <template #left> </template> -->
        </van-nav-bar>
      </template>
    </component>
  </router-view>
</template>
<script setup>
  const onClickLeft = () => {
    console.log('click left')
  }
  const onClickRight = () => {
    console.log('click right')
  }
</script>
<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
