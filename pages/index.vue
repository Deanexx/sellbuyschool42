<template>
  <v-layout
    justify-center
    align-center
  >
  </v-layout>
</template>
<script>

export default {
  components: {

  },
  methods:{
    readFromRealtimeDb(){
      let listPath = this.$fireDb.ref('lists');
      try{
        listPath.on('child_added', snapshot => console.log(snapshot.val()));
      }
      catch(e){
        alert(e);
      }
    }
  },
  mounted(){
    //this.readFromRealtimeDb();
  }
}
</script>
