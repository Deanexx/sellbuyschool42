<template functional>
  <v-card style='z-index: 999' class="positioning" width="200px"
          color="success">
      <v-card-title class="justify-center text-wrap text-center">Post's been added!</v-card-title>
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