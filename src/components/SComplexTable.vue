<!-- 简单表格 -->
<template>
  <div class="s-table">
    <el-table
      row-key="id"
      :border="border"
      :data="tableData"
      :stripe="stripe"
      style="width: 100%"
      :cell-style="cellStyle"
      :span-method="objectSpanMethod"
      :empty-text="`无数据`"
      :max-height="tableMaxHeight"
      :row-style="rowStyle"
      :summary-method="getSummaries"
      :show-summary="showSummary"
      :header-cell-style="tableHeaderColor"
    >
      <!-- 通过 tableColConfig 进行循环渲染 -->
      <template v-for="item in tableColConfig">
        <el-table-column
          v-if="item.innertableConfig"
          :key="item.label"
          :label="item.label"
          :align="item.align || 'center'"
        >
          <el-table-column
            v-for="inner in item.innertableConfig"
            :key="inner.prop"
            :align="inner.align || 'center'"
            :prop="inner.prop"
            :label="inner.label"
            :width="inner.prop === 'index' ? 50 : inner.width || 80"
            :class-name="inner.className ? inner.className : ``"
          >
            <template #default="scope">
              <div v-if="inner.slot">
                <slot :name="inner.prop" :scopeRow="scope.row" :scopeIndex="scope.$index">
                  {{ scope.rowspan }}
                </slot>
              </div>
              <div v-else-if="inner.prop === 'index'">
                {{ scope.$index + 1 }}
              </div>
              <div v-else>
                {{ scope.row[inner.prop] }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.label"
          :sortable="false"
          :prop="item.prop"
          :label="item.label"
          :width="item.prop === 'index' ? 50 : item.width || 80"
          :min-width="item.minWidth"
          :align="item.align || 'center'"
          :fixed="item.fixed"
          :header-align="item.headerAlign || 'center'"
          :class-name="item.className ? item.className + ` single-line` : `single-line`"
        >
          <template #default="scope">
            <div v-if="item.slot">
              <slot :name="item.prop" :scopeRow="scope.row" :scopeIndex="scope.$index">
                {{ scope.row[item.prop] }}
              </slot>
            </div>
            <div v-else-if="item.prop === 'index'">
              {{ scope.row.flag_ === 'total' ? '合计' : scope.$index + 1 }}
            </div>
            <div v-else>
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup>
  const props = defineProps({
    // 实际显示的表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 配置表格的数据
    tableColConfig: {
      type: Array,
      default: () => []
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    tableAttr: {
      type: Object,
      require: true,
      default: () => {
        return {
          tableLoad: false,
          tableFinish: true,
          loadFunc: () => {}
        };
      }
    },
    objectSpanMethod: {
      type: Function,
      require: true,
      default: ({ row, column, rowIndex, columnIndex }) => {
        if (row.flag_ === 'total') {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 2
            };
          } else if (columnIndex === 1) {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
    tableMaxHeight: {
      type: String,
      require: true,
      default: `calc(100vh - 90px)`
    },
    rowStyle: {
      type: Function,
      default: () => {}
    },
    cellStyleObj: {
      type: Object,
      default: () => {
        return {};
      }
    },
    showSummary: {
      // 是否显示合计
      type: Boolean,
      default: false
    },
    getSummaries: {
      type: Function,
      default: () => {
        return [];
      }
    },
    tableHeaderColor: {
      type: Function,
      default: () => {
        return { background: '#F7F9FA' };
      }
    },
    stripe: {
      type: Boolean,
      default: false
    }
  });
  console.log('tableColConfig', props.tableColConfig);
  const cellStyle = (data) => {
    let obj = {};
    if (data?.column?.className?.includes('bg-color-gray')) {
      obj.background = '#f7f9fa';
    }
    if (data.column.label === props.border) {
      obj.borderRight = '1px solid #ebeef5 !important';
    } else if (props.cellStyleObj.column && data.column.label === props.cellStyleObj.column) {
      obj = { ...obj, ...props.cellStyleObj.style };
    }
    return obj;
  };
</script>
