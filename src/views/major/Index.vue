<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>Daftar Jurusan</h4>
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
                <router-link to="/addmajor" class="btn btn-primary"
                  >Tambah Jurusan</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Jurusan</th>
                      <th>Fakultas</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(major, index) in majors" :key="index">
                      <td>{{ major.jurusan_nama }}</td>
                      <td>{{ major.jurusan_fakultas }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditMajor',
                            params: { id: major.jurusan_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="majorDelete(major.jurusan_id)"
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
                    <option value="5">5</option>
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

export default {
  name: "Major",
  components: {
    Paginate,
    Datepicker,
  },
  data() {
    return {
      majors: [],
      paginate: 10,
      search: "",

      from: "",
      to: "",
      total: "",

      page: 1,

      current_page: null,
      last_page: 10,

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
      // console.log(sortBy);
      this.sortBy = sortBy;
      this.typeBy = !this.typeBy;
      if (this.typeBy) {
        this.sortOrder = "ASC";
      } else {
        this.sortOrder = "DESC";
      }
      axios
        .get(
          `http://localhost:8000/api/major?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.majors = response.data.data.data;

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
          `http://localhost:8000/api/major?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.majors = response.data.data.data;

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
          `http://localhost:8000/api/major?paginate=${this.paginate}&search=${this.search}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          // console.log(response);
          this.majors = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    async majorDelete(id) {
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
              .delete(`api/major/${id}`, {
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
// export default {
//   setup() {
//     //reactive state
//     let majors = ref([]);

//     //mounted
//     onMounted(() => {
//       //get API from Laravel Backend
//       axios
//         .get("http://localhost:8000/api/major")
//         .then((response) => {
//           console.log(response);
//           //assign state majors with response data
//           majors.value = response.data.data.data;
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });

//     function majorDelete(id) {
//       //delete data post by ID
//       axios
//         .delete(`http://localhost:8000/api/major/${id}`)
//         .then(() => {
//           //splice posts
//           majors.value.splice(majors.value.indexOf(id), 1);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     }

//     //return
//     return {
//       majors,
//       majorDelete,
//     };
//   },
// };
</script>
