<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Ruang</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store" enctype="multipart/form-data">
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Ruang Penyimpanan</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="lokasi_nama"
                  placeholder="Masukkan nama ruang"
                />
              </div>
              <div class="form-gorup mb-2">
                <label>Image</label><span class="text-danger"> *</span>
                <input
                  type="file"
                  class="form-control mb-2"
                  v-on:change="onChange"
                />

                <div v-if="lokasi_gambar">
                  <img v-bind:src="imgPreview" width="100" height="100" />
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
      lokasi_gambar: "",
      imgPreview: null,
    };
  },
  methods: {
    onChange(e) {
      this.lokasi_gambar = e.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.imgPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.lokasi_gambar) {
        if (/\.(jpe?g|png|gif)$/i.test(this.lokasi_gambar.name)) {
          reader.readAsDataURL(this.lokasi_gambar);
        }
      }
    },

    async store() {
      try {
        await axios.post(
          "http://localhost:8000/api/location",
          {
            lokasi_nama: this.lokasi_nama,
            lokasi_gambar: this.lokasi_gambar,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        (this.lokasi_nama = ""),
          (this.lokasi_gambar = ""),
          this.$router.push("/location");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
