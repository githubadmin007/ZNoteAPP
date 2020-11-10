<template>
    <v-card style="width:100%;height:400px;">
        <v-select v-model="year" :items="yearList" item-text="belong_year" dense solo></v-select>
        <div ref="chart" style="width:100%;height:calc(100% - 64px);"></div>
    </v-card>
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'

const ALLYEAR = '所有年份';

export default {
    data () {
        return {
            charts: '',
            year: ALLYEAR,
            yearList: [],
            StatData: [] // 统计数据
        }
    },
    computed: {
        ...mapGetters('API', ['Income_GetAllYear', 'Income_StatMonth'])
    },
    watch: {
        year (newVal) {
            this.GetData(Number(newVal));
        }
    },
    methods: {
        GetData (year) {
            this.$axios(`${this.Income_StatMonth}?year=${year}`)
            .then(response => {
                if (response.code === 200) {
                    this.StatData = response.data;
                    this.DrawChart();
                }
            })
            .catch(error => {
                this.$Message.error(error);
            });
        },
        DrawChart () {
            let options = {};
            let xAxisData = this.StatData.map(data => {
                return `${data.belong_year}年${data.belong_month}月`;
            });
            let yAxisData = this.StatData.map(data => {
                return data.amount;
            });
            options.xAxis = {
                type: 'category',
                data: xAxisData
            };
            options.yAxis = {
                type: 'value'
            };
            options.tooltip = {
                trigger: 'item',
                formatter: '{b}<br/>{c}元'
            };
            options.series = [{
                data: yAxisData,
                type: 'line',
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                        // { type: 'max', name: '最大值' },
                        // { type: 'min', name: '最小值' }
                    ]
                }
            }];
            this.charts = echarts.init(this.$refs.chart);
            this.charts.setOption(options);
        }
    },
    // 调用
    mounted () {
        this.GetData(0);
        this.$axios(this.Income_GetAllYear)
        .then(response => {
            if (response.code === 200) {
                let data = response.data;
                data.unshift(ALLYEAR);
                this.yearList = response.data;
            }
        })
        .catch(error => {
            this.$Message.error(error);
        });
    }
}
</script>
