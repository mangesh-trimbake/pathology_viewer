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
                <img v-if="company.profile_image" class="profile" v-bind:src="company.avatar" />
              </v-flex>
              <v-flex md9 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>


                    <v-flex v-if="company.id" md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="id" label="id" hint="Company name is required" value="Input text" v-model="company.id"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="company_name" label="company_name" hint="Company name is required" value="Input text" v-model="company.company_name"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <!-- <v-text-field name="username" label="User Name" hint="User name is required" value=""
                        class="input-group--focused" required></v-text-field> -->
                        <v-combobox
                          :items="company_master.users"
                          label="search user by email/username"
                          item-text="email"
                          item-value="user_id"
                          v-model="company.user"
                          @keyup.native="onUserSearch($event)"
                          return-object
                        ></v-combobox>
                    </v-flex>

                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="user_id" label="user_id" hint="Last name is required" value="Input text" v-model="company.user_id"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>


                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="industry_id" label="industry_id" maxlength="10" hint="Last name is required" value="Input text" v-model="company.industry_id"
                        class="input-group--focused" required></v-text-field> -->

                        <v-autocomplete
                          name="industry_id"
                          :items="company_master.industries"
                          label="Select industry"
                          item-text="name"
                          item-value="id"
                          v-model="company.industry_id"
                          height="auto"
                          v-on:change="onIndusrtyChange"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md4 sm12  xs12 class="mx-1 px-0">
                      <!-- <v-text-field name="sub_industry_id" type="text" label="sub_industry_id" value="Input text" v-model="company.sub_industry_id"
                        class="input-group--focused" required></v-text-field> -->

                        <v-autocomplete
                          name="sub_industry_id"
                          :items="company_master.sub_industries"
                          label="Select sub industry"
                          item-text="name"
                          item-value="id"
                          v-model="company.sub_industry_id"
                          height="auto"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field name="name_of_founder" type="text" label="name_of_founder" v-model="company.name_of_founder" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="pan_no" type="text" label="pan_no" v-model="company.pan_no" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="gst_no" type="text" label="gst_no" v-model="company.gst_no" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field name="tag_line" type="number" label="tag_line" hint="Number between 0 and 9999"
                        v-model="company.tag_line" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="comp_port" type="text" label="comp_port" v-model="company.comp_port" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="date_of_established" type="text" label="date_of_established" v-model="company.date_of_established" class="input-group--focused" required></v-text-field> -->


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
                          v-model="company.date_of_established"
                          label="pick date_of_established"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="company.date_of_established" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>


                    </v-flex>




                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="year_established" type="text" label="year_established" v-model="company.year_established" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="ownership_id" type="text" label="ownership_id" v-model="company.ownership_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="ownership_id"
                        :items="company_master.ownerships"
                        label="Select ownership"
                        item-text="disp_text"
                        item-value="id"
                        v-model="company.ownership_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="prev_yr_turnover" type="text" label="prev_yr_turnover" v-model="company.prev_yr_turnover" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="prev_2yr_turnover" type="text" label="prev_2yr_turnover" v-model="company.prev_2yr_turnover" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="no_of_emp" type="text" label="no_of_emp" v-model="company.no_of_emp" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="website" type="text" label="website" v-model="company.website" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="description" type="text" label="description" v-model="company.description" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="company.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="created_at" type="text" label="created_at" v-model="company.created_at" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>

                    <v-flex v-if="company.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="updated_at" type="text" label="updated_at" v-model="company.updated_at" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>

                    <v-flex v-if="company.id" md4 sm12 class="mx-1 px-0">
                      <v-text-field name="deleted_at" type="text" label="deleted_at" v-model="company.deleted_at" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>

                    <v-flex md6 sm12  class="mx-1 px-0">
                      <v-switch
                        label="active"
                        v-model="company.active"
                        :true-value="1"
                        :false-value="0"
                        light></v-switch>
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
        components: [
          'Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields',
        ],
        title: '',
        rules: {
          rewards: [() => {
            if (this.company && (this.company.rewards < 0 || this.company.rewards > 9999)) {
              return 'Reward is required. It must be bewteen 0 and 9999'
            }
            return true;
          }],
          email: [() => {
            /* eslint-disable no-useless-escape */
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.company && !re.test(this.company.email)) return 'Email is invalid.'
            return true;
          }]

        },
        username: null,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
      }
    },
    computed: {
      ...mapState('companies', {
        orders: 'orders',
        company: 'company',
        company_master: 'company_master',
        loading: 'loading',
        mode: 'mode',
        snackbar: 'snackbar',
        notice: 'notice',
      }),
    },
    watch: {
      'company.user': function(newValue, oldValue){
        if (newValue !== oldValue) {
          console.log(newValue);
          this.company.user_id = newValue.user_id
        }
      },
      'company.industry_id': function(newValue, oldValue){
        console.log(newValue);
        console.log(oldValue);
        if (newValue !== oldValue) {
          console.log(newValue);
          this.onIndusrtyChange();

        }
      },

    },
    methods: {
      save() {
        const company = { ...this.company }
        // delete order.company
        console.log(company)
        Store.dispatch('companies/saveCompany', company)
          .then(() => {
            Store.dispatch("companies/closeSnackBar", 2000)
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
        // xhr.open("POST", "http://localhost:8081/companies/update/ADM18090000");
        // xhr.setRequestHeader("cache-control", "no-cache");
        // xhr.setRequestHeader("postman-token", "bfde718f-b2f4-43c4-3289-40f8906d1f96");
        //
        // xhr.send(data);



      },
      cancel() {
        this.$router.push({ name: 'Companies' })
      },
      closeSnackbar() {
        Store.commit("companies/setSnackbar", { snackbar: false });
        Store.commit("companies/setNotice", { notice: "" });
      },

      onIndusrtyChange(){
        console.log(this.company.industry_id);
        if (this.company.industry_id) {
          this.$Progress.start();
          api
            .getData(
              "sub-industries?industry_id=" + this.company.industry_id
            )
            .then(res => {
              // const deal_form = res.data.data.deal_form;
              console.log(res);
              console.log(res.data.success.data);
              // this.user_master.cities = res.data.success.data;
              console.log(this.company_master);

              this.$set(this.company_master, 'sub_industries', res.data.success.data)
              Store.commit("companies/setLoading", { loading: false });
              this.$Progress.finish();
              console.log(this.company_master);
              console.log(this.company_master.sub_industries);
            });
      } else {
        // this.searchEmails = [];
      }

    },

    onUserSearch(event){
      console.log(event);
      if (event.target.value) {
        this.$Progress.start();
        api
          .getData(
            "users?name=" + event.target.value
          )
          .then(res => {
            // const deal_form = res.data.data.deal_form;
            console.log(res);
            console.log(res.data.success.data);
            // this.user_master.cities = res.data.success.data;
            console.log(this.company_master);

            this.$set(this.company_master, 'users', res.data.success.data)
            Store.commit("companies/setLoading", { loading: false });
            this.$Progress.finish();
            console.log(this.company_master);
            console.log(this.company_master.users);
          });
      } else {
        // this.searchEmails = [];
      }
    }


    },
    created() {

      Store.dispatch('companies/getCompanyMasters', this.$route.params.id).then(() => {
        Store.dispatch('companies/getCompanyById', this.$route.params.id)
        .then(response => {
        // console.log(response.data) // shows the user data good stuff
        console.log('Got some user data, now lets show something with it')
        console.log(this.company);
        this.onIndusrtyChange();
      },
      // (error) => {
      //   // console.log(error.response) // shows the API error invalid credentials type junk
      //   console.log('Got nothing for this user except bad news.')
      // }
    )

        // .then(() => {
        //     console.log("res");
        //     this.onIndusrtyChange();
        // })
        ;
      });
    },
    mounted() {
      console.log(this.company);
      if (this.$route.params.id) {
        this.title = 'Edit Company'
      } else this.title = 'New Company'
    }
  }
</script>
<style>
  .profile {
    max-width: 160px;
  }
</style>
