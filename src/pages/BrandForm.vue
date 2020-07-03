<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
          {{title}}
          <v-spacer></v-spacer>
          <v-btn fab small class="grey" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="loading !== true">
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex md3 sm12 >
                <img v-if="brand.profile_image" class="profile" v-bind:src="brand.avatar" />
              </v-flex>
              <v-flex md9 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>

                    <v-flex v-if="brand.id" md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="id" label="id" hint="Brand name is required" value="Input text" v-model="brand.id"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="brand_name" label="brand_name" hint="Brand name is required" value="Input text" v-model="brand.brand_name"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="company_name" label="company_name" maxlength="10" hint="Last name is required" value="Input text" v-model="brand.company_name"
                        class="input-group--focused" required></v-text-field> -->

                        <v-combobox
                          :items="brand_master.companies"
                          label="search company by name"
                          item-text="company_name"
                          item-value="id"
                          v-model="brand.company"
                          @keyup.native="onCompanySearch($event)"
                          return-object
                        ></v-combobox>
                    </v-flex>

                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="company_id" label="company_id" hint="Last name is required" value="Input text" v-model="brand.company_id"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  xs12 class="mx-1 px-0">
                      <!-- <v-text-field name="brand_type_id" type="text" label="brand_type_id" value="Input text" v-model="brand.brand_type_id"
                        class="input-group--focused" required></v-text-field> -->
                        <v-autocomplete
                          name="brand_type_id"
                          :items="brand_master.brand_types"
                          label="Select Brand Types"
                          item-text="disp_text"
                          item-value="id"
                          v-model="brand.brand_type_id"
                          height="auto"
                        ></v-autocomplete>

                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field name="tag_line" type="text" label="tag_line" v-model="brand.tag_line" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="comp_port" type="text" label="comp_port" v-model="brand.comp_port" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="date_of_established" type="text" label="date_of_established" v-model="brand.date_of_established" class="input-group--focused" required></v-text-field> -->
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        lazy
                        full-width
                        width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="brand.date_of_established"
                          label="pick date_of_established"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="brand.date_of_established" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>

                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="year_established" type="text" label="year_established" v-model="brand.year_established" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="website" type="text" label="website" v-model="brand.website" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="description" type="text" label="description" v-model="brand.description" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="brand.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="created_at" type="text" label="created_at" v-model="brand.created_at" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="brand.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="updated_at" type="text" label="updated_at" v-model="brand.updated_at" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="brand.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="deleted_at" type="text" label="deleted_at" v-model="brand.deleted_at" class="input-group--focused" required></v-text-field>
                    </v-flex>




                    <v-flex md6 sm12  class="mx-1 px-0">
                      <v-switch
                      label="active"
                      v-model="brand.active"
                      :true-value="1"
                      :false-value="0"
                      light>
                    </v-switch>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
  /* global Store */
  import { mapState, dispatch } from 'vuex'
  import api from "@/utils/backend-api";
  export default {
    data() {
      return {
        title: '',
        rules: {
          rewards: [() => {
            if (this.brand && (this.brand.rewards < 0 || this.brand.rewards > 9999)) {
              return 'Reward is required. It must be bewteen 0 and 9999'
            }
            return true;
          }],
          email: [() => {
            /* eslint-disable no-useless-escape */
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.brand && !re.test(this.brand.email)) return 'Email is invalid.'
            return true;
          }]
        },
        company: null,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
      }
    },
    computed: {
      ...mapState('brands', {
        orders: 'orders',
        brand: 'brand',
        brand_master: 'brand_master',
        loading: 'loading',
        mode: 'mode',
        snackbar: 'snackbar',
        notice: 'notice',
      }),
    },
    watch: {
      company: function(newValue, oldValue){
        if (newValue !== oldValue) {
          console.log(newValue);
          this.brand.company_id = newValue.id
        }
      },
    },
    methods: {
      save() {
        const brand = { ...this.brand }
        // delete order.brand
        console.log(brand)
        Store.dispatch('brands/saveBrand', brand)
          .then(() => {
            Store.dispatch("brands/closeSnackBar", 2000)
          })
        // var data = null;
        //
        // var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;
        //
        // xhr.addEventListener("readystatechange", function () {
        //   if (this.readyState === 4) {
        //     console.log(this.responseText);
        //   }
        // });
        //
        // xhr.open("POST", "http://localhost:8081/brands/update/ADM18090000");
        // xhr.setRequestHeader("cache-control", "no-cache");
        // xhr.setRequestHeader("postman-token", "bfde718f-b2f4-43c4-3289-40f8906d1f96");
        //
        // xhr.send(data);



      },
      cancel() {
        this.$router.push({ name: 'Brands' })
      },
      closeSnackbar() {
        Store.commit("brands/setSnackbar", { snackbar: false });
        Store.commit("brands/setNotice", { notice: "" });
      },


      onCompanySearch(event){
        console.log(event);
        if (event.target.value) {
          this.$Progress.start();
          api
            .getData(
              "companies?name=" + event.target.value
            )
            .then(res => {
              // const deal_form = res.data.data.deal_form;
              console.log(res);
              console.log(res.data.success.data);
              // this.user_master.cities = res.data.success.data;
              console.log(this.brand_master);

              this.$set(this.brand_master, 'companies', res.data.success.data)
              Store.commit("companies/setLoading", { loading: false });
              this.$Progress.finish();
              console.log(this.brand_master);
              console.log(this.brand_master.companies);
            });
        } else {
          // this.searchEmails = [];
        }
      },


    },
    created() {

      Store.dispatch('brands/getBrandMasters', this.$route.params.id).then(() => {
        Store.dispatch('brands/getBrandById', this.$route.params.id)
      });
    },
    mounted() {
      console.log(this.brand);
      if (this.$route.params.id) {
        this.title = 'Edit Brand'
      } else this.title = 'New Brand'
    }
  }
</script>
<style>
  .profile {
    max-width: 160px;
  }
</style>
