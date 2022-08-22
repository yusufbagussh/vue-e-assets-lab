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
                  >Nama Peminjam</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="borrower.peminjam_nama"
                  placeholder="Masukkan nama peminjam"
                />
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >No. Identitas / Kartu Mahasiswa</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="borrower.peminjam_no_identitas"
                  placeholder="Masukkan nomor identitas"
                />
              </div>
              <div class="form-group">
                <label>Jurusan Peminjam</label>
                <select
                  class="form-control"
                  v-model="borrower.peminjam_jurusan"
                >
                  <option
                    v-for="major in majors"
                    :key="major.jurusan_id"
                    :value="major.jurusan_id"
                  >
                    {{ major.jurusan_nama }}
                  </option>
                </select>
                <!-- validation -->
                <div
                  v-if="validation.peminjam_jurusan"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.peminjam_jurusan[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Email</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="borrower.peminjam_email"
                  placeholder="Masukkan email peminjam"
                />
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Nomor Whatsapp</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="borrower.peminjam_no_wa"
                  placeholder="Masukkan no. whatsapp peminjam"
                />
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Status Peminjam</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="borrower.peminjam_status"
                  placeholder="Masukkan no. whatsapp peminjam"
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
    const borrower = reactive({
      peminjam_no_identitas: "",
      peminjam_nama: "",
      peminjam_jurusan: "",
      peminjam_email: "",
      peminjam_no_wa: "",
      peminjam_status: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    let majors = ref([]);

    //vue router
    const route = useRoute();

    //mounted data location
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/major")
        .then((response) => {
          majors.value = response.data.data;
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
        });
    });

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(`http://localhost:8000/api/borrower/${route.params.id}`)
        .then((response) => {
          console.log(response);
          //assign state posts with response data
          borrower.peminjam_no_identitas =
            response.data.data[0].peminjam_no_identitas;
          borrower.peminjam_nama = response.data.data[0].peminjam_nama;
          borrower.peminjam_jurusan = response.data.data[0].peminjam_jurusan;
          borrower.peminjam_email = response.data.data[0].peminjam_email;
          borrower.peminjam_no_wa = response.data.data[0].peminjam_no_wa;
          borrower.peminjam_status = response.data.data[0].peminjam_status;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
      let peminjam_no_identitas = borrower.peminjam_no_identitas;
      let peminjam_nama = borrower.peminjam_nama;
      let peminjam_jurusan = borrower.peminjam_jurusan;
      let peminjam_email = borrower.peminjam_email;
      let peminjam_no_wa = borrower.peminjam_no_wa;
      let peminjam_status = borrower.peminjam_status;

      axios
        .put(`http://localhost:8000/api/borrower/${route.params.id}`, {
          peminjam_no_identitas: peminjam_no_identitas,
          peminjam_nama: peminjam_nama,
          peminjam_jurusan: peminjam_jurusan,
          peminjam_email: peminjam_email,
          peminjam_no_wa: peminjam_no_wa,
          peminjam_status: peminjam_status,
        })
        .then(() => {
          //redirect ke borrower index
          router.push({
            name: "Borrower",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      borrower,
      validation,
      router,
      update,
      majors,
    };
  },
};
</script>
