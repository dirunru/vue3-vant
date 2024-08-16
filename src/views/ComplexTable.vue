<template>
  <div class="layout">
    <s-complex-table
      :tableData="tableData"
      :tableColConfig="tableConfig"
      :table-max-height="'420px'"
      :show-summary="true"
      :table-header-color="tableHeaderColor"
      :get-summaries="getSummaries"
      :table-data="tableData"
      :border-column="`下线未入库`"
    >
      <template v-slot:fevor="scope">
        <span class="active-text" @click="handleGo('InboundInfoDetail', scope.scopeRow.fevor)">
          {{ scope.scopeRow.fevor }}
        </span>
      </template>
      <template v-slot:offInNumAll="scope">
        <span
          :style="{
            color: numColor(scope.scopeRow.offInNumAll)
          }"
        >
          {{ scope.scopeRow.offInNumAll }}
        </span>
      </template>
    </s-complex-table>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { table } from '@/api/table';
  import STable from '@/components/SComplexTable.vue';
  import { findListData } from '@/api/table';

  const tableData = ref([]);
  const tableConfig = ref([]);
  const tableTotalData = ref({});
  const tableHeaderFlag = ref(false); // 默认使用自定义表头，获取数据后更新表头及状态
  // 获取列表数据
  const getTableData = () => {
    let tableBasic = findListData.datas.list ? findListData.datas.list : []; // 标准行
    let totalRow = findListData.datas.total[0]; // 合计行
    let totalObj = {
      flag_: 'total'
    };
    // 处理表头
    if (!tableHeaderFlag.value && totalRow) {
      tableHeaderFlag.value = true;
      tableConfig.value = [
        {
          prop: 'index',
          label: 'NO.',
          fixed: true
        },
        {
          prop: 'fevor',
          label: '生产线别',
          fixed: true,
          slot: true
        }
      ];
      totalRow?.forEach((item, index) => {
        tableConfig.value.push({
          label: item.mhourArea,
          innertableConfig: [
            {
              prop: 'vinOffNum' + item.mhour,
              label: '下线数量',
              className: item.mhour % 2 === 0 ? 'bg-color-gray' : ''
            },
            {
              prop: 'vinInNum' + item.mhour,
              label: '入库数量',
              className: item.mhour % 2 === 0 ? 'bg-color-gray' : ''
            },
            {
              prop: 'offInNum' + (item.mhourArea === '全天' ? 'All' : item.mhour),
              label: '下线未入库',
              className: item.mhour % 2 === 0 ? 'bg-color-gray' : '',
              slot: item.mhourArea === '全天'
            }
          ]
        });
        totalObj['vinOffNum' + item.mhour] = item.vinOffNum;
        totalObj['vinInNum' + item.mhour] = item.vinInNum;
        totalObj['offInNum' + (item.mhourArea === '全天' ? 'All' : item.mhour)] = item.offInNum;
      });
    }

    // 处理表格数据
    let tableTemp = [];
    tableBasic.forEach((list) => {
      let obj = {};
      list?.forEach((item, index) => {
        obj['vinOffNum' + item.mhour] = item.vinOffNum;
        obj['vinInNum' + item.mhour] = item.vinInNum;
        obj['offInNum' + (item.mhourArea === '全天' ? 'All' : item.mhour)] = item.offInNum;
        if (index === list.length - 1) {
          obj.fevor = item.fevor;
        }
      });
      tableTemp.push(obj);
    });
    // totalRow && tableTemp.push(totalObj)
    if (totalRow) {
      tableTotalData.value = totalObj;
    }
    tableData.value = tableTemp;
  };
  getTableData();
  const colorList = ['#f7f9fa', '#fff4e8', '#fffceb', '#eaf5ff', '#fff4e8'];
  const tableHeaderColor = ({ row, column, rowIndex, columnIndex }) => {
    // console.log('row, column, rowIndex, columnIndex', row, column, rowIndex, columnIndex)
    if (rowIndex === 0 && columnIndex === 0) {
      return {
        backgroundColor: colorList[0]
      };
    } else if (rowIndex === 0 && columnIndex === 1) {
      return {
        backgroundColor: colorList[1]
      };
    } else if (
      (rowIndex === 0 && (columnIndex - 2) % 3 === 0) ||
      (rowIndex === 1 && Math.floor(columnIndex / 3) % 3 === 0)
    ) {
      return {
        backgroundColor: colorList[2]
      };
    } else if (
      (rowIndex === 0 && (columnIndex - 2) % 3 === 1) ||
      (rowIndex === 1 && Math.floor(columnIndex / 3) % 3 === 1)
    ) {
      return {
        backgroundColor: colorList[3]
      };
    } else if (
      (rowIndex === 0 && (columnIndex - 2) % 3 === 2) ||
      (rowIndex === 1 && Math.floor(columnIndex / 3) % 3 === 2)
    ) {
      return {
        backgroundColor: colorList[4]
      };
    } else {
      return {
        backgroundColor: colorList[0]
      };
    }
  };
  const getSummaries = () => {
    const arr = Object.values(tableTotalData.value)
      ? ['', '合计', ...Object.values(tableTotalData.value).filter((item) => item !== 'total')]
      : [];
    return arr;
  };
  const numColor = (num) => {
    let temp = num / 1;
    if (!isNaN(temp)) {
      if (temp >= 50 && temp < 70) {
        return '#60B2EC';
      } else if (temp >= 70 && temp < 100) {
        return '#FF5F00';
      } else if (temp >= 100) {
        return '#FB1414';
      } else return '';
    } else return '';
  };

  // 列合并
  // const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  //   let key = ''; // 需要合并的key
  //   let spanArr = utils.getSpanArr([], key);
  //   // console.log("spanArr", spanArr);
  //   if (columnIndex === 0) {
  //     const _row = spanArr[rowIndex];
  //     const _col = _row > 0 ? 1 : 0;
  //     // console.log("_row", _row);
  //     // console.log("_col", _col);
  //     return {
  //       rowspan: _row,
  //       colspan: _col
  //     };
  //   }
  // };
</script>
<style lang="scss" scoped>
  .layout {
    padding: 20px;
  }
</style>
