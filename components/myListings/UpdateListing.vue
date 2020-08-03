<template style="position: relative">
  <v-container style="position: fixed;
                        top: 10%;
                        left: 50%;
                        transform: translateX(-20%);
                        z-index: 1">
    <v-row>
      <v-col cols="5">
        <v-card style="position: relative">
<!--         Closing Button-->
          <v-btn absolute
                 top
                 right
                 :disabled="updateSent"
                 :ripple="false"
                 small
                 class="rounded-sm"
                 fab
                 tile
                 @click="$emit('close_post')"
          >
            <v-icon color="error">far fa-window-close</v-icon>
          </v-btn>
          <v-card-title>Update listing</v-card-title>
          <v-card-text>
            <v-row>
<!--              Title-->
              <v-col cols="8">
                <v-text-field
                  v-model="formValues.title.value"
                  :success="formValues.title.valid"
                  dense
                  outlined
                  label="Title"
                  background-color='vuetify_blue'
                  counter='50'
                  maxlength='50'
                  required
                  @input="check_field('title', $event)"
                >
                </v-text-field>
              </v-col>
<!--              Price-->
              <v-col cols="4">
                <v-text-field
                  v-model="formValues.price.value"
                  dense
                  outlined
                  :success="formValues.price.valid"
                  label="Price"
                  maxlength='4'
                  background-color='vuetify_blue'
                  prefix='$'
                  required
                  @input="check_field('price', $event)"
                >
                </v-text-field>
              </v-col>
            </v-row>
<!--              Desc-->
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="formValues.desc.value"
                  background-color='vuetify_blue'
                  clearable
                  outlined
                  :success="formValues.desc.valid"
                  label="Description"
                  height='100'
                  counter='350'
                  maxlength='350'
                  @input="check_field('desc', $event)"
                  required>
                </v-textarea>
              </v-col>
            </v-row>
<!--              Category-->
            <v-row>
              <v-col cols='4'>
                <v-select
                  v-model="formValues.category.value"
                  outlined
                  :success="true"
                  label="Category"
                  background-color='vuetify_blue'
                  dense
                  :items='selectItems'
                >
                </v-select>
              </v-col>
            </v-row>
<!--            File-->
            <v-row>
              <v-col cols='4'>
                <input type="file"
                       hidden
                       multiple
                       accept="image/*"
                       ref='files'
                       @change="list_files"
                >
                <v-btn @click="$refs.files.click()"
                       :color="formValues.files.valid ? 'success' : 'default'">Pictures</v-btn>
              </v-col>
              <v-col cols="4">
                <v-chip
                  v-for='(file, i) in formValues.files.value'
                  :key='file.name'
                  close
                  @click:close='removeChip(i)'>
                  <template>
                    <span style="max-width: 60px" class="text-truncate">{{ file.name}}</span>
                  </template>
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
<!--          Button-->
          <v-card-actions>
            <v-btn class='mx-auto'
                   color='success'
                   :loading="updateSent"
                   :disabled="form_validation"
                   @click="updatePost"
            >
              Update!
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
  import { mapState, mapMethods } from 'vuex'

    export default {
        name: "UpdateListing",
        props: ['post'],
        data(){
          return{
            updateSent: false,
            selectItems: ['Cars / Motorcycles', 'Books', 'Electronics', 'Furniture', 'Other'],
            formValues:{
              title: {
                value: this.post.title,
                validation: /^[\sA-Za-z0-9!@$%&*()_+.,':"-=]{10,50}$/,
                valid: true
              },
              price: {
                value: this.post.price,
                validation: /^[\d]{1,4}$/,
                valid: true
              },
              desc: {
                value: this.post.desc,
                validation: /^[\w\s\d!@$%&*()_+.,':"-=]{0,350}$/,
                valid: true
              },
              files: {
                value: [],
                valid: true
              },
              category: {
                value: this.post.category,
                valid: true
              }
            }
          }
        },
      computed:
        {
          ...mapState({
            form_validation() {
              for (let key in this.formValues) {
                if (this.formValues[key].valid === false) return true;
              }
              return false;
            }
          })
      },
      methods:{
        check_field(key, e) {
          let field = this.formValues[key];

          field.validation.test(e) ? field.valid = true : field.valid = false;
        },
        list_files(){
          this.formValues.files.value = [];

          for(let i = 0; i < this.$refs.files.files.length; i++)
          {
            this.formValues.files.value.push(this.$refs.files.files[i]);
          }
        },
        removeChip(key){
          this.formValues.files.value.splice(key, 1);
        },
        async updatePost(){
          this.updateSent = true;
          let form = this.formValues;
          let newFilesNames = [];
          let filesUploaded = 0;
          let urls = [];

          if(form.files.value.length > 0)
          {
            await new Promise(resolve => {
              form.files.value.forEach( el => {
                let fileName = this.randName();

                this.$fireStorage.ref().child(fileName).put(el)
                .then(res => {
                  return res.ref.getDownloadURL();
                })
                .then(url => {
                  filesUploaded++;
                  newFilesNames.push(fileName);
                  urls.push(url);
                  if(filesUploaded === form.files.value.length)
                    resolve();
                })
              })
            })
            /* deleting old pics */
            this.post.filesNames.forEach( el => {
              this.$fireStorage.ref().child(el).delete();
              this.$fireStorage.ref().child('thumbnails/' + el + '_500x500').delete();
            })
          }
          await this.$fireStore.collection('posts')
            .doc(this.post.id)
            .update({
              title: form.title.value,
              price: form.price.value,
              category: form.category.value,
              desc: form.desc.value,
              date: new Date().toDateString(),
              filesNames: newFilesNames.length > 0 ? newFilesNames : this.post.filesNames,
              urls: urls.length > 0 ? urls : this.post.urls
            })
          this.updateSent = false;
          this.$emit('close_post');
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
      }
    }
</script>

<style scoped>
</style>
