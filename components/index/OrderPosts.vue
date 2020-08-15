<template>
  <v-dialog>
    <template v-slot:activator="{ on, attr }">
      <v-btn
        style='position: fixed;
        top: 11%;
        right:0;'
        icon
        color="warning"
        v-bind="attr"
        v-on="on"
      >
        <v-icon>fab fa-megaport</v-icon>
      </v-btn>
    </template>
    <v-list
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
  </v-dialog>


</template>

<script>
    export default {
        name: "OrderPosts",
      data(){
          return ({
            sheet: true,
            selectItems: ['Cars / Motorcycles', 'Books', 'Electronics', 'Furniture', 'Other'],
          })
      }
    }
</script>

<style scoped>

</style>
