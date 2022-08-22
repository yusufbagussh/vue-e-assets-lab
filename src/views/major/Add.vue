<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Jurusan</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store" enctype="multipart/form-data">
              <div class="form-group">
                <label for="title" class="font-weight-bold">Jurusan</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="jurusan_nama"
                  placeholder="Masukkan nama jurusan"
                />
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Fakultas</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="jurusan_fakultas"
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
import axios from "axios";

export default {
  name: "AddMajor",
  data() {
    return {
      jurusan_nama: "",
      jurusan_fakultas: "",
    };
  },
  methods: {
    async store() {
      try {
        await axios.post("http://localhost:8000/api/major", {
          jurusan_nama: this.jurusan_nama,
          jurusan_fakultas: this.jurusan_fakultas,
        });
        (this.jurusan_nama = ""),
          (this.jurusan_fakultas = ""),
          this.$router.push("/major");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
