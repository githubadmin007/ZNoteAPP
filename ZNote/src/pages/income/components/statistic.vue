<template>
    <v-row>
        <v-col :cols="12" :lg="6" :xl="4">
            <stat-month></stat-month>
        </v-col>
        <v-col :cols="12" :lg="6" :xl="4">
            <stat-year></stat-year>
        </v-col>
        <v-col :cols="12" :lg="6" :xl="4">
            <stat-type></stat-type>
        </v-col>
    </v-row>
</template>

<script>
import statMonth from './stat_month'
import statYear from './stat_year'
import statType from './stat_type'

export default {
    data () {
        return {};
    },
    components: {
        statMonth,
        statYear,
        statType
    }
}
</script>
