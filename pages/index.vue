<template>
  <v-layout
    justify-center
    align-center
  >
      <v-overlay :value="viewPost"
        :opacity="0.85"
        color="primary">
          <view-post :post='selectedPost'
                     v-if="viewPost"
                     @close_post="viewPost = false">
          </view-post>
      </v-overlay>
  <order-posts v-on:setOrder="set_order"/>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col xs="12" md="8" lg="5">
        <v-card v-for="(post, i) in postsRender"
          :key="i"
          class="mb-4">
          <v-card-title v-text="post.title" class="justify-center"></v-card-title>
          <v-img :src="post.urls[0]"
                 max-height="300"></v-img>
          <v-card-subtitle class="d-flex justify-space-between align-center" style="position: relative">
            <div class="d-flex">
              <v-icon class="align-self-center mr-1" color="success" small>far fa-eye</v-icon>
              {{ post.views }}
            </div>
            <v-btn color="info"
              :ripple="false"
              @click='ft_view_clicked(i)'
              style="position: absolute;
               top: 50%;
               left: 50%;
               transform: translate(-50%, -50%)">View</v-btn>
            <transition name="fadeOutDown" mode="out-in">
              <v-card-subtitle class="pb-3 d-flex" :key="activeCur">
                <v-icon color="primary"
                        size="15px"
                        class="mr-1 align-self-center"
                        dense>
                  {{ currencies[activeCur].sign }}</v-icon>
                {{ (post.price * currencies[activeCur].value).toFixed(1) }}
              </v-card-subtitle>
            </transition>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-layout>
</template>
<script>

import {mapState} from "vuex";
import ViewPost from '~/components/index/ViewPost'
import OrderPosts from '~/components/index/OrderPosts'

export default {
  components: {
    ViewPost,
    OrderPosts
  },
  data() {
    return {
      order: 'default',
      posts: [],
      postsRender: [],
      viewPost: false,
      postId: null
    };
  },
  computed: {
    ...mapState({
      currencies: state => state.currency.currencies,
      activeCur: state => state.currency.activeCur,
      selectedPost(){
        if(this.postId === null) return null;
        return this.posts[this.postId];
      }
    })
  },
  methods:{
    set_order(order){

      this.postsRender.splice(0, this.postsRender.length);
      console.log(this.posts)
      switch(order){
        case 'Random': {
          this.posts.forEach(el => this.postsRender.push(el));
          break;
        }
        default :
          this.postsRender = this.posts.filter(el => el.category === order);
      }
      console.log(this.posts);
    },
    ft_view_clicked(id){
      this.postId = id;
      this.viewPost = true;
    }
  },
  created(){
    let tmp;
    let firstIndex;
    let secondIndex;

    this.$fireStore.collection('posts')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach( doc => this.posts.push(doc.data()));
        for(let i = 0; i < this.posts.length; i++){
          firstIndex = Math.floor(Math.random() * this.posts.length);
          secondIndex = Math.floor(Math.random() * this.posts.length);

          tmp = this.posts[firstIndex];
          this.posts[firstIndex] = this.posts[secondIndex];
          this.posts[secondIndex] = tmp;
        }

        this.posts.forEach(el => this.postsRender.push(el));
        }
      );
  }
}
</script>
<style lang="scss" scoped>
    .fadeOutDown-enter-active {
      animation: fadeIn 0.5s;
    }

    .fadeOutDown-leave-active {
      animation: fadeIn 0.5s reverse;
    }

</style>
