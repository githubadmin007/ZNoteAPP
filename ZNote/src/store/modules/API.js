const API = {
  namespaced: true,
  state: {
    APIBaseUrl: 'http://localhost/ZNoteAPI'
    // APIBaseUrl: 'http://localhost:5000'
    // APIBaseUrl: 'https://localhost:44305'
    // APIBaseUrl: 'http://120.77.35.228:7281'
  },
  getters: {
    // 登录API地址
    LoginAPI: state => state.APIBaseUrl + '/User/Login',
    // 系统列表
    SystemListAPI: state => state.APIBaseUrl + '/system/getsystem',
    // 系统字典
    SystemDict: state => state.APIBaseUrl + '/SysDict/GetItems',

    // 表单
    Form_GetInfo: state => state.APIBaseUrl + '/form/GetFormInfo', // 获取表单信息
    Form_GetFields: state => state.APIBaseUrl + '/form/GetFields', // 获取表单字段
    Form_GetFieldItems: state => state.APIBaseUrl + '/form/GetFieldItems', // 获取字段候选值
    Form_GetFieldRules: state => state.APIBaseUrl + '/form/GetFieldRules', // 获取字段限制规则

    // 待办
    Todo_GetParentBH: state => state.APIBaseUrl + '/Todo/GetParentBH', // 获取父节点编号
    Todo_Add: state => state.APIBaseUrl + '/Todo/Add', // 新增待办项
    Todo_Modify: state => state.APIBaseUrl + '/Todo/Modify', // 修改待办项
    Todo_GetInfo: state => state.APIBaseUrl + '/Todo/GetInfo', // 获取待办信息
    Todo_GetList: state => state.APIBaseUrl + '/Todo/GetList', // 获取待办事项
    Todo_FinishToday: state => state.APIBaseUrl + '/Todo/FinishToday', // 设为今日完成
    Todo_Finish: state => state.APIBaseUrl + '/Todo/Finish', // 完成待办事项
    Todo_Abandon: state => state.APIBaseUrl + '/Todo/Abandon', // 放弃待办事项

    // 收入记录
    Income_Add: state => state.APIBaseUrl + '/income/Add', // 新增收入记录
    Income_GetList: state => state.APIBaseUrl + '/income/GetList', // 获取收入列表
    Income_GetAllYear: state => state.APIBaseUrl + '/income/GetAllYear', // 获取所有有数据的年份
    Income_StatMonth: state => state.APIBaseUrl + '/income/Stat_Month', // 按月份统计
    Income_StatYear: state => state.APIBaseUrl + '/income/Stat_Year', // 按年份统计
    Income_StatType: state => state.APIBaseUrl + '/income/Stat_Type' // 按类型统计
  },
  mutations: {},
  actions: {}
}

export default API
