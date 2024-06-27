<template>
  <div class="layout">
    <s-table :tableData="tableData" :tableColConfig="tableConfig"></s-table>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { reqGetBannerList } from '@/api'
  import STable from '@/components/STable.vue'
  // 已选缺陷列表
  const tableData = ref([
    {
      date: '2016-05-03',
      name: 'Tom',
      age: 10,
      address: 'No. 189, Grove St, Los Angeles'
    }
  ])
  const tableConfig = [
    { prop: 'name', dataIndex: 'name', label: '姓名' },
    { prop: 'age', dataIndex: 'age', label: '年龄' },
    { prop: 'operate', dataIndex: 'operate', label: '操作', slotName: 'operate' }
  ]
  const getList = reqGetBannerList({
    pageIndex: 1,
    pageSize: 20
  }).then(res => {
    console.log('res', res)
  })
</script>
<style lang="scss" scoped>
  .layout {
    padding: 20px;
  }
</style>
