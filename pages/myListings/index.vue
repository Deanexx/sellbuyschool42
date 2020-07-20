<template>
  <div>
    <transition name="fadeOutDown" mode="out-in">
      <the-natification v-if="$store.state.myListings.listNotification"/>
    </transition>
  </div>
</template>
<script>
  import TheNatification from '~/components/myListings/TheNatification'
  import { mapState, mapGetters } from 'vuex'

  export default {
    components:{
      TheNatification
    },
    middleware: 'authenticated',
    data(){
      return {
      }
    },
    computed: {
      ...mapState({
        userToken: state => state.auth.userToken,
        posts: state => state.posts
      }),
      ...mapGetters([
        'readyPosts'
      ])
    },
    methods: {
      getPosts(){
        console.log(this.readyPosts);
        console.log(this.posts);
      }
    },
    async mounted(){
      try{
        await this.$store.dispatch('bindPosts');
      } catch(e) {
        console.error(e)
      }
      console.log(this.readyPosts);
    }
  }
</script>
<style>
  .fadeOutDown-leave-active{
    animation: slideOut 1s reverse;
  }

  @keyframes slideOut {
    from {
      transform: translate3d(-50%, -100%, 0);
      visibility: visible;
      opacity: 0;
    }
    to {
      transform: translate3d(-50%, 0, 0);
      opacity: 1;
    }
  }
</style>
