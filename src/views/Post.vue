<template>
  <div id="board" >
    <div v-for="item in items" :key="item.id">
      <h2>{{item.title}}</h2>
      <p>{{item.nickname}}</p>
    </div>
    <div v-for="item in items" :key="item.id">
      <p>{{item.data}}</p>
      <p v-html="item.content"></p>
    </div>
  </div>
</template>

<script>
import { boardAPI, authAPI, makeQS } from '@/api'
import moment from 'moment-timezone'

export default {
  data() {return {
    id: this.$route.params.id,
    items:[],
    date:''
  }},
  created() {
    this.getData()
  },
  methods: {
    getData() {
    boardAPI({
      method: 'get',
      url: '/post/' + this.id
    }).then(data => {
      this.items = data.result
      var postDate = this.items[0].date_created
      var result = moment(this.items[0].date_created).format('YYYY. MM. DD. HH:mm:ss')
      console.log('결과: ', result)
      console.log(postDate)
      console.log(getMonth(postDate))
      console.log(this.items)
    }).catch(err => {
      console.log('posterror')
    })
  },
  },
  // getUser(item) {
  //   authAPI({
  //     method:'get',
  //     auth:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3R5cGUiOjAsImNsaWVudF9pZCI6MSwidXNlcl9pZCI6MSwiaWF0IjoxNTcyMzI3ODk0LCJleHAiOjE1NzI5MzI2OTR9.6_IeSEpvmRtKD55TWib034015gUFTZEqvLkKCeHfJyg',
  //     url:'/user/'+ 1
  //   }).then (data => {
  //     var ret = data.user_result;
  //     console.log(ret)
  //     console.log('ccc')
  //   }).catch(err => {
  //     console.log('ddd')
  //   })
  // },
}
</script>

<style>
  #board {
    margin: 0 auto;
    width: 70%;
  }
</style>