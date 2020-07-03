  <template>
    <v-container fluid>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <span class="title">Opportunities {{pagination? "("+pagination.totalItems+")": ""}}
              <v-text-field append-icon="search" label="Quick Search" single-line hide-details v-model="quickSearch"></v-text-field>
            </span>
            <v-spacer></v-spacer>
            <v-btn class="blue-grey" fab small dark @click.native.stop="rightDrawer = !rightDrawer">
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn class="brown lighten-1" fab small dark @click.native="reloadData()">
              <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn class="teal darken-2" fab small dark @click.native="print()">
              <v-icon>print</v-icon>
            </v-btn>
            <v-btn class="deep-orange darken-3" fab small dark @click.native="add">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-title>
          <Table v-if="loading===false" :headers="headers" :items="items"  :pagination="pagination" @edit="edit" @remove="remove"></Table>
        </v-card>
      </v-flex>
      <search-panel :rightDrawer="rightDrawer" @cancelSearch="cancelSearch" @searchData="searchOpportunities">
        <v-layout row>
          <v-flex xs11 offset-xs1>
            <v-text-field name="opportunityName" label="Opportunity" light v-model="searchVm.contains.opportunityName"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs11 offset-xs1>
            <label class="heading text-sm-central" light>Price Range</label>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8 offset-xs1>
            <v-slider class="text-xs-central" label="Price 1" light v-bind:max="100" v-model="searchVm.between.unitPrice.former"></v-slider>
          </v-flex>
          <v-flex xs3>
              <v-text-field type="number" light v-model="searchVm.between.unitPrice.former"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8 offset-xs1>
            <v-slider class="text-xs-central" label="Price 2" light v-bind:max="999" v-model="searchVm.between.unitPrice.latter"></v-slider>
          </v-flex>
          <v-flex xs3>
              <v-text-field type="number" light v-model="searchVm.between.unitPrice.latter"></v-text-field>
            </v-flex>
        </v-layout>
      </search-panel>
      <confirm-dialog :dialog="dialog" :dialogTitle="dialogTitle" :dialogText="dialogText" @onConfirm="onConfirm" @onCancel="onCancel" ></confirm-dialog>
      <v-snackbar v-if="loading===false" :right="true" :timeout="timeout" :color="mode" v-model="snackbar" >
      {{ notice }}
      <v-btn dark flat @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
    </v-container>
  </template>
  <script>
/* globals Store */
import Table from "@/components/Table.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { mapState } from "vuex";
import { debounce } from "lodash";

export default {
  components: {
    Table,
    SearchPanel,
    ConfirmDialog
  },
  data () {
    return {
      dialog: false,
      dialogTitle: "Opportunity Delete Dialog",
      dialogText: "Do you want to delete this opportunity?",
      rightDrawer: false,
      right: true,
      search: "",
      headers: [
        { text: "Opportunity Id", left: true, value: "id" },
        // { text: "Category", value: "category.categoryName" },
        { text: "Title", value: "title" },
        { text: "Brand Id", value: "brand_id" }
      ],
      searchVm: {
        contains: {
          opportunityName: "",
          category: ""
        },
        between: {
          unitPrice: {
            former: 0,
            latter: 0
          }
        }
      },
      opportunityId: "",
      query: "",
      snackbarStatus: false,
      timeout: 2000,
      color: "",
      quickSearchFilter: "",
    };
  },
  methods: {
    print () {
      window.print();
    },
    edit (item) {
      console.log("edit btn clicked");
      this.$router.push({
        name: "Opportunity",
        params: { id: item.id }
      });
    },
    add () {
      console.log("add btn clicked");
      this.$router.push("/opportunities/add");
    },
    remove (item) {
      this.opportunityId = item.id;
      this.dialog = true;
    },
    onConfirm () {
      // Store.dispatch(
      //   "opportunities/deleteOpportunity",
      //   this.opportunityId,
      // ).then(() => {
      //   Store.dispatch("opportunities/searchOpportunities", this.query, this.pagination);
      //   Store.dispatch("opportunities/closeSnackBar", 2000);
      // });
      this.dialog = false;
    },
    onCancel () {
      this.opportunityId = "";
      this.dialog = false;
    },
    searchOpportunities () {
      this.rightDrawer = !this.rightDrawer;
      this.appUtil.buildSearchFilters(this.searchVm);
      this.query = this.appUtil.buildJsonServerQuery(this.searchVm);
      this.quickSearch = "";
      Store.dispatch("opportunities/searchOpportunities", this.query, this.pagination);
    },
    reloadData () {
      this.query = "";
      this.quickSearch = "";
      Store.dispatch("opportunities/getAllOpportunities");
    },
    cancelSearch () {
      this.rightDrawer = false;
    },
    closeSnackbar () {
      Store.commit("opportunities/setSnackbar", { snackbar: false });
      Store.commit("opportunities/setNotice", { notice: "" });
    },
    quickSearchOpportunities: debounce(function () {
      console.log(this.quickSearchFilter)
      this.quickSearchFilter && Store.dispatch("opportunities/quickSearch",
       { headers: this.headers,
         qsFilter: this.quickSearchFilter.toLowerCase(),
         pagination: this.pagination });
    }, 300),
  },
  computed: {
    ...mapState("opportunities", {
      items: "items",
      pagination: "pagination",
      loading: "loading",
      mode: "mode",
      snackbar: "snackbar",
      notice: "notice"
    }),
    quickSearch: {
      get: function () {
        return this.quickSearchFilter;
      },
      set: function ( val ) {
        this.quickSearchFilter = val;
        this.quickSearchFilter && this.quickSearchOpportunities();
      }
    }
  },
  created () {
    Store.dispatch("opportunities/getAllOpportunities");
  },
  mounted () {
    this.$nextTick(() => {console.log(this.headers);});
  }
};
</script>
