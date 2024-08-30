<template>
  <div ref="boxRef" id="bar-box">
    <nav class="bar">
      <ol>
        <li v-for="(item, index) in list" :key="item.value">
          <a @click="scrollTo('#part-' + item.value, index)" :class="[activeIndex == index + 1 ? 'active' : '']">
            {{ item.text }}
          </a>
        </li>
      </ol>
    </nav>
    <div class="index-content">
      <template v-for="item in list" :key="item.value">
        <section :id="`part-${item.value}`" :style="{ paddingTop: `${distanceTop}px`, marginTop: `-${distanceTop}px` }">
          <slot name="content" :item="item">
            <h2>section{{ item.text }}</h2>
          </slot>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import { debounce, throttle } from 'lodash-es';
  defineProps({
    list: {
      type: Array,
      default: () => [
        {
          text: '1',
          value: 1
        },
        {
          text: '2',
          value: 2
        },
        {
          text: '3',
          value: 3
        },
        {
          text: '4',
          value: 4
        },
        {
          text: '5',
          value: 5
        },
        {
          text: '6',
          value: 6
        },
        {
          text: '7',
          value: 7
        },
        {
          text: '8',
          value: 8
        },
        {
          text: '9',
          value: 9
        },
        {
          text: '10',
          value: 10
        }
      ]
    },
    // 如果使用了postcss-px-to-viewport 就不要使用内联样式
    distanceTop: { type: Number, default: 0 }
  });
  const scrollTo = (selector, index) => {
    activeIndex.value = index + 1;
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // 点击时暂停页面的滚动监听事件，防止点击时导航高亮出现走马灯效果；
    // 此处的定时器存在缺陷，点击完2秒之内滚动还是会偶现走马灯现象；
    isScroll.value = false;
    let timeId = '';
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      isScroll.value = true;
    }, 2000);
  };
  const isScroll = ref(true); // 点击导航栏时，暂时停止监听页面滚动
  const activeIndex = ref(0);
  const onScroll = throttle((e) => {
    if (!isScroll.value) return;
    console.log('滚动', e);
    const navContents = document.querySelectorAll('.index-content section');
    // 所有锚点元素的 offsetTop
    const offsetTopArr = [];
    navContents.forEach((item) => {
      offsetTopArr.push(item.offsetTop - 30);
    });
    const scrollTop = document.getElementById('bar-box').scrollTop;
    // 定义当前点亮的导航下标
    let navIndex = 1;
    for (let n = 1; n <= offsetTopArr.length; n++) {
      if (scrollTop >= offsetTopArr[n - 1]) {
        navIndex = n;
      }
    }
    activeIndex.value = navIndex;
  }, 300);

  const boxRef = ref(null);
  onMounted(() => {
    document.getElementById('bar-box').addEventListener('scroll', onScroll);
  });

  onBeforeUnmount(() => {
    document.getElementById('bar-box').removeEventListener('scroll', onScroll);
  });
</script>

<style lang="less" scoped>
  #bar-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    ol {
      position: fixed;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      z-index: 999;
      background: #fff;
      font-size: 14px;
      li {
        margin: 2px 5px;
        a {
          cursor: pointer;
          text-decoration: none;
          padding: 2px 8px;
          border-radius: 4px;
          // &:hover {
          //   color: #fff;
          //   background: linear-gradient(180deg, #ffacac 50%, #ff4c4a 100%);
          // }
        }
        .active {
          color: #fff;
          background: linear-gradient(180deg, #ffacac 50%, #ff4c4a 100%);
        }
      }
    }

    .index-content {
      width: 100%;
      section {
        h2 {
          text-align: center;
        }
      }
    }
  }
</style>
