<template>
  <v-dialog overlay-color="primary"
            v-model="sheet"
            transition="fab-transition"
            :width="$vuetify.breakpoint.mdAndDown ? '80%' : '20%'">
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
    <v-list class="dialog rounded-lg"
      :flat='false'
      :v-ripple="false">
      <v-list-item-group mandatory active-class="list__active__style">
        <v-list-item v-for="item in selectItems"
                     class='list_style'
                     :key = 'item'
                     :ripple="false"
                     @click="set_order(item)">
          <v-list-item-title class="d-flex justify-center align-center">{{ item }}</v-list-item-title>
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
            sheet: false,
            selectItems: ['Random', 'Cars / Motorcycles', 'Books', 'Electronics', 'Furniture', 'Other'],
          })
        },
      methods:{
          set_order(item){
             this.$emit('setOrder', item);
             this.sheet = false;
          }
      }
    }
</script>

<style scoped>
  .dialog{
    border-right-color: #ff7fac !important;
    border-left-color: #ff7fac !important;
    border-right-width: 3px !important;
    border-right-style: solid !important;
    border-left-width: 3px !important;
    border-left-style: solid !important;
  }
  .list__active__style{
    color: #ff7fac;
  }

  .list_style:hover{
    color: red !important;
  }
</style>
