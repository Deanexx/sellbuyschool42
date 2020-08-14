<template style="position: relative">
    <v-container :style="{position: 'fixed',
                        top: '7%',
                        left: $vuetify.breakpoint.lgAndUp ? '75%' : '50%',
                        transform: 'translateX(-50%)',
                        zIndex: '1'}">
      <v-row>
        <v-col cols="12" md="5">
          <v-card style="position:relative">
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
              :height="$vuetify.breakpoint.height < 700 ? '180px' : '300px'"
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
            <v-card-text :class="{'pb-0' : $vuetify.breakpoint.smAndDown}">{{ post.desc }}</v-card-text>
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-card-subtitle class="success--text"  :class="{'py-1' : $vuetify.breakpoint.smAndDown}">{{ post.date }}</v-card-subtitle>
              <transition name="fadeOutDown" mode="out-in">
                <v-card-subtitle class="d-flex" :key="total" :class="{'py-1' : $vuetify.breakpoint.smAndDown}">
                  <v-icon color="primary"
                          size="15px"
                          class="mr-1 align-self-center"
                          dense>
                    {{ currencies[activeCur].sign }}</v-icon>
                  {{ (total).toFixed(1) }}
                </v-card-subtitle>
              </transition>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
    import {mapState} from "vuex";

    export default {
      name: "ViewListing",
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
        console.log(this.$vuetify.breakpoint.height);
        this.post.filesNames.forEach(el => {
          this.$fireStorage.ref().child('thumbnails/' + el + '_500x500')
            .getDownloadURL()
            .then( url => this.imgs.push(url))
        })

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
