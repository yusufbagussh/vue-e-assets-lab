<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>List Items</h4>
              <form class="card-tools p-2 mt-1" @input="getResult">
                <div class="input-group input-group-sm">
                  <input
                    class="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    v-model="search"
                  />
                </div>
              </form>
              <div class="card-header-action">
                <router-link to="/addlocation" class="btn btn-primary"
                  >Tambah Ruang</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Lokasi Penyimpanan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(location, index) in locations" :key="index">
                      <td>{{ location.lokasi_nama }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditLocation',
                            params: { id: location.lokasi_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="locationDelete(location.lokasi_id)"
                          class="btn btn-danger btn-action"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card">
              <div class="card-footer">
                <div class="row ml-sm-1">
                  <select
                    class="custom-select col-1 mr-2"
                    style="width: 10; height: 5%"
                    v-model="paginate"
                    @change="getResult"
                  >
                    <option selected>Choose...</option>
                    <option value="2">2</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="all">All</option>
                  </select>
                  <paginate
                    v-model="current_page"
                    :page-count="last_page"
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="myCallback"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                    :first-last-button="true"
                    :first-button-text="'First'"
                    :last-button-text="'Last'"
                  >
                  </paginate>
                </div>
                <div>showing {{ from }} to {{ to }} of {{ total }} entries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Paginate from "vuejs-paginate-next";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// export default {
//   setup() {
//     //reactive state
//     let locations = ref([]);

//     //mounted
//     onMounted(() => {
//       //get API from Laravel Backend
//       axios
//         .get("http://localhost:8000/api/location")
//         .then((response) => {
//           //assign state locations with response data
//           console.log(response);
//           locations.value = response.data.data.data;
//           console.log(locations);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });

//     function locationDelete(id) {
//       //delete data post by ID
//       axios
//         .delete(`http://localhost:8000/api/location/${id}`)
//         .then(() => {
//           //splice posts
//           locations.value.splice(locations.value.indexOf(id), 1);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     }

//     //return
//     return {
//       locations,
//       locationDelete,
//     };
//   },
// };

export default {
  name: "Borrower",
  components: {
    Paginate,
    Datepicker,
  },
  data() {
    return {
      locations: [],
      paginate: "2",
      search: "",

      from: "",
      to: "",
      total: "",

      page: 1,

      current_page: null,
      last_page: null,

      sortBy: "",
      typeBy: "",
      sortOrder: "",

      date: null,

      token: localStorage.getItem("token"),
      loggedIn: localStorage.getItem("loggedIn"),
    };
  },
  created() {
    // this.getItem();
    this.getResult();
  },
  methods: {
    sortTable(sortBy) {
      console.log(sortBy);
      this.sortBy = sortBy;
      this.typeBy = !this.typeBy;
      if (this.typeBy) {
        this.sortOrder = "ASC";
      } else {
        this.sortOrder = "DESC";
      }
      axios
        .get(
          `http://localhost:8000/api/location?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.locations = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    myCallback() {
      // console.log(this.date);
      axios
        .get(
          `http://localhost:8000/api/location?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.locations = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    getResult() {
      axios
        .get(
          `http://localhost:8000/api/location?paginate=${this.paginate}&search=${this.search}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          // console.log(response);
          this.locations = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    async locationDelete(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          // Send request to the server
          if (result.value) {
            axios
              .delete(`api/location/${id}`, {
                headers: { Authorization: "Bearer " + this.token },
              })
              .then(() => {
                this.$swal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                this.getResult();
              })
              .catch((data) => {
                this.$swal.fire("Failed!", data.message, "warning");
              });
          }
        });
    },
  },
  mounted() {
    if (!this.loggedIn) {
      return this.$router.push({ name: "Login" });
    }
  },
};
</script>
