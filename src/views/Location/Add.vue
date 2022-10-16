<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Lokasi</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store" enctype="multipart/form-data">
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Lokasi Penyimpanan</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="lokasi_nama"
                  placeholder="Masukkan nama lokasi penyimpanan"
                />
                <div
                  v-if="validation.lokasi_nama"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.lokasi_nama[0] }}
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
  name: "AddLocation",
  data() {
    return {
      lokasi_nama: "",
      validation: [],
      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    async store() {
      try {
        await axios
          .post(
            "http://localhost:8000/api/location",
            {
              lokasi_nama: this.lokasi_nama,
            },
            {
              headers: { Authorization: "Bearer " + this.token },
            }
          )
          .then(() => {
            this.$swal.fire(
              "Created!",
              "Your file has been created.",
              "success"
            );
          });
        (this.lokasi_nama = ""), this.$router.push("/location");
      } catch (error) {
        this.validation = error.response.data.message;
        // console.log(validation);
      }
    },
  },
  mounted() {
    if (!this.loggedIn) {
      return this.$router.push({ name: "Login" });
    }
  },
};
</script>
