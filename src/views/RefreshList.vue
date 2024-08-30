<template>
  <div class="refresh-list">
    <van-pull-refresh
      v-if="pageData.list.length > 0"
      v-model="pageData.refreshing"
      :head-height="80"
      loosing-text="下拉刷新"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="pageData.loading"
        :finished="pageData.finished"
        finished-text="没有更多了"
        @load="debounceFunc()"
      >
        <template v-for="item in pageData.list" :key="item.id || item">
          <div class="box">{{ item }}</div>
        </template>
      </van-list>
      <van-back-top />
    </van-pull-refresh>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { debounce } from 'lodash-es';
  const pageData = reactive({
    list: [], // 列表数据
    loading: false, // 是否加载中
    finished: false, // 是否加载完成
    refreshing: false, // 是否刷新中
    current: 1, // 当前页码
    size: 10 // 每页条数
  });
  // 模拟接口返回
  const res = {
    count: 200 // 总数
  };
  const onRefresh = () => {
    console.log('下拉刷新');
    onLoad('refresh');
  };
  const onLoad = (type) => {
    // 下拉刷新的时候，页数是第一页
    if (type === 'refresh') {
      pageData.current = 1;
    }
    pageData.current = pageData.current === 1 ? 1 : pageData.current;
    pageData.size = pageData.size === 10 ? 10 : pageData.size;
    setTimeout(() => {
      // 下拉刷新的时候，清空原有数据
      if (type === 'refresh') {
        pageData.list = [];
      }
      // 接口数据相关---start -----
      let list = [...Array.from({ length: 10 }, (v, k) => (pageData.current - 1) * 10 + k + 1)];
      pageData.list = [...pageData.list, ...list];
      // 接口数据相关---end -----
      pageData.refreshing = false;
      pageData.loading = false;
      pageData.total = res.count;
      pageData.current++;
      if (pageData.list.length >= res.count) {
        pageData.finished = true;
      }
    }, 500);
  };
  onLoad();
  const debounceFunc = debounce(onLoad, 300);
</script>
<style lang="less" scoped>
  .refresh-list {
    padding-top: 40px;
    height: calc(100% - 60px);
    overflow-y: auto;
    .box {
      width: calc(100% - 24px);
      height: 300px;
      box-sizing: border-box;
      margin: 0 12px 12px 12px;
      padding: 12px;
      background: #fff;
      border-radius: 8px;
      position: relative;
      box-shadow: #eae6e6 0px 0px 4px 0px;
    }
  }
</style>
