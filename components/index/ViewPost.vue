<template class="mt-2" style="position:relative">
    <v-card  width="400"
           :style="cardStyles">
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
      :height="$vuetify.breakpoint.height < 700 ? '200px' : '300px'"
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
      <v-icon class="align-self-center mr-1"
              color="success"
              small>far fa-eye</v-icon>
      {{ post.views }}
      <v-spacer></v-spacer>
      <v-icon class="align-self-center mr-1"
        color="primary"
        small>fas fa-user</v-icon>
      {{ post.intra }}
    </v-card-subtitle>
    <v-card-text :class="{'py-0' : $vuetify.breakpoint.height < 700 ? '200px' : '300px'}">{{ post.desc }}</v-card-text>
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-card-subtitle :class="{'py-1' : $vuetify.breakpoint.smAndDown}"
                       class="success--text">{{ post.date }}</v-card-subtitle>
      <transition name="fadeOutDown" mode="out-in">
        <v-card-subtitle class="d-flex"
                         :key="total"
                         :class="{'py-1' : $vuetify.breakpoint.smAndDown}">
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
        imgs: [],
        cardStyles: {
          width: this.$vuetify.breakpoint.smAndDown ? '300px' : '400px',
          height: this.$vuetify.breakpoint.smAndDown ? 'overflow-y:scroll; height: ' + this.$vuetify.breakpoint.height - 50 : 'auto',
          position: 'fixed',
          top:'10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex : '999'
        }
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
      console.log(this.$vuetify.breakpoint.height);
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
