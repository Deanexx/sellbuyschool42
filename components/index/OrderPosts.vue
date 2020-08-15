<template>
  <v-dialog overlay-color="primary" transition="fab-transition" :width="$vuetify.breakpoint.mdAndDown ? '100%' : '25%'">
    <template v-slot:activator="{ on, attr }">
      <div
        style='position: fixed;
          bottom: 6%;
          right: 11%;
          z-index: 997'
          class="d-flex d-flex-wrap justify-center align-center">
        <v-btn

          icon
          light
          x-large
          color="warning"
          v-bind="attr"
          v-on="on"
        >
          <v-icon>fab fa-megaport</v-icon>
        </v-btn>
        <span
          class="warning black--text ml-n4 px-2 rounded-r-xl"
          style="z-index: 998;
                  cursor: pointer;"
          v-bind="attr"
          v-on="on">Sort</span>
      </div>

    </template>
    <v-list class="dialog"
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
  .dialog{
    border-color: #ff7fac !important;
    border-width: 2px !important;
    border-style: solid !important;
  }
</style>
