<template>
  <div class="black-layout">
    <div class="menu-list">
      <van-sidebar v-model="active" @change="activeChange">
        <van-sidebar-item v-for="item in menu_list" :key="item.path" :title="item.title" />
      </van-sidebar>
    </div>
    <div class="menu-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const { push } = useRouter()
  const active = ref(0)
  const menu_list = [
    {
      title: '分类',
      icon: 'apps-o',
      path: 'about-2'
    },
    {
      title: '环状表',
      icon: 'cart-o',
      path: 'echart-2'
    }
  ]
  const activeChange = index => {
    console.log('index', menu_list[index])
    push({
      name: menu_list[index].path
    })
  }
</script>
<style lang="less" scoped>
  .black-layout {
    height: 100vh;
    display: flex;
    .menu-list {
      height: 100%;
      background-color: var(--cp-bg-color-white);
    }
    .menu-content {
      flex: 1;
      margin-left: 20px;
      background-color: var(--cp-bg-color-white);
    }
  }
</style>
