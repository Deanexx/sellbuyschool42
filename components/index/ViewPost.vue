<template class="mt-2">
  <v-card style="position:relative" width="400">
    <v-btn absolute
           style="top: 0%"
           right
           :ripple="false"
           small
           class="rounded-sm"
           fab
           tile
           @click="$emit('close_post')"
    >
      <v-icon color="error">far fa-window-close</v-icon>
    </v-btn>
    <v-carousel
      height="300px"
      active-class="active"
      show-arrows-on-hover
      :show-arrows="true"
      :touchless="true">
      <v-carousel-item v-for="(img, i) in imgs"
                       :src="img"
                       :key="i">
      </v-carousel-item>
    </v-carousel>
    <v-card-title v-text="post.title"></v-card-title>
    <v-card-subtitle class="d-flex">
      <v-icon class="align-self-center mr-1" color="success" small>far fa-eye</v-icon>
      {{ post.views }}
    </v-card-subtitle>
    <v-card-text>{{ post.desc }}</v-card-text>
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-card-subtitle>{{ post.date }}</v-card-subtitle>
      <transition name="fadeOutDown" mode="out-in">
        <v-card-subtitle class="d-flex" :key="total">
          <v-icon color="primary"
                  size="15px"
                  class="mr-1 align-self-center"
                  dense>
            {{ currencies[activeCur].sign }}</v-icon>
          {{ total }}
        </v-card-subtitle>
      </transition>
    </div>
  </v-card>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "ViewPost",
    props: ['post'],
    data(){
      return{
        imgs: []
      }
    },
    computed:{
      ...mapState({
        currencies: state => state.currency.currencies,
        activeCur: state => state.currency.activeCur,
        total(){
          return this.post.price * this.currencies[this.activeCur].value;
        }
      })
    },
    created(){
      this.post.filesNames.forEach(el => {
        this.$fireStorage.ref().child('thumbnails/' + el + '_500x500')
          .getDownloadURL()
          .then( url => this.imgs.push(url))
      })
      this.$fireStore.collection('posts')
        .doc(this.post.id)
        .update({views: ++this.post.views})
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
