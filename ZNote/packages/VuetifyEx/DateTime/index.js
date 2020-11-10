import DateTime from './src/DateTime'

DateTime.install = function (Vue) {
    Vue.component(DateTime.name, DateTime);
}

export default DateTime
