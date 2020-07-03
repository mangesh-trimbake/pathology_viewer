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
                <img v-if="opportunity.profile_image" class="profile" v-bind:src="opportunity.avatar" />
              </v-flex>
              <v-flex md9 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>


                    <v-flex v-if="opportunity.id" md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="id" label="id" hint="Opportunity name is required" value="" v-model="opportunity.id"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="title" label="title" hint="Opportunity name is required" value="" v-model="opportunity.title"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="brand_name" label="brand_name" maxlength="10" hint="Last name is required" value=""
                        class="input-group--focused" required></v-text-field> -->

                        <v-combobox
                          :items="opportunity_master.brands"
                          label="search brand by name"
                          item-text="brand_name"
                          item-value="id"
                          v-model="opportunity.brand"
                          @keyup.native="onBrandSearch($event)"
                          return-object
                        ></v-combobox>


                    </v-flex>
                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="brand_id" label="brand_id" hint="Last name is required" value="" v-model="opportunity.brand_id"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  xs12 class="mx-1 px-0">
                      <v-text-field name="other_brand_bop" type="text" label="other_brand_bop" value="Input text" v-model="opportunity.other_brand_bop"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <!-- <v-text-field name="involvement_type_id" type="text" label="involvement_type_id" v-model="opportunity.involvement_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="involvement_type_id"
                        :items="opportunity_master.involvement_types"
                        label="Select involvement_types"
                        item-text="name"
                        item-value="id"
                        v-model="opportunity.involvement_type_id"
                        height="auto"
                      ></v-autocomplete>

                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="total_investment_range_id" type="text" label="total_investment_range_id" v-model="opportunity.total_investment_range_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="total_investment_range_id"
                        :items="opportunity_master.total_investment_ranges"
                        label="Select total_investment_range"
                        item-text="description"
                        item-value="id"
                        v-model="opportunity.total_investment_range_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="total_investment_amt" type="text" label="total_investment_amt" v-model="opportunity.total_investment_amt" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="association_fee_type_id" type="text" label="association_fee_type_id" v-model="opportunity.association_fee_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="association_fee_type_id"
                        :items="opportunity_master.association_fee_types"
                        label="Select association_fee_type_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.association_fee_type_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="association_fee_range_id" type="text" label="association_fee_range_id" v-model="opportunity.association_fee_range_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="association_fee_range_id"
                        :items="opportunity_master.association_fee_ranges"
                        label="Select association_fee_range_id"
                        item-text="description"
                        item-value="id"
                        v-model="opportunity.association_fee_range_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="association_fee_amt" type="text" label="association_fee_amt" v-model="opportunity.association_fee_amt" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="area_required_range_id" type="text" label="area_required_range_id" v-model="opportunity.area_required_range_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="area_required_range_id"
                        :items="opportunity_master.area_required_ranges"
                        label="Select area_required_range_id"
                        item-text="description"
                        item-value="id"
                        v-model="opportunity.area_required_range_id"
                        height="auto"
                      ></v-autocomplete>

                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="area_type_id" type="text" label="area_type_id" v-model="opportunity.area_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="area_type_id"
                        :items="opportunity_master.area_types"
                        label="Select area_type_id"
                        item-text="name"
                        item-value="id"
                        v-model="opportunity.area_type_id"
                        height="auto"
                      ></v-autocomplete>

                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="fit_out_cost_range_id" type="text" label="fit_out_cost_range_id" v-model="opportunity.fit_out_cost_range_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="fit_out_cost_range_id"
                        :items="opportunity_master.fit_out_cost_ranges"
                        label="Select fit_out_cost_range_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.fit_out_cost_range_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="monthly_operational_expenses" type="text" label="monthly_operational_expenses" v-model="opportunity.monthly_operational_expenses" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="min_guarantee" type="text" label="min_guarantee" v-model="opportunity.min_guarantee" class="input-group--focused" required></v-text-field> -->
                      <v-flex md6 sm12  class="mx-1 px-0">
                        <v-switch
                        label="min_guarantee"
                        v-model="opportunity.min_guarantee"
                        :true-value="1"
                        :false-value="0"
                        light>
                      </v-switch>
                      </v-flex>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="financial_ast" type="text" label="financial_ast" v-model="opportunity.financial_ast" class="input-group--focused" required></v-text-field> -->
                      <v-flex md6 sm12  class="mx-1 px-0">
                        <v-switch label="financial_ast"
                        v-model="opportunity.financial_ast"
                        :true-value="1"
                        :false-value="0"
                        light>
                      </v-switch>
                      </v-flex>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="man_power_assit_id" type="text" label="man_power_assit_id" v-model="opportunity.man_power_assit_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="fit_out_cost_range_id"
                        :items="opportunity_master.man_power_assits"
                        label="Select man_power_assit_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.man_power_assit_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="lock_in_period" type="text" label="lock_in_period" v-model="opportunity.lock_in_period" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="training_id" type="text" label="training_id" v-model="opportunity.training_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="training_id"
                        :items="opportunity_master.trainings"
                        label="Select training_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.training_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="software_training" type="text" label="software_training" v-model="opportunity.software_training" class="input-group--focused" required></v-text-field> -->
                      <v-flex md6 sm12  class="mx-1 px-0">
                        <v-switch label="software_training"
                        v-model="opportunity.software_training"
                        :true-value="1"
                        :false-value="0"
                        light>
                      </v-switch>
                      </v-flex>

                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="exclusive_territorial" type="text" label="exclusive_territorial" v-model="opportunity.exclusive_territorial" class="input-group--focused" required></v-text-field> -->
                      <v-flex md6 sm12  class="mx-1 px-0">
                        <v-switch label="exclusive_territorial"
                        v-model="opportunity.exclusive_territorial"
                        :true-value="1"
                        :false-value="0"
                        light>
                      </v-switch>
                      </v-flex>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="roi_level_id" type="text" label="roi_level_id" v-model="opportunity.roi_level_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="roi_level_id"
                        :items="opportunity_master.roi_levels"
                        label="Select roi_level_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.roi_level_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="bep" type="text" label="bep" v-model="opportunity.bep" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="investment" type="text" label="investment" v-model="opportunity.investment" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="risk_level_id" type="text" label="risk_level_id" v-model="opportunity.risk_level_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="risk_level_id"
                        :items="opportunity_master.risk_levels"
                        label="Select risk_level_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.risk_level_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="return_amt" type="text" label="return_amt" v-model="opportunity.return_amt" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="return_type_id" type="text" label="return_type_id" v-model="opportunity.return_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="return_type_id"
                        :items="opportunity_master.return_types"
                        label="Select return_type_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.return_type_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="industry_type_id" type="text" label="industry_type_id" v-model="opportunity.industry_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="industry_type_id"
                        :items="opportunity_master.industry_types"
                        label="Select industry_type_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.industry_type_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="product_merchandise_type_id" type="text" label="product_merchandise_type_id" v-model="opportunity.product_merchandise_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="product_merchandise_type_id"
                        :items="opportunity_master.product_merchandise_types"
                        label="Select product_merchandise_type_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.product_merchandise_type_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="product_margin" type="text" label="product_margin" v-model="opportunity.product_margin" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="deposit" type="text" label="deposit" v-model="opportunity.deposit" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="stock_amt" type="text" label="stock_amt" v-model="opportunity.stock_amt" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="service_royalty_type_id" type="text" label="service_royalty_type_id" v-model="opportunity.service_royalty_type_id" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        name="service_royalty_type_id"
                        :items="opportunity_master.service_royalty_types"
                        label="Select service_royalty_type_id"
                        item-text="disp_text"
                        item-value="id"
                        v-model="opportunity.service_royalty_type_id"
                        height="auto"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="royalty_base" type="text" label="royalty_base" v-model="opportunity.royalty_base" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="royalty_amt" type="text" label="royalty_amt" v-model="opportunity.royalty_amt" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="appt_enterpreneur" type="text" label="appt_enterpreneur" v-model="opportunity.appt_enterpreneur" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="appt_entreprenuer_other" type="text" label="appt_entreprenuer_other" v-model="opportunity.appt_entreprenuer_other" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="exp_no_outlet" type="text" label="exp_no_outlet" v-model="opportunity.exp_no_outlet" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="opportunity.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="published_at" type="text" label="published_at" v-model="opportunity.published_at" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="opportunity.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="created_at" type="text" label="created_at" v-model="opportunity.created_at" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="opportunity.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="updated_at" type="text" label="updated_at" v-model="opportunity.updated_at" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex v-if="opportunity.id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="deleted_at" type="text" label="deleted_at" v-model="opportunity.deleted_at" class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <!-- <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="risk_level_id" type="text" label="risk_level_id" v-model="opportunity.risk_level_id" class="input-group--focused" required></v-text-field>
                    </v-flex> -->


                    <!-- <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field name="rewards" type="number" label="Rewards" hint="Number between 0 and 9999" v-bind:rules="rules.rewards"
                        v-model="opportunity.rewards" class="input-group--focused" required></v-text-field>
                    </v-flex> -->


                    <v-flex md6 sm12  class="mx-1 px-0">
                      <v-switch label="published"
                      v-model="opportunity.published"
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
        title: '',
        rules: {
          rewards: [() => {
            if (this.opportunity && (this.opportunity.rewards < 0 || this.opportunity.rewards > 9999)) {
              return 'Reward is required. It must be bewteen 0 and 9999'
            }
            return true;
          }],
          email: [() => {
            /* eslint-disable no-useless-escape */
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.opportunity && !re.test(this.opportunity.email)) return 'Email is invalid.'
            return true;
          }]
        },
        brand: null,
      }
    },
    computed: {
      ...mapState('opportunities', {
        orders: 'orders',
        opportunity: 'opportunity',
        opportunity_master: 'opportunity_master',
        loading: 'loading',
        mode: 'mode',
        snackbar: 'snackbar',
        notice: 'notice',

      }),
    },
    watch: {
      brand: function(newValue, oldValue){
        if (newValue !== oldValue) {
          console.log(newValue);
          this.opportunity.brand_id = newValue.id
        }
      },
    },
    methods: {
      save() {
        const opportunity = { ...this.opportunity }
        // delete order.opportunity
        console.log(opportunity)
        Store.dispatch('opportunities/saveOpportunity', opportunity)
          .then(() => {
            Store.dispatch("opportunities/closeSnackBar", 2000)
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
        // xhr.open("POST", "http://localhost:8081/opportunities/update/ADM18090000");
        // xhr.setRequestHeader("cache-control", "no-cache");
        // xhr.setRequestHeader("postman-token", "bfde718f-b2f4-43c4-3289-40f8906d1f96");
        //
        // xhr.send(data);



      },
      cancel() {
        this.$router.push({ name: 'Opportunities' })
      },
      closeSnackbar() {
        Store.commit("opportunities/setSnackbar", { snackbar: false });
        Store.commit("opportunities/setNotice", { notice: "" });
      },

      onBrandSearch(event){
        console.log(event);
        if (event.target.value) {
          this.$Progress.start();
          api
            .getData(
              "brands?name=" + event.target.value
            )
            .then(res => {
              // const deal_form = res.data.data.deal_form;
              console.log(res);
              console.log(res.data.success.data);
              // this.user_master.cities = res.data.success.data;
              console.log(this.opportunity_master);

              this.$set(this.opportunity_master, 'brands', res.data.success.data)
              Store.commit("opportunities/setLoading", { loading: false });
              this.$Progress.finish();
              console.log(this.opportunity_master);
              console.log(this.opportunity_master.brands);
            });
        } else {
          // this.searchEmails = [];
        }
      },


    },
    created() {

      Store.dispatch('opportunities/getOpportunityMasters', this.$route.params.id).then(() => {
        Store.dispatch('opportunities/getOpportunityById', this.$route.params.id)
        .then(response => {
          this.opportunity.brand = this.opportunity.brand[0]
          this.opportunity.published = (this.opportunity.published_at != null) ? 1 : 0
        })
      });
    },
    mounted() {
      console.log(this.opportunity);
      if (this.$route.params.id) {
        this.title = 'Edit Opportunity'
      } else this.title = 'New Opportunity'
    }
  }
</script>
<style>
  .profile {
    max-width: 160px;
  }
</style>
