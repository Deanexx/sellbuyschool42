<template>
    <v-container>
      <v-row>
        <v-col cols='12'>
          <v-card>
            <v-card-title>Adding listing</v-card-title>
            <v-card-text>
              <!-- Title -->
              <v-row>
                <v-col cols='2' class=''>
                  <p>Title</p>
                </v-col>
                <v-col cols='10'>
                  <v-text-field
                    v-model='formValues.title.value'
                    dense
                    outlined
                    background-color='vuetify_blue'
                    counter='50'
                    maxlength='50'
                    required
                    @input="check_field('title', $event)"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <!-- Price -->
              <v-row>
                <v-col cols='2' class=''>
                  <p>Price</p>
                </v-col>
                <v-col cols='2'>
                  <v-text-field
                    v-model='formValues.price.value'
                    dense
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
                <v-col cols='2' class=''>
                  <p>Describtion</p>
                </v-col>
                <v-col cols='10'>
                  <v-textarea
                    v-model='formValues.desc.value'
                    background-color='vuetify_blue'
                    clearable
                    outlined
                    height='200'
                    counter='350'
                    maxlength='350'
                    @input="check_field('desc', $event)"
                    required>
                  </v-textarea>
                </v-col>
              </v-row>
              <!-- Category -->
              <v-row>
                <v-col cols='2'>
                  <p>Category</p>
                </v-col>
                <v-col cols='3'>
                  <v-select
                    v-model='formValues.category.value'
                    outlined
                    background-color='vuetify_blue'
                    dense
                    :items='slectItems'
                  >
                  </v-select>
                </v-col>
              </v-row>
              <!-- File -->
              <v-row>
                <v-col cols='2'>
                  <p>File</p>
                </v-col>
                <v-col cols='2'>
                  <input type="file"
                         hidden
                         multiple
                         accept="image/*"
                         ref='files'
                         @change='list_files'
                  >
                  <v-btn @click='$refs.files.click()'>Add pictures</v-btn>
                </v-col>
                <v-chip
                  v-for='(file, i) in formValues.files.value'
                  :key='file.name'
                  close
                  @click:close='removeChip(i)'>
                  {{ file.name }}
                </v-chip>
              </v-row>
            </v-card-text>
            <!-- Button -->
            <v-card-actions>
              <v-btn class='mx-auto'
                     :loading="formSent === true"
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
        formSent: null,
        totalFiles: 2,
        slectItems: ['Cars / Motorcycles', 'Books', 'Electronics', 'Furniture', 'Other'],
        formValues: {
          title: {
            value: '',
            validation: /^[\sA-Za-z0-9!@$%&*()_+.,':"-=]{10,128}$/,
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
            valid: true
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
        /* Uploading files */

        let form = this.formValues;
        let filePath = '';
        let filesName = [];
        let ref = this.$fireStorage.ref();
        let uploadedFiles = 0;
        this.formSent = true;

          form.files.value.forEach((el) => {
            let fileName = this.randName();

            ref.child(fileName).put(el)
            .then((data) => {
              console.log(data.ref.getDownloadURL());
              console.log(data)
               return new Promise((resolve) => {
                if(data.state === 'success')
                {
                  filesName.push(fileName);
                  ++uploadedFiles;
                }
                if(uploadedFiles === form.files.value.length)
                  resolve();
              })
            })
            .then(() => {
              /* Uploading data to fireStore */

              this.$fireStore.collection('posts').add({
                id: '',
                title: form.title.value,
                price: form.price.value,
                desc: form.desc.value,
                category: form.category.value,
                files: {...filesName},
                user: this.$store.state.auth.userToken,
                date: new Date(),
                urls: [],
                views: 0,
                status: 0
              }).then( res => {
                let urls = [];

                filesName.forEach( el => {
                  this.$fireStorage.ref().child('usersImgs/' + el + '_500x500').getDownloadURL()
                    .then( url => urls.push(url))
                })
                this.$fireStore.collection('posts')
                  .doc(res.id)
                  .update({id: res.id, urls: urls});
              })
              this.formSent = false; /* Redirect watcher */
              this.$store.commit('myListings/listAddNotification'); /* Showing notification about list been added */
            })
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
        typeof val[0] === 'object' ? val.valid = true : val.valid = false;  /* Checking if there any files attached */
      },
      'formSent': function(){
        if(this.formSent === false)
          this.$router.push('myListings');
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
