<template>
    <v-card style="width:100%;height: 400px;">
        <div ref="chart" style="width:100%;height:100%;"></div>
    </v-card>
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'

export default {
        data () {
        return {
            charts: '',
            StatData: [] // 统计数据
        }
    },
    computed: {
        ...mapGetters('API', ['Income_StatYear'])
    },
    methods: {
        GetData (year) {
            this.$axios(this.Income_StatYear)
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
                return `${data.belong_year}年`;
            });
            let seriesData = this.StatData.map(data => {
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
                data: seriesData,
                type: 'line',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
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
    }
}
</script>
