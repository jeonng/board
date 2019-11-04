<template>
  <div>
    <h2>[게시글 목록]</h2>
    <div id="boardBox" v-for="item in items" :key="item.custom_post_id">
      <router-link :to="`/board/${item.custom_post_id}`"><h4>{{item.title}}</h4></router-link>
      <h5>{{item.display_name}}</h5>
    </div>
    <div class="arrow">
      <div>
        <button v-if="this.page!=1" @click="clickPrev">이전</button>
        <button @click="clickNext">다음</button>
      </div>
      <div>
          <router-link :to="`/board/write`">글쓰기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { boardAPI, authAPI, makeQS } from '@/api'

// function getPost(page) {
//   var data = axios ({
//     method:'get',
//     headers:{
//       'x-client-id':1,
//     },
//     url:'http://board.api.leysys.com/v2/custom/post?page='+ page +'&page_length=10',
//   })
//   .then(res => {
//     return res.data.results
//     console.log(res.data)
//   })
//   .catch(err => {throw err.response.data})

//   return data
// }

// function getUser(item){
//   if(!item.user_id) return item;

//   return axios({
//     headers: {
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3R5cGUiOjAsImNsaWVudF9pZCI6MSwidXNlcl9pZCI6MSwiaWF0IjoxNTcyMzI3ODk0LCJleHAiOjE1NzI5MzI2OTR9.6_IeSEpvmRtKD55TWib034015gUFTZEqvLkKCeHfJyg',
//       'x-client-id': 1
//     },
//     method: 'get',
//     url: 'http://auth.api.leysys.com/v2/user/' + item.user_id,
//   })
//   .then(rs => {
//     return rs.data
//   })
// }

export default {
  data() {
    return {
      items: [],
      page:1,
      error:'실패',
      write:false
    }
  },
  created() {
    this.getData()
  },
  methods:{
    getData() {
      boardAPI({
        method: 'get',
        url: '/post' + makeQS({
          page: this.page,
          page_length: 10,
          board_id: 4,
          list_order_type: false,
        })
      }).then(data => {
        this.items = data.results
        console.log(this.items)
        console.log(makeQS({page:1 ,page_length:10}))

      }).catch(err => {
        console.log('bbb')
      })
    },

    clickPrev() {
      --this.page
      this.getData()
    },
    clickNext() {
      ++this.page
      this.getData()
    },
    clickWirte() {
      
    }
  },
}


</script>

<style>
#boardBox{
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.router-link-exact-active {
  text-decoration: none;
}
.arrow button {
  margin: 5px;
}
.arrow div:nth-child(2){
  float:right;
}
</style>

