<template>
    <h1>{{dateFormat}}</h1> <br />
    <VDatePicker v-model="date" mode="dateTime"  />
    <button @click="handleFormatDate">Formatar data</button>
</template>

<script>
import { format } from 'date-fns'

export default {
    data(){
        return {
            date: null,
            dateFormat: null
        }
    },
    methods: {
        handleFormatDate(){
            this.dateFormat = format(this.date, 'yyyy-MM-dd hh:mm')
        }
    }
}
</script>