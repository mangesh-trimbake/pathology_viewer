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
                <img v-if="user.profile_image" class="profile" v-bind:src="user.avatar" />
              </v-flex>
              <v-flex md9 sm12>
                <form autocomplete="off">
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>

                    <v-flex v-if="user.user_id" md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="user_id" label="User Id" hint="User name is required" value="Input text" v-model="user.user_id"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md8 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="username" label="User Name" hint="User name is required" value="Input text" v-model="user.username"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="user_type_code" type="text" label="User Type Code" v-model="user.user_type_code" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        :items="user_master.user_types"
                        label="Select User Type"
                        item-text="user_type"
                        item-value="user_type_code"
                        v-model="user.user_type_code"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="firstName" label="First Name" hint="Last name is required" value="Input text" v-model="user.first_name"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="lastName" label="Last Name" maxlength="10" hint="Last name is required" value="Input text" v-model="user.last_name"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  xs12 class="mx-1 px-0">
                      <v-text-field name="email" type="email" label="Email" value="Input text" v-model="user.email" v-bind:rules="rules.email"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex v-if="user.user_id" md4 sm12  xs12 class="mx-1 px-0">
                      <v-text-field name="email_verified_at" type="email" label="email_verified_at" value="Input text" v-model="user.email_verified_at" v-bind:rules="rules.email"
                        class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field name="mobile" type="text" label="Mobile" v-model="user.mobile_no" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12  class="mx-1 px-0">
                      <v-text-field name="mobile_no_other" type="text" label="Another Mobile" v-model="user.mobile_no_other" class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex v-if="user.user_id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="mobile_no_verified_at" type="text" label="mobile_no_verified_at" v-model="user.mobile_no_verified_at" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="date_of_birth" type="text" label="date_of_birth" v-model="user.date_of_birth" class="input-group--focused" required></v-text-field> -->

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
                          v-model="user.date_of_birth"
                          label="pick date_of_birth"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="user.date_of_birth" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>

                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="gender" type="text" label="gender" v-model="user.gender" class="input-group--focused" required></v-text-field> -->
                      <v-autocomplete
                        :items="user_master.genders"
                        label="Select gender"
                        item-text="disp_text"
                        item-value="id"
                        v-model="user.gender"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 sm12  class="mx-1 px-0">
                      <!-- <v-text-field name="city_id" type="text" label="city_id" v-model="user.city_id" class="input-group--focused" required></v-text-field> -->

                      <v-combobox
                        :items="user_master.cities"
                        label="Select City"
                        item-text="name"
                        item-value="id"
                        v-model="user.city"
                        @keyup.native="onCitySearch($event)"
                        return-object
                      ></v-combobox>

                    </v-flex>

                    <v-flex v-if="user.user_id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="google_id" type="text" label="google_id" v-model="user.google_id" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>


                    <v-flex v-if="user.user_id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="linkedin_id" type="text" label="linkedin_id" v-model="user.linkedin_id" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>


                    <v-flex v-if="user.user_id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="password_token" type="text" label="password_token" v-model="user.password_token" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>


                    <v-flex v-if="user.user_id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="created_at" type="text" label="created_at" v-model="user.created_at" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>

                    <v-flex v-if="user.user_id" md4 sm12  class="mx-1 px-0">
                      <v-text-field name="updated_at" type="text" label="updated_at" v-model="user.updated_at" class="input-group--focused" :disabled="true" ></v-text-field>
                    </v-flex>

                    <!-- <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field name="rewards" type="number" label="Rewards" hint="Number between 0 and 9999" v-bind:rules="rules.rewards"
                        v-model="user.rewards" class="input-group--focused" required></v-text-field>
                    </v-flex> -->


                    <v-flex md6 sm12  class="mx-1 px-0">
                      <v-switch
                        label="Active"
                        v-model="user.active"
                        :true-value="1"
                        :false-value="0"
                        light>
                      </v-switch>
                    </v-flex>

                  </v-layout>
                </v-container>
              </form>
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
        searchEmails: null,
        components: [
          'Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields',
        ],
        title: '',
        rules: {
          rewards: [() => {
            if (this.user && (this.user.rewards < 0 || this.user.rewards > 9999)) {
              return 'Reward is required. It must be bewteen 0 and 9999'
            }
            return true;
          }],
          email: [() => {
            /* eslint-disable no-useless-escape */
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.user && !re.test(this.user.email)) return 'Email is invalid.'
            return true;
          }]
        },
        date: new Date().toISOString().substr(0, 10),
        modal: false,
      }
    },
    computed: {
      ...mapState('users', {
        orders: 'orders',
        user: 'user',
        user_master: 'user_master',
        loading: 'loading',
        mode: 'mode',
        snackbar: 'snackbar',
        notice: 'notice',
      }),
    },
    watch: {
      user: function(newValue, oldValue){
        console.log(oldValue);
        console.log(newValue);
      },
    },
    methods: {
      save() {
        const user = { ...this.user }
        // delete order.user
        // user.city_id
        console.log(user.city.id, user.city.name)
        user.city_id = user.city.id
        Store.dispatch('users/saveUser', user)
          .then(() => {
            Store.dispatch("users/closeSnackBar", 2000)
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
        // xhr.open("POST", "http://localhost:8081/users/update/ADM18090000");
        // xhr.setRequestHeader("cache-control", "no-cache");
        // xhr.setRequestHeader("postman-token", "bfde718f-b2f4-43c4-3289-40f8906d1f96");
        //
        // xhr.send(data);



      },
      cancel() {
        this.$router.push({ name: 'Users' })
      },
      closeSnackbar() {
        Store.commit("users/setSnackbar", { snackbar: false });
        Store.commit("users/setNotice", { notice: "" });
      },

      onCitySearch(event){
        console.log(event);
        if (event.target.value) {
          this.searchEmails = [];
          this.$Progress.start();
          api
            .getData(
              "cities?name=" + event.target.value
            )
            .then(res => {
              // const deal_form = res.data.data.deal_form;
              console.log(res);
              console.log(res.data.success.data);
              // this.user_master.cities = res.data.success.data;
              console.log(this.user_master);
              // this.user_master.cities = []
              // Object.assign(this.user_master.cities, res.data.success.data)
              this.searchEmails = res.data.success.data
              // commit('setDealForm', deal_form);
              this.$set(this.user_master, 'cities', res.data.success.data)
              Store.commit("users/setLoading", { loading: false });
              this.$Progress.finish();
              console.log(this.user_master);
              console.log(this.user_master.cities);
            });
      } else {
        // this.searchEmails = [];
      }
      },
    },
    created() {
      Store.dispatch('users/getUserMasters', this.$route.params.id).then(res => {
        console.log("masters", this.user_master);
        // Store.dispatch('users/getUserById', this.$route.params.id).then(() => {
        //   // this.$set(this.user_master, 'cities', this.user.city)
        //   // console.log(this.user.city);
        //   // console.log(this.user_master);
        // });

        Store.dispatch('users/getUserById', this.$route.params.id)

      });



      // Store.dispatch('users/getUserById', this.$route.params.id)
      // Store.dispatch('users/getUserById', this.$route.params.id).then(() => {
      //
      //   Store.dispatch('users/getUserMasters', this.$route.params.id)
      //
      // });
      // var self = this;
      // let promise = new Promise(function(resolve, reject) {
      //   console.log('start');
      //   // Store.dispatch('users/getUserMasters', self.$route.params.id);
      //   console.log('promise resolveing');
      //   resolve(Store.dispatch('users/getUserMasters', self.$route.params.id));
      // });
      //
      // promise.then(function() {
      //   console.log("after fisrt promise");
      //   console.log("masters", self.user_master);
      //   Store.dispatch('users/getUserById', self.$route.params.id);
      //   console.log('done');
      //
      // });

    },
    mounted() {
      console.log(this.user);
      if (this.$route.params.id) {
        this.title = 'Edit User'
      } else this.title = 'New User'
    }
  }
</script>
<style>
  .profile {
    max-width: 160px;
  }
</style>
