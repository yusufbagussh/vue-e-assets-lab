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
              </div>
              <!-- <div class="form-group">
                <label for="title" class="font-weight-bold">Foto Ruangan</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="location.lokasi_gambar"
                  placeholder="Masukkan nama lokasi"
                />
              </div> -->
              <div class="form-gorup mb-2">
                <label>Gambar Ruangan</label><span class="text-danger"> *</span>
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
  name: "EditLocation",
  data() {
    return {
      lokasi_id: "",
      lokasi_nama: "",
      lokasi_gambar: "",
      imgPreview: null,
    };
  },
  created() {
    this.getLocationById();
  },
  methods: {
    async getLocationById() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/location/${this.$route.params.id}`
        );
        console.log(response);
        this.lokasi_nama = response.data.data[0].lokasi_nama;
      } catch (error) {
        console.log(error);
      }
    },

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

    async update() {
      try {
        await axios.put(
          `http://localhost:8000/api/location/${this.$route.params.id}`,
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
