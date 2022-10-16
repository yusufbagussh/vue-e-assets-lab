<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Item</h4>
          </div>
          <div class="card-body col-8">
            <form @submit.prevent="store" enctype="multipart/form-data">
              <div class="form-group">
                <label for="title" class="font-weight-bold">Nama Item</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item_nama"
                  placeholder="Masukkan nama item"
                />
                <div
                  v-if="validation.item_nama"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_nama[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Jumlah Item</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item_jumlah"
                  placeholder="Masukkan lokasi item"
                />
                <div
                  v-if="validation.item_jumlah"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_jumlah[0] }}
                </div>
              </div>
              <div class="form-group">
                <label>Lokasi Penyimpanan</label>
                <select class="form-control" v-model="item_lokasi">
                  <option
                    v-for="location in locations"
                    :key="location.lokasi_id"
                    :value="location.lokasi_id"
                  >
                    {{ location.lokasi_nama }}
                  </option>
                </select>
                <div
                  v-if="validation.item_lokasi"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_lokasi[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Kondisi Item</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item_kondisi"
                  placeholder="Masukkan kondisi item"
                />
                <div
                  v-if="validation.item_kondisi"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_kondisi[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Spesifikasi Item</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="item_spesifikasi"
                  placeholder="Masukkan spesifikasi item"
                />
                <div
                  v-if="validation.item_spesifikasi"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_spesifikasi[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Status Item</label>
                <select class="form-control" v-model="item_status">
                  <option value="Tersedia">Tersedia</option>
                  <option value="Tidak Tersedia">Tidak Tersedia</option>
                </select>
                <div
                  v-if="validation.item_status"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_status[0] }}
                </div>
              </div>
              <div class="form-gorup mb-2">
                <label>Image</label><span class="text-danger"> *</span>
                <input
                  type="file"
                  class="form-control mb-2"
                  v-on:change="onChange"
                />

                <div v-if="item_gambar">
                  <img v-bind:src="imgPreview" width="100" height="100" />
                </div>
                <div
                  v-if="validation.item_gambar"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_gambar[0] }}
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
  name: "AddItem",
  data() {
    return {
      item_nama: "",
      item_lokasi: "",
      item_jumlah: "",
      item_gambar: "",
      item_kondisi: "",
      item_spesifikasi: "",
      item_status: "",
      imgPreview: null,
      locations: [],
      validation: [],

      loggedIn: localStorage.getItem("loggedIn"),
      //state token
      token: localStorage.getItem("token"),
      //state user logged In
      // user: [],
    };
  },
  created() {
    this.getLocation();
  },
  methods: {
    async getLocation() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/location?paginate=all`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        this.locations = response.data.data.data;
        // console.log(this.locations);
        // this.item_lokasi = response.data.data[0].item_lokasi;
      } catch (error) {
        console.log(error);
      }
    },

    onChange(e) {
      this.item_gambar = e.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.imgPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.item_gambar) {
        if (/\.(jpe?g|png|gif)$/i.test(this.item_gambar.name)) {
          reader.readAsDataURL(this.item_gambar);
        }
      }
    },

    async store() {
      try {
        await axios
          .post(
            "http://localhost:8000/api/item",
            {
              item_nama: this.item_nama,
              item_lokasi: this.item_lokasi,
              item_jumlah: this.item_jumlah,
              item_gambar: this.item_gambar,
              item_kondisi: this.item_kondisi,
              item_spesifikasi: this.item_spesifikasi,
              item_status: this.item_status,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((data) => {
            // console.log(data);
            if (data.data.code == 201) {
              this.$swal.fire(
                "Created!",
                "Your file has been created.",
                "success"
              );
            }
          });
        (this.item_nama = ""),
          (this.item_lokasi = ""),
          (this.item_jumlah = ""),
          (this.item_kondisi = ""),
          (this.item_spesifikasi = ""),
          (this.item_gambar = ""),
          (this.item_status = ""),
          this.$router.push("/item");
      } catch (error) {
        console.log(error);
        // this.validation = error.response.data.errors;
        this.validation = error.response.data.message;
        // console.log(this.validation);
      }
    },
  },
  // check user logged in or not
  mounted() {
    if (!this.loggedIn) {
      return this.$router.push({ name: "Login" });
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   if (!this.loggedIn) {
  //     return this.$router.push({ name: "Login" });
  //   }
  //   next();
  // },
};
</script>
