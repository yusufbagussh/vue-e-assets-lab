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
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
      let lokasi_nama = location.lokasi_nama;

      axios
        .put(`http://localhost:8000/api/location/${route.params.id}`, {
          lokasi_nama: lokasi_nama,
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
