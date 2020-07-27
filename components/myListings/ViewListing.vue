<template style="position: relative">
    <v-container style="position: absolute;
                        top: 5%;
                        left: 50%;
                        transform: translateX(-20%);
                        z-index: 1">
      <v-row>
        <v-col cols="5">
          <v-card style="position:relative">
            <v-btn absolute
                   top
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
              <v-card-subtitle>{{ post.price }}</v-card-subtitle>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
    export default {
        name: "ViewListing",
        props: ['post'],
        data(){
          return{
            imgs: []
          }
        },
        created(){
          this.post.filesNames.forEach(el => {
            this.$fireStorage.ref().child('thumbnails/' + el + '_500x500')
              .getDownloadURL()
              .then( url => this.imgs.push(url))
          })

       }
    }
</script

<style lang="scss" scoped>
</style>
