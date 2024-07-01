// Object.freeze是可以冻结对象，对于不需要改变的对象使用，可以提升性能
const testCaseConfig = {
  rules: {
    sitFunctionName: [{ required: true, message: '请输入SIT功能列名', trigger: 'blur' }],
    sitTestProject: [{ required: true, message: '请输入SIT测试项目', trigger: 'blur' }],
    sitProductionTaskNumber: [{ required: true, message: '请输入SIT生产任务编号', trigger: 'blur' }],
    sitBatch: [{ required: true, message: '请输入SIT批次', trigger: 'blur' }],
    stExperimentalArchives: [{ required: true, message: '请输入ST实验档案', trigger: 'blur' }],
    stAcceptancePerson: [{ required: true, message: '请选择ST验收人员', trigger: 'change' }]
  },
  formItems: [
    {
      field: 'sitFunctionName',
      prop: 'sitFunctionName',
      label: 'SIT功能',
      placeholder: 'SIT功能',
      type: 'input',
      // size: 'small',
      maxlength: 10,
      span: 24
    },
    {
      field: 'sitTestProject',
      prop: 'sitTestProject',
      type: 'input',
      label: 'SIT测试项目',
      placeholder: 'SIT测试项目',
      // editable: true,
      // size: 'small',
      span: 24
    },
    {
      field: 'sitProductionTaskNumber',
      prop: 'sitProductionTaskNumber',
      type: 'input',
      label: 'SIT生产任务编号',
      labelWidth: '150px',
      placeholder: 'SIT生产任务编号',
      isHidden: false,
      span: 24
    },
    {
      field: 'sitBatch',
      prop: 'sitBatch',
      type: 'input',
      label: 'SIT批次',
      placeholder: 'SIT批次',
      span: 24
    },
    {
      field: 'stExperimentalArchives',
      prop: 'stExperimentalArchives',
      type: 'input',
      label: 'ST试验档案',
      span: 24,
      placeholder: 'ST试验档案'
    },
    {
      field: 'stAcceptancePerson',
      prop: 'stAcceptancePerson',
      type: 'select',
      label: 'ST验收人员',
      span: 24,
      labelWidth: '150px',
      placeholder: '请选择ST验收人员',
      options: [
        {
          label: '水果',
          value: 'fruits'
        },
        {
          label: '食物',
          value: 'food'
        }
      ]
    }
  ],
  // 按钮
  buttons: [
    {
      name: '生成案例',
      title: 'generateTestCase',
      type: 'primary',
      size: 'default', //可以是default，small,large
      icon: 'Edit',
      // 按钮是否为朴素类型
      // plain: true,
      onClick: null
    },
    {
      name: '重置',
      type: 'info',
      title: 'resetTestCase',
      size: 'default',
      icon: 'DocumentDelete',
      // plain: true,
      onClick: null
    },
    {
      name: '下载测试案例',
      type: 'success',
      title: 'download',
      size: 'default',
      icon: 'Download',
      isHidden: true,
      // plain: true,
      onClick: null
    }
  ],
  ref: 'testCaseFormRef',
  labelWidth: '120px',
  labelPosition: 'right',
  inline: true,
  editable: true,
  // 单元列之间的间隔
  elRowGutter: 10,
  // size: 'small',
  // 是否需要form边框
  tableBorder: true,
  colLayout: {
    xl: 5, //2K屏等
    lg: 8, //大屏幕，如大桌面显示器
    md: 12, //中等屏幕，如桌面显示器
    sm: 24, //小屏幕，如平板
    xs: 24 //超小屏，如手机
  }
}

export default testCaseConfig
