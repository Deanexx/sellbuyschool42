<template>
  <div>
    <transition name="animate__zoomIn" mode="in-out">
      <view-would-like v-if="viewPost"
                       :wouldLike="wouldLikes[selectedPost]"
                       @close_post="viewPost = false"/>
    </transition>
    <v-container>
      <v-row class="d-flexd d-flex-wrap justify-center align-center">
        <v-col xs="12" sm="8" md="5">
          <transition-group name="fadeOutDown">
            <v-card class="mb-2"
                    v-for="(el, i) in wouldLikes"
                    :key="el.id">
              <v-card-title>I would like...</v-card-title>
              <v-card-text>
                {{el.title}}
              </v-card-text>
              <v-card-actions>
                <v-btn color="info" @click="show_view(i)">Update</v-btn>
                <v-btn color="error" @click="delete_post(i)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </transition-group>
        </v-col>
      </v-row>


    </v-container>
  </div>
</template>

<script>
  import { mapState} from 'vuex'
  import ViewWouldLike from '~/components/myWouldLikes/ViewWouldLike.vue'

    export default {
      name: "index.vue",
      components:{
        ViewWouldLike
      },
      middleware: 'authenticated',
      data() {
        return {
          viewPost: false,
          selectedPost: null
        }
      },
      computed: {
        ...mapState({
          wouldLikes: state => state.userWouldLikes
        })
      },
      methods:{
        show_view(id){
          this.selectedPost = id;
          this.viewPost = true;
        },
        delete_post(id){
          this.$fireStore.collection('wouldLikes').doc(this.wouldLikes[id].id).delete();
        },
      },
      async created(){
        try{
          await this.$store.dispatch('bindUserWouldLikes');
        } catch(e) {
          console.error(e)
        }
      }
    }
</script>

<style lang="scss" scoped>
  .animate__zoomIn-enter-active {
    animation: zoomIn 0.2s;
  }

  .animate__zoomIn-leave-active {
    animation: zoomIn 0.2s reverse;
  }

  .fadeOutDown-leave-active {
    animation: fadeIn 0.5s reverse;
  }
</style>
