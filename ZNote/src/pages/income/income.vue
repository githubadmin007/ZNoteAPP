<template>
    <div>
        <component :is="mode"></component>
        <v-speed-dial v-model="fab" fixed right bottom>
            <template v-slot:activator>
                <v-btn v-model="fab" fab>
                    <v-icon v-if="fab" color="red darken-2" dark>mdi-close</v-icon>
                    <v-icon v-else color="blue darken-2" dark>mdi-home</v-icon>
                </v-btn>
            </template>
            <v-btn @click="CreateRecord()" color="green" dark fab><v-icon>mdi-plus</v-icon></v-btn>
            <v-btn v-if="mode!='list'" @click="mode='list'" color="green" dark fab><v-icon>mdi-format-list-bulleted</v-icon></v-btn>
            <v-btn v-if="mode!='statistic'" @click="mode='statistic'" color="green" dark fab><v-icon>mdi-chart-areaspline</v-icon></v-btn>
        </v-speed-dial>
    </div>
</template>

<script>
import statistic from './components/statistic'
import list from './components/list'

export default {
    data () {
        return {
            fab: false, // 悬浮按钮组状态
            mode: 'statistic' // statistics,list
        };
    },
    components: {
        statistic,
        list
    },
    methods: {
        CreateRecord () {
            this.$VMessage.warning('功能升级中！');
        }
    }
}
</script>
