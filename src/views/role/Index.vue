<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>Daftar Role</h4>
              <div class="card-header-action">
                <router-link to="/role/add" class="btn btn-primary"
                  >Tambah Role</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Nama Role</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(role, index) in roles" :key="index">
                      <td>{{ role.role_nama }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditRole',
                            params: { id: role.role_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="roleDelete(role.role_id)"
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
//     let roles = ref([]);

//     //mounted
//     onMounted(() => {
//       //get API from Laravel Backend
//       axios
//         .get("http://localhost:8000/api/role", {
//           headers: { Authorization: "Bearer " + this.token },
//         })
//         .then((response) => {
//           //assign state roles with response data
//           console.log(response);
//           roles.value = response.data.data;
//           console.log(roles);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });

//     function roleDelete(id) {
//       //delete data post by ID
//       axios
//         .delete(`http://localhost:8000/api/role/${id}`, {
//           headers: { Authorization: "Bearer " + this.token },
//         })
//         .then(() => {
//           //splice posts
//           roles.value.splice(roles.value.indexOf(id), 1);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     }

//     //return
//     return {
//       roles,
//       roleDelete,
//     };
//   },
// };
export default {
  name: "Role",
  components: {
    Paginate,
    Datepicker,
  },
  data() {
    return {
      roles: [],
      paginate: 10,
      search: "",

      from: "",
      to: "",
      total: "",

      page: 1,

      current_page: null,
      last_page: 0,

      sortBy: "",
      typeBy: "",
      sortOrder: "",

      date: null,

      token: localStorage.getItem("token"),
      loggedIn: localStorage.getItem("loggedIn"),
      userRole: localStorage.getItem("userRole"),
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
          `http://localhost:8000/api/role?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.roles = response.data.data;

          this.from = response.data.from;
          this.to = response.data.to;
          this.total = parseInt(response.data.total);

          this.current_page = parseInt(response.data.current_page);
          this.last_page = parseInt(response.data.last_page);
        });
    },
    myCallback() {
      // console.log(this.date);
      axios
        .get(
          `http://localhost:8000/api/role?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.roles = response.data.data;

          this.from = response.data.from;
          this.to = response.data.to;
          this.total = parseInt(response.data.total);

          this.current_page = parseInt(response.data.current_page);
          this.last_page = parseInt(response.data.last_page);
        });
    },
    getResult() {
      axios
        .get(
          `http://localhost:8000/api/role?paginate=${this.paginate}&search=${this.search}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          // console.log(response);
          this.roles = response.data.data;

          this.from = response.data.from;
          this.to = response.data.to;
          this.total = parseInt(response.data.total);

          this.current_page = parseInt(response.data.current_page);
          this.last_page = parseInt(response.data.last_page);
        });
    },
    async roleDelete(id) {
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
              .delete(`api/role/${id}`, {
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
    if (this.userRole != 1) {
      return this.$router.push({ name: "Dashboard" });
    }
  },
};
</script>
