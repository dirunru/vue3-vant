<template>
  <div class="layout">
    <s-table :tableData="tableData" :tableColConfig="tableConfig"></s-table>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import STable from '@/components/STable.vue'
  // 已选缺陷列表
  const tableData = ref([])
  const tableConfig = [
    { prop: 'name', dataIndex: 'name', label: '姓名' },
    { prop: 'age', dataIndex: 'age', label: '年龄' },
    { prop: 'operate', dataIndex: 'operate', label: '操作', slotName: 'operate' }
  ]
</script>
<style lang="less" scoped></style>
