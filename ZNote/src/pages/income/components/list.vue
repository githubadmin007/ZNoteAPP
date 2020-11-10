<template>
<v-row>
  <v-col>
    <v-data-table
      :headers="headers"
      :items="IncomeList"
      :items-per-page="10"
      class="elevation-1">
    </v-data-table>
    <v-speed-dial v-model="fab" fixed right bottom>
      <template v-slot:activator>
        <v-btn v-model="fab" fab>
          <v-icon v-if="fab" color="red darken-2" dark>mdi-close</v-icon>
          <v-icon v-else color="blue darken-2" dark>mdi-home</v-icon>
        </v-btn>
      </template>
      <v-btn @click="AddIncome()" color="green" dark fab><v-icon>mdi-plus</v-icon></v-btn>
    </v-speed-dial>
  </v-col>
</v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'income',
  data () {
    return {
      IncomeList: [], // 收入记录
      fab: false,
      headers: [
        {
          text: '到账日期',
          align: 'start',
          sortable: true,
          value: 'arrivaldate'
        },
        { text: '金额', value: 'amount' },
        { text: '类型', value: 'type' },
        { text: '来源', value: 'source' }
      ]
    }
  },
  computed: {
    ...mapGetters('API', ['Income_GetList'])
  },
  methods: {
    AddIncome () {
      this.$router.push('/income/info');
    }
  },
  mounted () {
    this.$axios.post(this.Income_GetList).then(response => {
      this.IncomeList = response.data.map(r => {
        r.arrivaldate = new Date(r.arrivaldate).Format('yyyy年MM月dd日');
        return r
      });
    }).catch(() => {});
  }
}
</script>
