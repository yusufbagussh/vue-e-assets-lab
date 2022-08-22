<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Ubah Jurusan</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="update" enctype="multipart/form-data">
              <div class="form-group">
                <label for="title" class="font-weight-bold">Jurusan</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="major.jurusan_nama"
                  placeholder="Masukkan nama jurusan"
                />
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Fakultas</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="major.jurusan_fakultas"
                  placeholder="Masukkan nama fakultas"
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
    const major = reactive({
      jurusan_nama: "",
      jurusan_fakultas: "",
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
        .get(`http://localhost:8000/api/major/${route.params.id}`)
        .then((response) => {
          console.log(response);
          //assign state posts with response data
          major.jurusan_nama = response.data.data[0].jurusan_nama;
          major.jurusan_fakultas = response.data.data[0].jurusan_fakultas;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
      let jurusan_nama = major.jurusan_nama;
      let jurusan_fakultas = major.jurusan_fakultas;

      axios
        .put(`http://localhost:8000/api/major/${route.params.id}`, {
          jurusan_nama: jurusan_nama,
          jurusan_fakultas: jurusan_fakultas,
        })
        .then(() => {
          //redirect ke major index
          router.push({
            name: "Major",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      major,
      validation,
      router,
      update,
    };
  },
};
</script>
