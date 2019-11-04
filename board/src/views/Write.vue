<template>
  <div>
    <div>
      <textarea v-model="title" placeholder="제목을 작성해주세요" cols="80" rows="3"></textarea>
      <textarea v-model="content" placeholder="본문을 작성해주세요" cols="80" rows="30"></textarea>
      <br><br>
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
      <br><br>
      <button @click="submit">{{post_id ? '수정' : '글쓰기'}}</button>
    </div>
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
      post_id: null,
    }
  },
  mounted() {
    this.post_id = (this.$router.currentRoute.name === 'edit')
      ? this.$router.currentRoute.params.id
      : null;

    if (this.post_id) { this.getEdit() }
  },
  methods: {
    submit() {
      boardAPI({
        method: this.post_id ? 'put' : 'post',
        url: this.post_id
          ? '/post/' + this.post_id
          : '/new/post/'+ this.board_id,
        data: {
          title: this.title,
          content: this.content,
          post_type: this.picked,
        },
      }).then((data) => {
        // this.title = data.title,
        // this.content = data.content,
        // console.log(data.insertId)

        var id = this.post_id ? this.post_id : data.insertId;
        this.$router.push('/board/' + id)
      }).catch(err => 
        console.log('error')
      )
    },
    getEdit() {
      boardAPI({
        method: 'get',
        url:'/post/' + this.post_id,
      }).then((data) =>{
        this.title = data.result[0].title,
        this.content = data.result[0].content,
        console.log(data)
      }).catch(() => {
        
      })
    }
    // onEdit() {
    //   boardAPI({
    //     method:'put',
    //     url:'/new/post/'+ data.insertId +'/edit',
    //     data: {

    //     },
    //   }).then((data) => {
    //     // this.title = data.title,
    //     // this.content = data.content,
    //   }).catch(err => 
    //     console.log('error')
    //   )
    // }
  }
}
</script>

<style>

</style>