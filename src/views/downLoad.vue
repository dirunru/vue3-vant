<!-- 封装导出 + 导入 + 导入模板下载方法 -->
<template>
  <div>
    <van-space :size="20">
      <van-button :loading="exportExcelStatus" loading-text="加载中..." type="primary" @click="exportExcel">
        导出报表
      </van-button>
      <van-button :loading="importExcelStatus" loading-text="加载中..." type="primary" @click="importExcel">
        导入报表
      </van-button>
      <van-button :loading="importExcelTemplateStatus" loading-text="加载中..." type="primary" @click="importTemplate">
        导入模板下载
      </van-button>
      <!-- <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :data="uploadData"
        accept=".xls,.xlsx,.excel"
        :action="importExcel"
        @change="handleImportExcel"
      >
        <a-button
          type="dashed"
          class="ele-btn-icon"
          style="width: 90px"
          :loading="importLoading"
        >
          <template #icon>
            <download-outlined />
          </template>
          <span>导入</span>
        </a-button>
      </a-upload> -->
    </van-space>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const exportExcelStatus = ref(false)
  // 导出excel方法
  const exportExcelMethods = (name, data, type = '1') => {
    new Promise((resolve, reject) => {
      // 兼容IE
      let fileName = `${name}${type === '1' ? '数据' : '导入模板'}`
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(
          new Blob([data], {
            type: 'application/vnd.ms-excel'
          }),
          fileName + '.xlsx'
        )
      } else {
        let url = window.URL.createObjectURL(
          new Blob([data], {
            type: 'application/vnd.ms-excel'
          })
        )
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        fileName && link.setAttribute('download', fileName + '.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) //下载完成移除元素
        window.URL.revokeObjectURL(url) //释放掉blob对象
        resolve()
      }
    })
  }
  const exportExcel = async () => {
    exportExcelStatus.value = true
    // 参数
    let params = {}
    await exportExcelMethods('部件维护', (data = {}))
    exportExcelStatus.value = false
    // 从接口获取二级制文件流
    // exportComponentExcel(params)
    //   .then(async data => {
    //     exportExcelStatus.value = false
    //     if (!data) {
    //       message.warning('文件下载失败')
    //       return
    //     }
    //     await exportExcel('部件维护', data)
    //   })
    //   .catch(() => {
    //     exportExcelStatus.value = false
    //   })
  }
  const importExcelStatus = ref(false)
  const importExcel = () => {}
  const importExcelTemplateStatus = ref(false)
  // 下载本地文件
  const downloadLocalFile = (url, name = 'template.excel') => {
    // 兼容ie
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveOrOpenBlob(url, name)
    } else {
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', name)
      a.setAttribute('target', '_blank')
      const clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent('click', true, true)
      a.dispatchEvent(clickEvent)
    }
    importExcelTemplateStatus.value = false
    // 从接口下载模板
    // downloadLoading.value = true
    // componentTemplateExcel().then(async data => {
    //   downloadLoading.value = false
    //   if (!data) {
    //     message.warning('文件下载失败')
    //     return
    //   }
    //   await exportExcel('部件维护', data, 2)
    // })
    // .catch(() => {
    //   downloadLoading.value = false
    // })
  }
  const importTemplate = () => {
    importExcelTemplateStatus.value = true
    downloadLocalFile('/excels/template.xlsx', 'template.xlsx')
  }
  /* 导入 */
  // const handleImportExcel = info => {
  //   if (info.file.status === 'uploading') {
  //     importLoading.value = true
  //   } else {
  //     importLoading.value = false
  //   }
  //   if (info.file.status === 'done') {
  //     if (info.file.response.resp_code == 0) {
  //       const { failedQuantity, successfulQuantity, total } = info.file.response.datas
  //       message.success(`导入完成，共${total}条数据，成功${successfulQuantity}条，失败${failedQuantity}条.`)
  //       reload()
  //     } else {
  //       message.error(`${info.file.name} ${info.file.response.msg}.`)
  //     }
  //   } else if (info.file.status === 'error') {
  //     message.error(`文件上传失败: ${info.file.response.resp_msg} `)
  //   }
  // }
</script>
<style lang="scss" scoped></style>
