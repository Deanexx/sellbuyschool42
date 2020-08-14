<template>
    <v-container>
      <v-row class="d-flex d-flex-wrap justify-center align-center">
        <v-col xs="12" md="8">
          <v-card>
            <v-card-title class="primary--text">Adding listing</v-card-title>
            <v-card-text>
              <!-- Title -->
              <v-row>
                <v-col cols="12" md="8" :class="{'py-0': $vuetify.breakpoint.smAndDown}">
                  <v-text-field
                    v-model="formValues.title.value"
                    dense
                    outlined
                    :success="formValues.title.valid"
                    background-color='vuetify_blue'
                    counter='50'
                    maxlength='50'
                    label="Title"
                    required
                    @input="check_field('title', $event)"
                  >
                  </v-text-field>
                </v-col>
              <!-- Price -->
                <v-col cols='4' :class="{'py-0': $vuetify.breakpoint.smAndDown}">
                  <v-text-field
                    v-model='formValues.price.value'
                    dense
                    :success="formValues.price.valid"
                    label="Price"
                    outlined
                    maxlength='4'
                    background-color='vuetify_blue'
                    prefix='$'
                    required
                    @input="check_field('price', $event)"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <!-- Desc -->
              <v-row>
                <v-col cols='12' :class="{'py-0': $vuetify.breakpoint.smAndDown}">
                  <v-textarea
                    v-model='formValues.desc.value'
                    background-color='vuetify_blue'
                    clearable
                    label="Description"
                    :success="formValues.desc.valid"
                    outlined
                    height='100'
                    counter='350'
                    maxlength='350'
                    @input="check_field('desc', $event)"
                    required>
                  </v-textarea>
                </v-col>
              </v-row>
              <!-- Category -->
              <v-row>
                <v-col cols="6" sd="5" md="3" :class="{'py-0': $vuetify.breakpoint.smAndDown}">
                  <v-select
                    label="Category"
                    v-model='formValues.category.value'
                    outlined
                    :success="formValues.category.valid"
                    background-color='vuetify_blue'
                    dense
                    :items='selectItems'
                  >
                  </v-select>
                </v-col>
              </v-row>
              <!-- File -->
              <v-row>
                <v-col cols='3' :class="{'py-0': $vuetify.breakpoint.smAndDown}">
                  <input type="file"
                         hidden
                         multiple
                         accept="image/*"
                         ref='files'
                         @change='list_files'
                  >
                  <v-btn @click='$refs.files.click()'
                         :color="formValues.files.valid ? 'success' : 'default'">Add pictures</v-btn>
                </v-col>
                <v-col cols="12" md="5" class="d-flex mb-0 pb-0" :class="{'px-0': $vuetify.breakpoint.smAndDown}">
                  <v-chip
                    v-for='(file, i) in formValues.files.value'
                    :key='file.name'
                    close
                    @click:close='removeChip(i)'
                    class="ml-5">
                    <template>
                      <span style="max-width: 60px"
                            class="text-truncate">{{ file.name}}</span>
                    </template>
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-text>
            <!-- Button -->
            <v-card-actions>
              <v-btn class='mx-auto'
                     :loading="formSent"
                     color='success'
                     :disabled='isValid'
                     @click='add_post'>
                Publish!
               <template v-slot:loader>
                 <span class="rotate">
                   <v-icon>fas fa-circle-notch</v-icon>
                 </span>
               </template>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
  export default {
    components: {
    },
    middleware: 'authenticated',
    data(){
      return {
        formSent: false,
        totalFiles: 2,
        selectItems: ['Cars / Motorcycles', 'Books', 'Electronics', 'Furniture', 'Other'],
        formValues: {
          title: {
            value: '',
            validation: /^[\sA-Za-z0-9!@$%&*()_+.,':"-=]{10,50}$/,
            valid: false
          },
          price: {
            value: '',
            validation: /^[\d]{1,4}$/,
            valid: false
          },
          desc: {
            value: '',
            validation: /^[\w\s\d!@$%&*()_+.,':"-=]{0,350}$/,
            valid: false
          },
          files: {
            value: [],
            valid: false
          },
          category: {
            value: 'Other',
            valid: true
          }
        }
      }
    },
    computed: {
      isValid()
      {
          for(let key in this.formValues){
            if(this.formValues[key].valid === false)
              return true;
        }
        return false;
      }
    },
    methods: {
      check_field(key, event){
        let field = this.formValues[key];

        field.validation.test(event) ? field.valid = true : field.valid = false;
      },
       add_post(){
        /* Uploading form without files */
        let postId = '';
        let filesNames = [];
        let urls = [];
        let form = this.formValues;
        let filesUploaded = 0;
        this.formSent = true;

          new Promise(resolve => {
          this.formValues.files.value.forEach(el => {
               let fileName = this.randName();

               this.$fireStorage.ref().child(fileName).put(el)
                 .then(res => {
                   return res.ref.getDownloadURL();
                 })
                 .then(url => {
                   filesUploaded++;
                   urls.push(url)
                   filesNames.push(fileName);
                   if(filesUploaded === this.formValues.files.value.length)
                     resolve();
                 });
             })
         })
         .then(() => {
           return this.$fireStore.collection('posts').add({
             id: '',
             title: form.title.value,
             price: form.price.value,
             desc: form.desc.value,
             category: form.category.value,
             user: this.$store.state.auth.userToken,
             intra: this.$store.state.auth.userIntra,
             date: new Date().toDateString(),
             urls: urls,
             filesNames: filesNames,
             views: 0,
             status: true
           })
         })
        .then( res => {
           postId = res.id;

           return this.$fireStore.collection('posts')
            .doc(res.id)
            .update({id: res.id});
        })
         .then(() => {
           this.$router.push('myListings'); /* Redirect watcher */
           this.$store.commit('myListings/listAddNotification'); /* Showing notification about list been added */
         })
      },
      list_files () {
        this.formValues.files.value = [];

        for(let i = 0; i < this.$refs.files.files.length; i++)
        {
          this.formValues.files.value.push(this.$refs.files.files[i]);
        }
      },
      removeChip(key){
        this.formValues.files.value.splice(key, 1);
      },
      randName(){
        /* 65 - 122 allowed ASCII table chars.  */
        let generatedName = '';
        let minChar = 65;
        let maxChar = 122;
        let len = 24;

        for (let i = 0; i <= len; i++)
        {
          let genNum = Math.floor((Math.random() * (maxChar - minChar)) + minChar);
          let genChar = String.fromCharCode(genNum);
          generatedName += genChar;
        }
        return generatedName;

      }
    },
    watch:{
      'formValues.files.value' : function(val){
        val.length <= 0 ? this.formValues.files.valid = false : this.formValues.files.valid = true;  /* Checking if there any files attached */
      }
    }
  }
</script>
<style>

  .fadeOutDown-enter-active {
    animation: fadeIn 1s;
  }

  .fadeOutDown-leave-active {
    animation: fadeOutDown 1s;
  }

  .rotate{
    animation: spinAnimation 1s infinite;
  }

</style>
