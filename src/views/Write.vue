<template>
  <div>
    <textarea v-model="title" placeholder="제목을 작성해주세요" cols="80" rows="3"></textarea>
    <textarea v-model="content" placeholder="본문을 작성해주세요" cols="80" rows="30"></textarea>
    <div>
      <input type="radio" id="one" :value="3" v-model="picked">
      <label for="one">비밀</label>
      <input type="radio" id="two" :value="4" v-model="picked">
      <label for="two">일반</label>
      <input type="radio" id="three" :value="5" v-model="picked">
      <label for="three">게시판공지</label>
      <input type="radio" id="four" :value="6" v-model="picked">
      <label for="four">전역공지</label>
    </div>
    <button @click="submit">글쓰기</button>
  </div>
</template>

<script>
import {boardAPI} from '@/api'

export default {
  data() {
    return {
      title:'',
      content:'',
      picked: 4,
      board_id: 4,
    }
  },
  created() {

  },
  methods: {
    submit() {
      boardAPI({
        method:'post',
        url:'/new/post/'+ this.board_id,
        data: {
          title: this.title,
          content: this.content,
          post_type: this.picked,
        },
      }).then((data) => {
        // this.title = data.title,
        // this.content = data.content,
        console.log(data.insertId)
        this.$router.push('/board/' + data.insertId)
      }).catch(err => 
        console.log('error')
      )
    }
  }
}
</script>

<style>

</style>