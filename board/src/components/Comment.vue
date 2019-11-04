<template>
  <div>
    <h4>[댓글]</h4>
    <textarea v-model="content" cols=80 rows="5" placeholder="댓글을 입력해주세요"></textarea>
    <div>
    <button @click="onAnswer">입력</button>
    </div>
    <ol>
      <commentList
        v-for="comment in comments"
        :key="comment.custom_comment_id"
        :comment="comment"
        @submit="submitEditComment"
      >
      </commentList>
    </ol>
  </div>
</template>

<script>
import { boardAPI } from '@/api'
import commentList from './commentList'

export default {
  components: {
      commentList
  },
  data() {
    return {
      content: 'aaa',
      post_id: this.$route.params.id,
      comments: [],
    }
  },
  methods: {
    getComments() {
      boardAPI({
        method: 'get',
        url: '/comment?' + 'post_id=' + this.post_id
      }).then((data) => {
        this.comments = data.results
        console.log(data.results)
      }).catch(() => {
        console.log('errerrorororor')
      })
    },
    addComment() {
      return boardAPI({
        method: 'post',
        url: '/comment/' + this.post_id,
        data: {
          content: this.content
        }
      }).then((data) => {
        console.log(data)
      }).catch(() => {
        console.log('에러입니당')
      })
    },
    onAnswer() {
      this.addComment().then(e => {
        console.log('ddd')
        this.getComments()
      })
    },
    submitEditComment (d) {
      console.log(d)
      boardAPI({
        method:'put',
        url:'/comment/' + d.id,
        data: {
          content: d.content
        }
      }).then(() => {
        this.getComments()
      })
    }
  },
  mounted() {
    this.getComments()
  }
}
</script>

<style>

</style>