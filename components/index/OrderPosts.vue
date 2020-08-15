<template
  style='position: fixed;
  top: 0;
  right:0;
  '>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="item in selectItems">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Date</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
</template>

<script>
    export default {
        name: "OrderPosts",
      data(){
          return ({
            selectItems: ['Cars / Motorcycles', 'Books', 'Electronics', 'Furniture', 'Other']
          })
      }
    }
</script>

<style scoped>

</style>
