<template>
  <el-form
    :ref="formRef"
    @submit.prevent
    :model="props.model"
    :rules="props.rules"
    :label-width="props.labelWidth"
    :label-position="props.labelPosition"
  >
    <el-row>
      <template v-for="item in testCaseConfig.formItems" :key="item.label">
        <el-col :span="item.span">
          <el-form-item
            :label="item.label && item.label + ':'"
            :label-width="item.labelWidht"
            :prop="item.prop"
            :rules="item.rules"
          >
            <template #default>
              <el-tree-select
                v-if="item.type === 'treeSelect'"
                :key="item.nodeKey"
                v-model="props.model[item.prop]"
                :data="item.data"
                :lazy="item.lazy"
                :load="item.load"
                :multiple="item.multiple"
                :placeholder="item.placeholder || '请选择' + item.label"
                :show-checkbox="item.showCheckbox"
                @current-change="
                  (data, node) => {
                    if (item?.onChange) item.onChange(data, node)
                  }
                "
              />
              <el-input
                v-else-if="item.type === 'input'"
                v-model="props.model[item.prop]"
                :disabled="item.disabled || false"
                :maxlength="item.maxlength || 50"
                :placeholder="item.placeholder || '请输入' + item.label"
                :type="item.inpType || 'text'"
                allow-clear
                show-word-limit
                @change="
                  () => {
                    if (item.onChange) item.onChange()
                  }
                "
              >
                <template #suffix v-if="item.suffixIcon">
                  <el-icon class="el-input__icon">
                    <calendar />
                  </el-icon>
                </template>
                <template #prefix v-if="item.prefixIcon">
                  <el-icon class="el-input__icon">
                    <search />
                  </el-icon>
                </template>
              </el-input>
              <el-input
                v-else-if="item.type === 'textarea'"
                v-model="props.model[item.prop]"
                :disabled="item.disabled || false"
                :input-style="item.inputStyle"
                :maxlength="item.maxlength"
                :placeholder="item.placeholder || '请输入' + item.label"
                show-word-limit
                type="textarea"
              />
              <el-select
                v-else-if="item.type === 'select'"
                v-model="props.model[item.prop]"
                :placeholder="item.placeholder || '请选择' + item.label"
                :props="item.defaultProps"
                clearable
                filterable
                @change="
                  () => {
                    if (item.onChange) item.onChange()
                  }
                "
              >
                <el-option v-for="i in item.options" :key="i?.value" :label="i?.label" :value="i?.value" />
              </el-select>
              <el-radio-group
                v-else-if="item.type === 'radio'"
                v-model="props.model[item.prop]"
                class="ml-4"
                @change="(val: any) => { if (item.onChange) item.onChange(val) }"
              >
                <el-radio v-for="i in item.data" :key="i.value" :label="i.value">{{ i.label }}</el-radio>
              </el-radio-group>
              <div v-else-if="item.type === 'inputNum'" style="width: 100%; display: flex">
                <el-input-number
                  v-model="props.model[item.prop]"
                  :max="item.max"
                  aria-label=""
                  :min="item.min"
                  :precision="item.precision"
                  class="mx-4"
                  controls-position="right"
                />
                <span>{{ item.unit || '' }}</span>
              </div>

              <el-date-picker
                v-else-if="item.type === 'picker'"
                v-model="props.model[item.prop]"
                :disabled-date="item.disabledDate"
                :teleported="false"
                placeholder="请选择时间"
                type="datetime"
                @change="(val: any) => { if (item.onChange) item.onChange(val) }"
              />
              <el-date-picker
                v-else-if="item.type === 'datetimerange'"
                v-model="props.model[item.prop]"
                :teleported="false"
                end-placeholder="请选择结束时间"
                range-separator="至"
                start-placeholder="请选择开始时间"
                type="datetimerange"
                value-format="YYYY-MM-DD HH:mm:ss"
              />

              <upload-img
                v-else-if="item.type === 'uploadImg'"
                v-model:image-url="props.model[item.prop]"
                :height="item.height || '8rem'"
                :width="item.width || '8rem'"
              />
              <el-switch
                v-if="item.type === 'switch'"
                v-model="props.model[item.onOff]"
                :active-text="item.activeText"
                :inactive-text="item.inactiveText"
                size="large"
                @change="(val: any) => { if (item.onChange) item.onChange({ val, formField: props.formField, prop: item.prop }) }"
              />
              <div
                v-else-if="item.type === 'textBtn'"
                :style="item.style"
                class="el-input__wrapper customText"
                style="height: 32px"
                @click="
                  () => {
                    if (item.onClick) item.onClick(props.model)
                  }
                "
              >
                {{ props.formField[item.prop] !== '' ? props.formField[item.prop] : item.defaultText || '请点击' }}
              </div>
              <div v-else-if="item.type === 'text'">
                <span :style="item.showTextStyle">{{ item.showText || props.formField[item.prop] }}</span>
                <span :style="item.expandTextStyle">{{ item.expandText || '' }}</span>
              </div>
              <slot v-if="item.type === 'custom'" :name="item.slotName" v-bind="item" />
            </template>
          </el-form-item>

          <slot name="customFormItemLayout" />
        </el-col>
      </template>
      <template v-for="btn in testCaseConfig.buttons" :key="btn.icon">
        <el-col :span="btn.span">
          <el-space>
            <el-button
              :type="btn.type"
              :size="btn.size"
              @click="
                () => {
                  if (btn.onClick) btn.onClick(props.model)
                }
              "
            >
              {{ btn.name }}
              <el-icon class="el-icon--right">
                <Upload />
              </el-icon>
            </el-button>
          </el-space>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script setup>
  import testCaseConfig from '@/common/formConfig'
  import { getCurrentInstance, ref } from 'vue'
  import { Calendar, Search, Delete, Edit, Share, Upload } from '@element-plus/icons-vue'
  const { proxy } = getCurrentInstance() // 获取实例中的proxy

  const props = defineProps({
    // 表单数据对象
    model: Object,
    prop: {},
    rules: {},
    gutter: {
      type: [String, Number],
      default: 24
    },
    // 表单域标签的位置
    labelPosition: {
      type: String,
      values: ['left', 'right', 'top'],
      default: 'left'
    },
    // 星号的位置。
    requireAsteriskPosition: {
      type: String,
      values: ['left', 'right'],
      default: 'left'
    },
    labelWidth: {
      type: [String, Number],
      default: '130px'
    },
    // 表单域标签的后缀
    labelSuffix: {
      type: String,
      default: ''
    },
    // 行内表单模式
    inline: Boolean,
    // 是否以行内形式展示校验信息
    inlineMessage: Boolean,
    // 是否在输入框中显示校验结果反馈图标
    statusIcon: Boolean,
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      default: true
    },
    // 是否在 rules 属性改变后立即触发一次验证
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    // 是否隐藏必填字段标签旁边的红色星号。
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    },
    // 当校验失败时，滚动到第一个错误表单项
    scrollToError: Boolean,
    // 当校验有失败结果时，滚动到第一个失败的表单项目
    scrollIntoViewOptions: {
      type: [Object, Boolean]
    }
  })

  const resetFields = () => {
    proxy.$refs['form'].resetFields()
  }

  const validate = a => {
    proxy.$refs['form'].validate(a)
  }
  const formRef = ref(null)
  defineExpose({
    resetFields,
    validate
  })
</script>


