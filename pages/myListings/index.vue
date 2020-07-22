<template>
  <div>
    <transition name="fadeOutDown" mode="out-in">
      <the-natification v-if="$store.state.myListings.listNotification"/>
    </transition>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card v-for="post in posts">
            <div class="d-flex flex-no-wrap">
              <div>
                <v-card-title v-text="post.title"></v-card-title>
                <v-card-subtitle v-text="post.price"></v-card-subtitle>
              </div>
              <v-avatar size="125">
                <v-img src=""></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="getImg">Get</v-btn>
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
      })
    },
    methods: {
      getImg(){
        this.$fireStorage.ref().child('usersImgs/W`XHgXIP[PJsYhxEvWXMRwk[g_500x500')
          .getDownloadURL()
          .then( url => console.log(url))
      }
    },
    async created(){
      try{
        await this.$store.dispatch('bindPosts');
      } catch(e) {
        console.error(e)
      }
      this.getImg()
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
