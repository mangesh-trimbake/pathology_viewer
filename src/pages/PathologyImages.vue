  <template>
    <v-container fluid>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <span class="title">PathologyImages {{pagination? "("+pagination.totalItems+")": ""}}
              <v-text-field v-if="false" append-icon="search" label="Quick Search" single-line hide-details v-model="quickSearch"></v-text-field>
            </span>
            <v-spacer></v-spacer>
            <v-btn v-if="false" lass="blue-grey" fab small dark @click.native.stop="rightDrawer = !rightDrawer">
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn v-if="false" class="brown lighten-1" fab small dark @click.native="reloadData()">
              <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn v-if="false" class="teal darken-2" fab small dark @click.native="print()">
              <v-icon>print</v-icon>
            </v-btn>
            <v-btn v-if="false" class="deep-orange darken-3" fab small dark @click.native="add">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-title>
          <v-flex md12>
          <div row>
            <!-- <div md3>
              <h3>files</h3>
            </div> -->
            <div md12>

              <div style="padding:15px;margin:15px">
                <label for="sel1">Select Image from list:</label>
                  <select class="form-control" id="filelist">
                    <option>select</option>

                  </select>
              </div>

              <div id="view" style="width: 500px;height: 500px;margin: 0px;padding: 15px;"></div>
            </div>
          </div>
        </v-flex >


          <Table v-if="loading===false" :headers="headers" :items="items"  :pagination="pagination" @edit="edit" @remove="remove"></Table>
        </v-card>
      </v-flex>

      <search-panel v-if="1==0" :rightDrawer="rightDrawer" @cancelSearch="cancelSearch" @searchData="searchPathologyImages">
        <v-layout row>
          <v-flex xs11 offset-xs1>
            <v-text-field name="pathologyImageName" label="PathologyImage" light v-model="searchVm.contains.pathologyImageName"></v-text-field>
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
import $ from 'jquery';
// import "@/assets/js/openseadragon.js";
// require("@/assets/js/openseadragon.js");
// import OpenSeadragon from "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/2.4.2/openseadragon.min.js"
export default {
  components: {
    Table,
    SearchPanel,
    ConfirmDialog
  },

  data () {
    return {
      dialog: false,
      dialogTitle: "PathologyImage Delete Dialog",
      dialogText: "Do you want to delete this pathologyImage?",
      rightDrawer: false,
      right: true,
      search: "",
      headers: [
        { text: "PathologyImage Id", left: true, value: "pathologyImage_id" },
        // { text: "Category", value: "category.categoryName" },
        { text: "Email", value: "email" },
        { text: "Mobile No.", value: "mobile_no" }
      ],
      searchVm: {
        contains: {
          pathologyImageName: "",
          category: ""
        },
        between: {
          unitPrice: {
            former: 0,
            latter: 0
          }
        }
      },
      pathologyImageId: "",
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
        name: "PathologyImage",
        params: { id: item.pathologyImage_id }
      });
    },
    add () {
      console.log("add btn clicked");
      this.$router.push("/pathologyImages/add");
    },
    remove (item) {
      this.pathologyImageId = item.id;
      this.dialog = true;
    },
    onConfirm () {
      // Store.dispatch(
      //   "pathologyImages/deletePathologyImage",
      //   this.pathologyImageId,
      // ).then(() => {
      //   Store.dispatch("pathologyImages/searchPathologyImages", this.query, this.pagination);
      //   Store.dispatch("pathologyImages/closeSnackBar", 2000);
      // });
      this.dialog = false;
    },
    onCancel () {
      this.pathologyImageId = "";
      this.dialog = false;
    },
    searchPathologyImages () {
      this.rightDrawer = !this.rightDrawer;
      this.appUtil.buildSearchFilters(this.searchVm);
      this.query = this.appUtil.buildJsonServerQuery(this.searchVm);
      this.quickSearch = "";
      Store.dispatch("pathologyImages/searchPathologyImages", this.query, this.pagination);
    },
    reloadData () {
      this.query = "";
      this.quickSearch = "";
      Store.dispatch("pathologyImages/getAllPathologyImages");
    },
    cancelSearch () {
      this.rightDrawer = false;
    },
    closeSnackbar () {
      Store.commit("pathologyImages/setSnackbar", { snackbar: false });
      Store.commit("pathologyImages/setNotice", { notice: "" });
    },
    quickSearchPathologyImages: debounce(function () {
      console.log(this.quickSearchFilter)
      this.quickSearchFilter && Store.dispatch("pathologyImages/quickSearch",
       { headers: this.headers,
         qsFilter: this.quickSearchFilter.toLowerCase(),
         pagination: this.pagination });
    }, 300),
  },
  computed: {
    ...mapState("pathologyImages", {
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
        this.quickSearchFilter && this.quickSearchPathologyImages();
      }
    }
  },
  created () {
    Store.dispatch("pathologyImages/getAllPathologyImages");
    // if (document.getElementById('my-datatable')) return; // was already loaded
    // var scriptTag = document.createElement("script");
    // scriptTag.src = "/assets/js/openseadragon.js";
    // scriptTag.id = "my-datatable";
    // document.getElementsByTagName('head')[0].appendChild(scriptTag);
    // $(document).ready(function() {
    //     var viewer = new OpenSeadragon({
    //         id: "view",
    //         tileSources: "http://localhost:5000//CMU-1.tiff.dzi",
    //         prefixUrl: "assets/images/",
    //         showNavigator: true,
    //         showRotationControl: true,
    //         animationTime: 0.5,
    //         blendTime: 0.1,
    //         constrainDuringPan: true,
    //         maxZoomPixelRatio: 2,
    //         minZoomLevel: 1,
    //         visibilityRatio: 1,
    //         zoomPerScroll: 2,
    //         timeout: 120000,
    //     });
    //     viewer.addHandler("open", function() {
    //         // To improve load times, ignore the lowest-resolution Deep Zoom
    //         // levels.  This is a hack: we can't configure the minLevel via
    //         // OpenSeadragon configuration options when the viewer is created
    //         // from DZI XML.
    //         viewer.source.minLevel = 8;
    //     });
    //
    //     var mpp = parseFloat("{{ slide_mpp }}");
    //     viewer.scalebar({
    //         pixelsPerMeter: mpp ? (1e6 / mpp) : 0,
    //         xOffset: 10,
    //         yOffset: 10,
    //         barThickness: 3,
    //         color: '#555555',
    //         fontColor: '#333333',
    //         backgroundColor: 'rgba(255, 255, 255, 0.5)',
    //     });
    //     console.log("jq");
    // });
  },

  mounted () {
    this.$nextTick(() => {console.log(this.headers);});


    // if (document.getElementById('my-datatable')) return; // was already loaded
    // var scriptTag = document.createElement("script");
    // scriptTag.src = "/assets/js/openseadragon.js";
    // scriptTag.id = "my-datatable";
    // document.getElementsByTagName('head')[0].appendChild(scriptTag);

      if (document.getElementById('my-datatable1')) return; // was already loaded
      var scriptTag1 = document.createElement("script");
      scriptTag1.src = "/assets/js/staticapp.js";
      scriptTag1.id = "my-datatable1";
      document.getElementsByTagName('head')[0].appendChild(scriptTag1);

      $(document).ready(function() {
          // var viewer = new OpenSeadragon({
          //     id: "view",
          //     tileSources: "http://localhost:5000//CMU-1.tiff.dzi",
          //     prefixUrl: "assets/images/",
          //     showNavigator: true,
          //     showRotationControl: true,
          //     animationTime: 0.5,
          //     blendTime: 0.1,
          //     constrainDuringPan: true,
          //     maxZoomPixelRatio: 2,
          //     minZoomLevel: 1,
          //     visibilityRatio: 1,
          //     zoomPerScroll: 2,
          //     timeout: 120000,
          // });
          // viewer.addHandler("open", function() {
          //     // To improve load times, ignore the lowest-resolution Deep Zoom
          //     // levels.  This is a hack: we can't configure the minLevel via
          //     // OpenSeadragon configuration options when the viewer is created
          //     // from DZI XML.
          //     viewer.source.minLevel = 8;
          // });
          //
          // var mpp = parseFloat("{{ slide_mpp }}");
          // viewer.scalebar({
          //     pixelsPerMeter: mpp ? (1e6 / mpp) : 0,
          //     xOffset: 10,
          //     yOffset: 10,
          //     barThickness: 3,
          //     color: '#555555',
          //     fontColor: '#333333',
          //     backgroundColor: 'rgba(255, 255, 255, 0.5)',
          // });
          console.log("jq");
      });

  }
};
</script>
