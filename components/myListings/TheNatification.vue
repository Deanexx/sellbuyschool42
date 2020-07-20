<template functional>
  <v-card class="positioning" width="200px" height="200px"
          color="success">
      <v-card-title class="justify-center text-wrap text-center">Post's been added!</v-card-title>
      <v-img src="/giphts/giphy.gif"></v-img>
  </v-card>
</template>
<script>
  export default {
    name: "TheNatification"
  }
</script>

<style lang="scss" scoped>
  .positioning{
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
