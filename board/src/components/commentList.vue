<template>
  <div>
    <div v-if="!isEditing" class="commentList">
      <p>{{comment.content}}</p>
      <p>{{comment.display_name}}</p>
      <button @click="enterEdit">수정하기</button>
    </div>
    <div v-else>
      <textarea v-model="editingContent"></textarea>
      <button @click="exitEdit">취소</button>
      <button @click="submitEdit">완료</button>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      comment: Object,
    },
    data() {
      return {
        isEditing: false,
        editingContent: '',
      }
    },
    created(){
      
    },
    methods:{
      exitEdit () {
        this.isEditing = false
        this.editingContent = ''
      },
      enterEdit () {
        this.isEditing = true
        this.editingContent = this.comment.content
      },
      submitEdit () {
        this.$emit('submit', {
          id: this.comment.custom_comment_id,
          content: this.editingContent,
        })
        this.exitEdit()
      }
    }
}
</script>

<style>
.commentList{
    display: flex;
    justify-content: space-between
}
</style>