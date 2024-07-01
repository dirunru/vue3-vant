<template>
  <div> </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useSelectStore } from '@/pinia/dicData'

  const selectStore = useSelectStore()
  const options = ref([])
  const initData = () => {
    selectStore.getDic('fruits').then(res => {
      options.value = res
    })
    setTimeout(()=>{
      selectStore.getDic('fruits').then(res => {
        options.value = res
      })
    }, 1000)
  }
  initData()
</script>
<style lang="less" scoped></style>
