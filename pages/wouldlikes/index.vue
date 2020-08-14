<template>
  <v-row  class="d-flex flex-wrap justify-center">
    <v-col cols="12"  md="6">
      <v-card v-for="(wouldLike, i) in wouldLikes"
        :key='i'
        class="mb-2">
        <v-card-title class="d-flex">
          <h1 class="primary--text title-1" >{{ wouldLike.intra }} </h1> <h4 class="body-2 align-self-end"
                                                                              style="position: relative;
                                                                                     top: 2px">&nbsp would like ...</h4>
        </v-card-title>
        <v-card-text>
          {{ wouldLike.title }}
        </v-card-text>
        <v-card-subtitle style="text-align: right;" class="color--success">
          {{ wouldLike.date }}
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
    export default {
        name: "index.vue",
      data(){
          return({
            wouldLikes: []
          })
      },
      created(){
          this.$fireStore.collection('wouldLikes').get()
          .then(snapshot => snapshot.forEach(doc => {
            this.wouldLikes.push(doc.data());
          }));
      }
    }
</script>

<style scoped>
</style>
