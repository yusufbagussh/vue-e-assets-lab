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
                  v-model="location.lokasi_nama"
                  placeholder="Masukkan nama lokasi"
                />
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Foto Ruangan</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="location.lokasi_gambar"
                  placeholder="Masukkan nama lokasi"
                />
              </div>
              <!-- <div class="form-gorup mb-2">
                <label>Foto Lokasi</label><span class="text-danger"> *</span>
                <input
                  type="file"
                  class="form-control mb-2"
                  v-on:change="onChange"
                />

                <div v-if="lokasi_gambar">
                  <img v-bind:src="imgPreview" width="100" height="100" />
                </div>
              </div> -->
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
  setup() {
    //state posts
    const location = reactive({
      lokasi_nama: "",
      lokasi_gambar: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //vue router
    const route = useRoute();

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(`http://localhost:8000/api/location/${route.params.id}`)
        .then((response) => {
          console.log(response);
          //assign state posts with response data
          location.lokasi_nama = response.data.data[0].lokasi_nama;
          location.lokasi_gambar = response.data.data[0].lokasi_gambar;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
      let lokasi_nama = location.lokasi_nama;
      let lokasi_gambar = location.lokasi_gambar;

      axios
        .put(`http://localhost:8000/api/location/${route.params.id}`, {
          lokasi_nama: lokasi_nama,
          lokasi_gambar: lokasi_gambar,
        })
        .then(() => {
          //redirect ke location index
          router.push({
            name: "Location",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      location,
      validation,
      router,
      update,
    };
  },
};
</script>
