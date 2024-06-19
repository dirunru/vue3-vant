<template>
  <div class="s-table">
    <el-table row-key="id" :border="props.border" :max-height="props.height" :data="props.tableData">
      <!-- 通过 tableColConfig 进行循环渲染 -->
      <el-table-column
        v-for="item in props.tableColConfig"
        :width="item.width"
        :align="item.align || 'center'"
        :fixed="item.fixed"
        :header-align="item.headerAlign || 'center'"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      >
        <template #default="scope">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :row="scope.row"></slot>
          </template>
          <template v-else>
            <span>{{ scope.row[item.prop] }}</span>
          </template>
        </template>
      </el-table-column>
      <template #empty>
        暂无数据
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
    // 表格高度
    height: {
      type: Number,
      default: 300
    }
  })
</script>

<!-- <style lang="less">
  @bgColor: #f7f9fa;
  .s-table {
    .el-table {
      font-size: 12px;
      color: #333333;

      // border-radius: 8px;
      table {
        width: 100% !important;
      }
    }

    .el-table td,
    .el-table th {
      padding: 8px 0;
    }

    .el-table th {
      background-color: @bgColor;
      font-size: 12px;
      color: #333333;
    }

    .el-table .el-table__header-wrapper {
      border-radius: 4px;
    }

    .el-table .cell {
      padding: 0 5px;
      line-height: 16px;
    }

    .el-table th > .cell {
      padding-left: 5px;
      padding-right: 5px;
    }

    .el-table .el-table__body {
      td {
        padding: 0;

        &:not(&:first-of-type) {
          font-family: 'DINPro-Bold';
          font-weight: 500;
        }
      }

      td > .cell {
        padding: 8px 5px;
      }
    }

    .el-table td .cell {
      white-space: normal;
    }

    .el-table__empty-block {
      width: 100% !important;
    }

    .el-table .caret-wrapper {
      border: 3px solid transparent;
      height: 20px;
      width: 5px;
    }

    .el-table .sort-caret {
      left: 3px;
      border: 3px solid transparent;
    }

    .el-table .sort-caret.ascending {
      border-bottom-color: #c8c8c8;
      top: 0;
    }

    .el-table .sort-caret.descending {
      border-top-color: #c8c8c8;
      bottom: 0;
    }

    .el-table .descending .sort-caret.descending {
      border-top-color: #3264f5;
    }

    .el-table .ascending .sort-caret.ascending {
      border-bottom-color: #3264f5;
    }

    .el-table .warning-row {
      color: red;
    }

    .el-table .click-color {
      color: #1989fa;
    }

    .el-table__fixed {
      border-radius: 8px;
    }
  }
</style> -->
