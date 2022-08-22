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
    };
  },
  methods: {
    async store() {
      try {
        await axios.post("http://localhost:8000/api/location", {
          lokasi_nama: this.lokasi_nama,
        });
        (this.lokasi_nama = ""), this.$router.push("/location");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
