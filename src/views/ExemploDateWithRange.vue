<template>
<form @submit.prevent="handleSubmit">
  <VDatePicker mode="dateTime" v-model.range="range" is24hr />
  <button>Cadastrar</button>
</form>
</template>

<script>
import { format, parseISO } from 'date-fns'

export default {
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date()
      },
    }
  },
  methods: {
    handleSubmit(){
       
        const dates = JSON.parse(JSON.stringify(this.range));

        const parseStartDate = parseISO(dates.start)
        const formatStartDate = format(parseStartDate, 'yyyy-MM-dd')
        const formatHourDate = format(parseStartDate, 'HH:mm')
       

        const parseEndDate = parseISO(dates.end)
        const formatEndtDate = format(parseEndDate, 'yyyy-MM-dd hh:mm')
        const formatHourDateEnd = format(parseEndDate, 'HH:mm')
      

      //  console.log(format(parseISO(dates.start)), 'yyyy-MM-dd')
        //console.log(format(parseISO(dates.end)), 'yyyy-MM-dd')
    }
  }
}
</script>