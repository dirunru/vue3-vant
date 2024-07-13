<template>
  <div class="home layout">
    <slot name="navBar"></slot>
    <div class="body-box">
      <SForm :model="formData"></SForm>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import SForm from '@/components/SForm.vue'
  const formData = reactive({
    sitFunctionName: '',
    sitTestProject: '',
    sitProductionTaskNumber: '',
    sitBatch: '',
    stExperimentalArchives: '',
    stAcceptancePerson: ''
  })
</script>
<style lang="less" scoped>
  .body-box {
    background-color: #fff;
    margin: 16px;
    border-radius: 8px;
    min-height: 100px;
    padding: var(--cp-margin);
  }
</style>
