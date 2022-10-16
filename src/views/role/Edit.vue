<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Ubah Role</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="update" enctype="multipart/form-data">
              <div class="form-group">
                <label for="title" class="font-weight-bold">Nama Role</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="role_nama"
                  placeholder="Masukkan nama lokasi"
                />
                <div
                  v-if="validation.role_nama"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.role_nama[0] }}
                </div>
              </div>
              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "EditRole",
  data() {
    return {
      role_nama: "",
      validation: [],
      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token"),
      userRole: localStorage.getItem("userRole"),
    };
  },
  created() {
    this.getRoleById();
  },
  methods: {
    async getRoleById() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/role/${this.$route.params.id}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        this.role_nama = response.data.data[0].role_nama;
      } catch (error) {
        console.log(error);
      }
    },

    async update() {
      try {
        // console.log(this.role_nama);
        await axios
          .put(
            `http://localhost:8000/api/role/${this.$route.params.id}`,
            {
              role_nama: this.role_nama,
            },
            {
              headers: { Authorization: "Bearer " + this.token },
            }
          )
          .then((data) => {
            // console.log(data);
            if (data.data.code == 201) {
              this.$swal.fire(
                "Updated!",
                "Your file has been updated.",
                "success"
              );
            }
          });
        (this.role_nama = ""), this.$router.push("/role");
      } catch (error) {
        console.log(error);
        // validation.value = error.response.data.message;
        this.validation = error.response.data.message;
      }
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
// export default {
//   setup() {
//     //state posts
//     const role = reactive({
//       role_nama: "",
//     });

//     //state validation
//     const validation = ref([]);

//     //vue router
//     const router = useRouter();

//     //vue router
//     const route = useRoute();

//     //mounted
//     onMounted(() => {
//       //get API from Laravel Backend
//       axios
//         .get(`http://localhost:8000/api/role/${route.params.id}`)
//         .then((response) => {
//           console.log(response);
//           //assign state posts with response data
//           role.role_nama = response.data.data[0].role_nama;
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });

//     //method update
//     function update() {
//       let role_nama = role.role_nama;

//       axios
//         .put(`http://localhost:8000/api/role/${route.params.id}`, {
//           role_nama: role_nama,
//         })
//         .then(() => {
//           //redirect ke role index
//           router.push({
//             name: "Role",
//           });
//         })
//         .catch((error) => {
//           //assign state validation with error
//           validation.value = error.response.data;
//         });
//     }

//     //return
//     return {
//       role,
//       validation,
//       router,
//       update,
//     };
//   },
// };
</script>
