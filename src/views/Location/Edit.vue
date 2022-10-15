<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Ubah Lokasi</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="update" enctype="multipart/form-data">
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Ruang Penyimpanan</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="lokasi_nama"
                  placeholder="Masukkan nama lokasi"
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
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "EditLocation",
  data() {
    return {
      lokasi_nama: "",
      validation: [],
      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token"),
    };
  },
  created() {
    this.getLocationById();
  },
  methods: {
    async getLocationById() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/location/${this.$route.params.id}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        console.log(response);
        this.lokasi_nama = response.data.data[0].lokasi_nama;
      } catch (error) {
        console.log(error);
      }
    },

    async update() {
      try {
        await axios
          .put(
            `http://localhost:8000/api/location/${this.$route.params.id}`,
            {
              lokasi_nama: this.lokasi_nama,
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
        (this.lokasi_nama = ""), this.$router.push("/location");
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
  },
};
</script>
