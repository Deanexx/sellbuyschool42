<template>
  <v-expand-transition>
    <v-list
      v-show="listDrop"
      style='position: fixed;
        top: 11%;
        right:0;'
      :flat='false'
      :v-ripple="false" >
      <v-list-item-group>
        <v-list-item v-for="item in selectItems">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Date</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-expand-transition>

</template>

<script>
    export default {
        name: "OrderPosts",
      data(){
          return ({
            selectItems: ['Cars / Motorcycles', 'Books', 'Electronics', 'Furniture', 'Other'],
            listDrop: false
          })
      }
    }
</script>

<style scoped>

</style>
