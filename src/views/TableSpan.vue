<template>
  <div>
    <s-table
      :table-col-config="columnsDetail"
      :table-data="tableDataDetail"
      :objectSpanMethod="objectSpanDetailMethod"
      :cellStyleObj="cellStyleObj"
    >
      <template v-slot:progress="scope"> 发货进度 </template>
      <template v-slot:timePeriod="scope">
        {{ String(scope.scopeRow.mhour).slice(0, 2) < 12 ? '上午' : '下午' }}
      </template>
    </s-table>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { findListData } from '@/api/tablespan';
  import STable from '@/components/SComplexTable.vue';
  const columnsDetail = ref([
    {
      prop: 'progress',
      label: '发货进度',
      className: 'merge-col',
      slot: true
    },
    {
      prop: 'timePeriod',
      label: '时间',
      className: 'merge-col',
      slot: true
    },
    {
      prop: 'mhour',
      label: '小时段'
    },
    {
      prop: 'totalNum',
      label: '合计'
    },
    {
      prop: 'prodNum',
      label: '整车'
    },
    {
      prop: 'prodPerson',
      label: '整车人数'
    },
    {
      prop: 'prodPersonRate',
      label: '整车人效'
    },
    {
      prop: 'partsNum',
      label: '散车'
    },
    {
      prop: 'partsPerson',
      label: '散车人数'
    },
    {
      prop: 'partsPersonRate',
      label: '散车人效'
    },
    {
      prop: 'bigProdNum',
      label: '大整'
    },
    {
      prop: 'bigPartsNum',
      label: '大散'
    },
    {
      prop: 'enum',
      label: '电商'
    }
  ]);

  const cellStyleObj = ref({});
  const morningCount = ref(0);
  const tableDataDetail = ref([]);
  const getTableDataDetail = () => {
    // console.log('tableData', findListData);
    tableDataDetail.value = Array.isArray(findListData.datas) ? findListData.datas : [];
    morningCount.value = findListData.datas.findIndex((item) => String(item.mhour).slice(0, 2) >= 12);
    if (morningCount.value === -1) {
      cellStyleObj.value = {
        column: '时间',
        style: {
          borderBottom: 'none'
        }
      };
    } else {
      cellStyleObj.value = {};
    }
  };
  getTableDataDetail();
  const objectSpanDetailMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
      if (rowIndex === 0) {
        return {
          rowspan: tableDataDetail.value.length,
          colspan: 1
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
    if (columnIndex === 1) {
      let divide = morningCount.value === -1 ? tableDataDetail.value.length : morningCount.value;
      let count = tableDataDetail.value.length;
      if (rowIndex === 0) {
        return {
          rowspan: divide,
          colspan: 1
        };
      } else if (rowIndex === divide && count - divide > 0) {
        return {
          rowspan: count - divide,
          colspan: 1
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  };
</script>
<style lang="less" scoped></style>
