<template>
  <div>
    <h4>[댓글]</h4>
    <textarea cols=80 rows="5" placeholder="댓글을 입력해주세요"></textarea>
    <div>
    <button>입력</button>
    </div>
    <commentList></commentList>
  </div>
</template>

<script>
import commentList from './commentList'

export default {
 components:{
   commentList
 },
 data() {
   return {

   }
 },

}
</script>

<style>

</style>