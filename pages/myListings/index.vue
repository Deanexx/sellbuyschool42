<template>
  <div>
    <transition name="fadeOutDown" mode="out-in">
      <the-natification v-if="$store.state.myListings.listNotification"/>
    </transition>
    <transition name="animate__zoomIn" mode="out-in">
      <view-listing :post='selectedPost'
                    v-if="viewPost"
                    @close_post="viewPost = false"></view-listing>
    </transition>
    <transition name="animate__zoomIn" mode="out-in">
      <update-listing :post='selectedPost'
                    v-if="updatePost"
                    @close_post="updatePost = false"></update-listing>
    </transition>

    <v-container>
      <v-row  class="d-flex flex-wrap justify-center">
        <v-col cols="6">
          <v-card v-for="(post, i) in posts"
                  class="mb-4"
                  :key="i">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title v-text="post.title"></v-card-title>
                <v-card-subtitle v-text="post.price" class="pb-3"></v-card-subtitle>
                <v-card-actions class="pb-0 pt-0">
                  <v-btn color="info" @click='ft_view_clicked(i)'>View</v-btn>
                  <v-btn color="vuetify_blue" @click="ft_update_clicked(i)">Update</v-btn>
                  <v-btn color="error" @click="ft_delete_clicked(i)">Delete</v-btn>
                </v-card-actions>
              </div>
              <v-avatar
                tile
                class="rounded-sm"
                size="125">
                <v-img :src="post.urls[0]"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import TheNatification from '~/components/myListings/TheNatification'
  import ViewListing from '~/components/myListings/ViewListing'
  import UpdateListing from '~/components/myListings/UpdateListing'
  import { mapState, mapGetters } from 'vuex'

  export default {
    components:{
      TheNatification,
      ViewListing,
      UpdateListing
    },
    middleware: 'authenticated',
    data(){
      return {
        viewPost: false,
        updatePost: false,
        postId: null
      }
    },
    computed: {
      ...mapState({
        userToken: state => state.auth.userToken,
        posts: state => state.posts,
        selectedPost(){
          if(this.postId === null) return null;
          return this.posts[this.postId];
        }
      })
    },
    methods: {
      ft_view_clicked(id){
        this.postId = id;
        this.viewPost = true;
      },
      ft_update_clicked(id){
        this.postId = id;
        this.updatePost = true;
      },
      ft_delete_clicked(id){
        this.postId = id;
        let post = this.selectedPost;

        this.$fireStore.collection('posts').doc(post.id).delete();
      }
    },
    async created(){
      try{
        await this.$store.dispatch('bindPosts');
      } catch(e) {
        console.error(e)
      }
    }
  }
</script>
<style>
  .fadeOutDown-leave-active{
    animation: slideOut 1s reverse;
  }

  .animate__zoomIn-enter-active {
    animation: zoomIn 0.2s;
  }

  .animate__zoomIn-leave-active {
    animation: zoomIn 0.2s reverse;
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
