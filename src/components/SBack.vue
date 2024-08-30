<template>
  <div v-if="showType" class="top_up">
    <van-icon v-if="showType === 'down'" :size="iconSize + 'px'" :color="iconColor" name="back-down" @click="goDown" />
    <van-icon v-if="showType === 'top'" :size="iconSize + 'px'" :color="iconColor" name="back-top" @click="goTop" />
  </div>
</template>

<script setup>
  /**
   * 回到底部和回到顶部的封装
   *
   */
  import { onMounted, ref, defineProps, onBeforeMount } from 'vue';
  import { throttle } from 'lodash-es';
  const showType = ref('');
  defineProps({
    iconSize: {
      type: Number,
      default: 30
    },
    iconColor: {
      type: String,
      default: '#fff'
    }
  });
  onMounted(() => {
    window.addEventListener('scroll', onScroll, true);
  });
  const onScroll = throttle((e) => {
    if (e.target.scrollTop > 100) {
      showType.value = 'top';
    } else {
      showType.value = '';
    }
  }, 300);
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  onBeforeMount(() => {
    window.removeEventListener('scroll', onScroll, true);
  });
</script>

<style lang="less" scoped>
  .top_up {
    position: fixed;
    right: 45px;
    bottom: 100px;
    width: 40px;
    height: 40px;
    z-index: 99999999;
    border-radius: 50%;
    background: var(--cp-primary);
    display: flex;
    transition: 0.5s;
    flex-direction: column;
    justify-content: center;
  }
</style>
