<template>
  <v-layout
    justify-center
    align-center
  >
  Main page
  </v-layout>
</template>
<script>

export default {
  data() {
    return {
      posts: []
    };
  },
  components: {
    
  },
  methods:{
    
  },
  created(){
    this.$fireStore.collection('posts')
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach( doc =>
          this.posts.push(doc.data())));
    console.log(this.posts);
  }
}
</script> 