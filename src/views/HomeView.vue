<template>
  <div class="home layout">
    <slot name="navBar"></slot>
    <div class="menu-box">
      <div class="menu-module" v-for="item in menu_list" :key="item.type">
        <div class="menu-title">
          <div class="line"></div>
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="menu-list">
          <div class="menu-item" v-for="it in item.list" :key="it.path" @click="goIn(it)">
            <div class="img-box">
              <van-icon class="van-icon-menu" :name="it.icon" size="30" />
            </div>
            <div class="item-title">
              {{ it.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  const { push } = useRouter()
  const menu_list = [
    {
      type: 'function',
      title: '功能',
      list: [
        {
          title: '分类',
          icon: 'apps-o',
          path: 'about'
        },
        {
          title: '环状表',
          icon: 'cart-o',
          path: 'echart'
        },
        {
          title: '表格',
          icon: 'cart-o',
          path: 'table'
        },
        {
          title: 'form表单',
          icon: 'cart-o',
          path: 'form'
        },
        {
          title: 'dicStore',
          icon: 'cart-o',
          path: 'dicStore'
        },
        {
          title: '下载导入',
          icon: 'cart-o',
          path: 'downLoad'
        },
        {
          title: '嵌套路由',
          icon: 'cart-o',
          path: 'black'
        }
      ]
    },
    {
      type: 'layout',
      title: '布局',
      list: [
        {
          title: '子路由',
          icon: 'home-o',
          path: 'echart-2'
        },
      ]
    },
    {
      type: 'echarts',
      title: 'Echarts',
      list: [
        {
          title: '首页',
          icon: 'home-o',
          path: 'home'
        },
        {
          title: '分类',
          icon: 'apps-o',
          path: 'category'
        },
        {
          title: '购物车',
          icon: 'cart-o',
          path: 'cart'
        }
      ]
    }
  ]
  const goIn = row => {
    console.log(row)
    push({
      name: row.path
    })
  }
</script>

<style lang="less" scoped>
  .home {
    .menu-box {
      .menu-module {
        background-color: #fff;
        margin: 16px;
        border-radius: 8px;
        min-height: 100px;
        padding: var(--cp-margin);
        .menu-title {
          display: flex;
          justify-content: center;
          height: 32px;
          line-height: 32px;
          .line {
            width: 3px;
            height: 16px;
            margin-top: 8px;
            background: linear-gradient(140deg, #ffb054 7.43%, #f2632d 80.31%);
          }
          .title {
            width: calc(100% - 16px);
            text-align: left;
            margin-left: 8px;
          }
        }
        .menu-list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          .menu-item {
            .img-box {
              margin: auto;
              width: 60px;
              height: 60px;
              border-radius: 10px;
              background: linear-gradient(180deg, #ffacac 50%, #ff4c4a 100%);
            }
            .item-title {
              text-align: center;
              font-size: var(--cp-font-size-middle);
            }
            .van-icon-menu {
              line-height: 60px;
            }
          }
        }
      }
    }
  }
</style>
