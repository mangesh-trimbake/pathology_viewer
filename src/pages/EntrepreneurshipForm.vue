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
                <img v-if="entrepreneurship.profile_image" class="profile" v-bind:src="entrepreneurship.avatar" />
              </v-flex>
              <v-flex md9 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>


                    <v-flex v-if="entrepreneurship.id" md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="id" label="id" hint="Entrepreneurship name is required" value="Input text" v-model="entrepreneurship.id"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <!-- <v-text-field name="username" label="User Name" hint="User name is required" value=""
                        class="input-group--focused" required></v-text-field> -->
                        <v-combobox
                          :items="entrepreneurship_master.users"
                          label="search user by email/username"
                          item-text="email"
                          item-value="user_id"
                          v-model="entrepreneurship.user"
                          @keyup.native="onUserSearch($event)"
                          return-object
                        ></v-combobox>
                    </v-flex>

                    <v-flex md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="user_id" label="user_id" hint="Entrepreneurship name is required" value="Input text" v-model="entrepreneurship.user_id"
                        class="input-group--focused" required></v-text-field>

                    </v-flex>



                    <v-flex md8 sm12 xs12  class="mx-1 px-0">
                      <!-- <v-text-field name="user_occupation_id" label="user_occupation_id" hint="Entrepreneurship name is required" value="Input text" v-model="entrepreneurship.user_occupation_id"
                        class="input-group--focused" required></v-text-field> -->
                        <v-autocomplete
                          name="user_occupation_id"
                          :items="entrepreneurship_master.user_occupations"
                          label="Select user_occupation_id"
                          item-text="disp_text"
                          item-value="id"
                          v-model="entrepreneurship.user_occupation_id"
                          height="auto"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="service_current_employer" label="service_current_employer" hint="Last name is required" value="Input text" v-model="entrepreneurship.service_current_employer"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="total_year_experience" label="total_year_experience" maxlength="10" hint="Last name is required" value="Input text" v-model="entrepreneurship.total_year_experience"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  xs12 class="mx-1 px-0">
                      <v-text-field name="organization_name" type="text" label="organization_name" value="Input text" v-model="entrepreneurship.organization_name"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field name="designation" type="text" label="designation" v-model="entrepreneurship.designation" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="period" type="text" label="period" v-model="entrepreneurship.period" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="responsibilities" type="text" label="responsibilities" v-model="entrepreneurship.responsibilities" class="input-group--focused" required></v-text-field>
                    </v-flex>


                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="professional_background_id" type="text" label="professional_background_id" v-model="entrepreneurship.professional_background_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="professional_background_id"
                        :items="entrepreneurship_master.professional_backgrounds"
                        label="Select professional_background_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="entrepreneurship.professional_background_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="total_investment_range_id" type="text" label="total_investment_range_id" v-model="entrepreneurship.total_investment_range_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="total_investment_range_id"
                        :items="entrepreneurship_master.total_investment_ranges"
                        label="Select total_investment_range_id"
                        item-text="description"
                        item-value="id"
                        v-model="entrepreneurship.total_investment_range_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="source_of_fund" type="text" label="source_of_fund" v-model="entrepreneurship.source_of_fund" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="own_capital" type="text" label="own_capital" v-model="entrepreneurship.own_capital" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="loans_financial_institutions" type="text" label="loans_financial_institutions" v-model="entrepreneurship.loans_financial_institutions" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="Other" type="text" label="Other" v-model="entrepreneurship.Other" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="interested_business_type_id" type="text" label="interested_business_type_id" v-model="entrepreneurship.interested_business_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="interested_business_type_id"
                        :items="entrepreneurship_master.interested_business_types"
                        label="Select interested_business_type_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="entrepreneurship.interested_business_type_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="interested_industry_id" type="text" label="interested_industry_id" v-model="entrepreneurship.interested_industry_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="interested_industry_id"
                        :items="entrepreneurship_master.interested_industries"
                        label="Select interested_industry_id"
                        item-text="name"
                        item-value="id"
                        v-model="entrepreneurship.interested_industry_id"
                        height="auto"
                        v-on:change="onIndusrtyChange"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="interested_sub_industries_id" type="text" label="interested_sub_industries_id" v-model="entrepreneurship.interested_sub_industries_id" class="input-group--focused" required></v-text-field> -->

                      <v-autocomplete
                        name="interested_sub_industries_id"
                        :items="entrepreneurship_master.interested_sub_industries"
                        label="Select interested sub industry"
                        item-text="name"
                        item-value="id"
                        v-model="entrepreneurship.interested_sub_industries_id"
                        height="auto"
                      ></v-autocomplete>

                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="time_frame_star_up" type="text" label="time_frame_star_up" v-model="entrepreneurship.time_frame_star_up" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="involvement_type_id" type="text" label="involvement_type_id" v-model="entrepreneurship.involvement_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="involvement_type_id"
                        :items="entrepreneurship_master.involvement_types"
                        label="Select involvement_type_id"
                        item-text="name"
                        item-value="id"
                        v-model="entrepreneurship.involvement_type_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="specify_other_source" type="text" label="specify_other_source" v-model="entrepreneurship.specify_other_source" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="already_property" type="text" label="already_property" v-model="entrepreneurship.already_property" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="site_in_mind" type="text" label="site_in_mind" v-model="entrepreneurship.site_in_mind" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="time_to_locate" type="text" label="time_to_locate" v-model="entrepreneurship.time_to_locate" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="nature_agreement" type="text" label="nature_agreement" v-model="entrepreneurship.nature_agreement" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="period_agreement" type="text" label="period_agreement" v-model="entrepreneurship.period_agreement" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="type_of_location" type="text" label="type_of_location" v-model="entrepreneurship.type_of_location" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="location_address" type="text" label="location_address" v-model="entrepreneurship.location_address" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="location_city" type="text" label="location_city" v-model="entrepreneurship.location_city" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="carpet_area_available" type="text" label="carpet_area_available" v-model="entrepreneurship.carpet_area_available" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="parking_area_available" type="text" label="parking_area_available" v-model="entrepreneurship.parking_area_available" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="expected_rental" type="text" label="expected_rental" v-model="entrepreneurship.expected_rental" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="frontage" type="text" label="frontage" v-model="entrepreneurship.frontage" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="deposit_amt" type="text" label="deposit_amt" v-model="entrepreneurship.deposit_amt" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="enterpre_opp_def_investment" type="text" label="enterpre_opp_def_investment" v-model="entrepreneurship.enterpre_opp_def_investment" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="enterpre_opp_def_risk" type="text" label="enterpre_opp_def_risk" v-model="entrepreneurship.enterpre_opp_def_risk" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="enterpre_opp_def_returns" type="text" label="enterpre_opp_def_returns" v-model="entrepreneurship.enterpre_opp_def_returns" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="expert_advice" type="text" label="expert_advice" v-model="entrepreneurship.expert_advice" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="enterpre_buss_profile" type="text" label="enterpre_buss_profile" v-model="entrepreneurship.enterpre_buss_profile" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="enterpre_loc_snap" type="text" label="enterpre_loc_snap" v-model="entrepreneurship.enterpre_loc_snap" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="entrepreneurship.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="created_at" type="text" label="created_at" v-model="entrepreneurship.created_at" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="entrepreneurship.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="updated_at" type="text" label="updated_at" v-model="entrepreneurship.updated_at" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="entrepreneurship.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="deleted_at" type="text" label="deleted_at" v-model="entrepreneurship.deleted_at" class="input-group--focused" required></v-text-field>
                    </v-flex>


                    <!-- <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="enterpre_loc_snap" type="text" label="enterpre_loc_snap" v-model="entrepreneurship.enterpre_loc_snap" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="enterpre_loc_snap" type="text" label="enterpre_loc_snap" v-model="entrepreneurship.enterpre_loc_snap" class="input-group--focused" required></v-text-field>
                    </v-flex>



                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field name="rewards" type="number" label="Rewards" hint="Number between 0 and 9999" v-bind:rules="rules.rewards"
                        v-model="entrepreneurship.rewards" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md6 sm12  class="mx-1 px-0">
                      <v-switch label="Membership" v-model="entrepreneurship.membership" light></v-switch>
                    </v-flex> -->


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
  import api from "@/utils/backend-api"
  export default {
    data() {
      return {
        title: '',
        rules: {
          rewards: [() => {
            if (this.entrepreneurship && (this.entrepreneurship.rewards < 0 || this.entrepreneurship.rewards > 9999)) {
              return 'Reward is required. It must be bewteen 0 and 9999'
            }
            return true;
          }],
          email: [() => {
            /* eslint-disable no-useless-escape */
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.entrepreneurship && !re.test(this.entrepreneurship.email)) return 'Email is invalid.'
            return true;
          }]
        },
        username: null,
      }
    },
    computed: {
      ...mapState('entrepreneurships', {
        orders: 'orders',
        entrepreneurship: 'entrepreneurship',
        entrepreneurship_master: 'entrepreneurship_master',
        loading: 'loading',
        mode: 'mode',
        snackbar: 'snackbar',
        notice: 'notice',
      }),
    },
    watch: {
      username: function(newValue, oldValue){
        if (newValue !== oldValue) {
          console.log(newValue);
          this.entrepreneurship.user_id = newValue.user_id
        }
      },
    },
    methods: {
      save() {
        const entrepreneurship = { ...this.entrepreneurship }
        // delete order.entrepreneurship
        console.log(entrepreneurship)
        Store.dispatch('entrepreneurships/saveEntrepreneurship', entrepreneurship)
          .then(() => {
            Store.dispatch("entrepreneurships/closeSnackBar", 2000)
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
        // xhr.open("POST", "http://localhost:8081/entrepreneurships/update/ADM18090000");
        // xhr.setRequestHeader("cache-control", "no-cache");
        // xhr.setRequestHeader("postman-token", "bfde718f-b2f4-43c4-3289-40f8906d1f96");
        //
        // xhr.send(data);



      },
      cancel() {
        this.$router.push({ name: 'Entrepreneurships' })
      },
      closeSnackbar() {
        Store.commit("entrepreneurships/setSnackbar", { snackbar: false });
        Store.commit("entrepreneurships/setNotice", { notice: "" });
      },

      onIndusrtyChange(){
        console.log(this.entrepreneurship.interested_industry_id);
        if (this.entrepreneurship.interested_industry_id) {
          this.$Progress.start();
          api
            .getData(
              "sub-industries?industry_id=" + this.entrepreneurship.interested_industry_id
            )
            .then(res => {
              // const deal_form = res.data.data.deal_form;
              console.log(res);
              console.log(res.data.success.data);
              // this.user_master.cities = res.data.success.data;
              console.log(this.entrepreneurship_master);

              this.$set(this.entrepreneurship_master, 'interested_sub_industries', res.data.success.data)
              Store.commit("companies/setLoading", { loading: false });
              this.$Progress.finish();
              console.log(this.entrepreneurship_master);
              console.log(this.entrepreneurship_master.interested_sub_industries);
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
              console.log(this.entrepreneurship_master);

              this.$set(this.entrepreneurship_master, 'users', res.data.success.data)
              Store.commit("companies/setLoading", { loading: false });
              this.$Progress.finish();
              console.log(this.entrepreneurship_master);
              console.log(this.entrepreneurship_master.users);
            });
        } else {
          // this.searchEmails = [];
        }
      }

    },
    created() {

      Store.dispatch('entrepreneurships/getEntrepreneurshipMasters', this.$route.params.id).then(() => {
        Store.dispatch('entrepreneurships/getEntrepreneurshipById', this.$route.params.id)
        .then(response => {
          this.entrepreneurship.user = this.entrepreneurship.user[0]
          this.onIndusrtyChange()
        })
      });
    },
    mounted() {
      console.log(this.entrepreneurship);
      if (this.$route.params.id) {
        this.title = 'Edit Entrepreneurship'
      } else this.title = 'New Entrepreneurship'
    }
  }
</script>
<style>
  .profile {
    max-width: 160px;
  }
</style>
