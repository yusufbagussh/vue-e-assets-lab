<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Ubah Peminjam</h4>
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
                  v-model="peminjam_nama"
                  placeholder="Masukkan nama peminjam"
                />
                <div
                  v-if="validation.peminjam_nama"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.peminjam_nama[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >No. Identitas / Kartu Mahasiswa</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="peminjam_no_identitas"
                  placeholder="Masukkan nomor identitas"
                />
                <div
                  v-if="validation.peminjam_no_identitas"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.peminjam_no_identitas[0] }}
                </div>
              </div>
              <div class="form-group">
                <label>Jurusan Peminjam</label>
                <select class="form-control" v-model="peminjam_jurusan">
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
                  v-model="peminjam_email"
                  placeholder="Masukkan email peminjam"
                />
                <div
                  v-if="validation.peminjam_email"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.peminjam_email[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Nomor Whatsapp</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="peminjam_no_wa"
                  placeholder="Masukkan no. whatsapp peminjam"
                />
                <div
                  v-if="validation.peminjam_no_wa"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.peminjam_no_wa[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Status Peminjam</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="peminjam_status"
                  placeholder="Masukkan no. whatsapp peminjam"
                />
                <div
                  v-if="validation.peminjam_status"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.peminjam_status[0] }}
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
  name: "EditBorrower",
  data() {
    return {
      peminjam_nama: "",
      peminjam_no_identitas: "",
      peminjam_jurusan: "",
      peminjam_email: "",
      peminjam_no_wa: "",
      peminjam_status: "",
      majors: [],
      validation: [],

      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token"),
    };
  },
  created() {
    this.getMajor();
    this.getBorrowerById();
  },
  methods: {
    async getMajor() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/major?paginate=all`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        this.majors = response.data.data.data;
        // console.log(this.majors);
      } catch (error) {
        console.log(error);
      }
    },

    async getBorrowerById() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/borrower/${this.$route.params.id}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        this.peminjam_nama = response.data.data[0].peminjam_nama;
        this.peminjam_no_identitas =
          response.data.data[0].peminjam_no_identitas;
        this.peminjam_jurusan = response.data.data[0].peminjam_jurusan;
        this.peminjam_email = response.data.data[0].peminjam_email;
        this.peminjam_no_wa = response.data.data[0].peminjam_no_wa;
        this.peminjam_status = response.data.data[0].peminjam_status;
      } catch (error) {
        console.log(error);
      }
    },

    async update() {
      try {
        await axios
          .put(
            `http://localhost:8000/api/borrower/${this.$route.params.id}`,
            {
              peminjam_nama: this.peminjam_nama,
              peminjam_no_identitas: this.peminjam_no_identitas,
              peminjam_jurusan: this.peminjam_jurusan,
              peminjam_email: this.peminjam_email,
              peminjam_no_wa: this.peminjam_no_wa,
              peminjam_status: this.peminjam_status,
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
        (this.peminjam_nama = ""),
          (this.peminjam_no_identitas = ""),
          (this.peminjam_jurusan = ""),
          (this.peminjam_email = ""),
          (this.peminjam_no_wa = ""),
          (this.peminjam_status = ""),
          this.$router.push("/borrower");
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
