<template>
  <div class="swipe-tag">
    <van-swipe :loop="false" class="part-box">
      <van-swipe-item v-for="(item, idx) in tagList" :key="idx">
        <div class="part-list">
          <div
            v-for="it in item"
            :title="it.title"
            :key="it.id"
            :class="['part-item', active === it.id ? 'active' : '']"
            @click="handleComponent(it.id)"
          >
            {{ it.title }}
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
  import { ref, reactive, defineProps, onMounted } from 'vue'
  import { chunk } from 'lodash-es'
  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: () => {}
    }
  })
  const tagList = ref([])
  onMounted(() => {
    console.log('props.list.value', props.list)
    tagList.value = chunk(props.list, props.page.line * 4)
  });
  const active = ref('')
  const handleComponent = e => {
    active.value = e
  }
</script>
<style lang="scss" scoped>
  .swipe-tag {
    .part-box {
      background-color: var(--cp-bg-color-white);
      border-radius: var(--cp-radius);
      :deep(.van-swipe__track) {
        height: 160px;
      }
      .part {
        &-list {
          padding: var(--cp-margin);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 5px;
          .part-item {
            display: inline-block;
            font-size: 12px;
            padding: 4px 12px;
            border-radius: var(--cp-radius);
            background: #f7f9fa;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border: solid 1px transparent;
            transition-duration: 0.5;
          }
          .active {
            border: solid 1px #ff7a44;
            background: #fff2ea;
            color: #ff7a44;
          }
        }
      }
    }
  }
</style>
