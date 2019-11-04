<template>
  <div>

  </div>
</template>

<script>
import {boardAPI} from '@/api'

export default {
    data() {
        return{
            post_id : this.$router.currentRoute.params.id
        }
    },
    created(){
        this.commentPost()
    },
    mounted() {
        
    },
    methods:{
        commentPost() {
            boardAPI({
                method: 'get',
                url:'/comment/'
            }).then((data) => {
                console.log(data)
            }).catch(() => {
                console.log('errerrorororor')
            })
        }
    }

}
</script>

<style>

</style>