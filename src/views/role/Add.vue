<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Role</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store" enctype="multipart/form-data">
              <div class="form-group">
                <label for="title" class="font-weight-bold">Nama Role</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="role_nama"
                  placeholder="Masukkan nama role"
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
import axios from "axios";

export default {
  name: "AddRole",
  data() {
    return {
      role_nama: "",
      validation: [],
      token: localStorage.getItem("token"),
      loggedIn: localStorage.getItem("loggedIn"),
      userRole: localStorage.getItem("userRole"),
    };
  },
  methods: {
    async store() {
      try {
        await axios
          .post(
            "http://localhost:8000/api/role",
            {
              role_nama: this.role_nama,
            },
            {
              headers: { Authorization: "Bearer " + this.token },
            }
          )
          .then((data) => {
            this.$swal.fire(
              "Created!",
              "Your file has been created.",
              "success"
            );
          });
        (this.role_nama = ""), this.$router.push("/role");
      } catch (error) {
        this.validation = error.response.data.message;
      }
    },
    mounted() {
      if (!this.loggedIn) {
        return this.$router.push({ name: "Login" });
      }
      if (this.userRole != 1) {
        return this.$router.push({ name: "Dashboard" });
      }
    },
  },
};
</script>
