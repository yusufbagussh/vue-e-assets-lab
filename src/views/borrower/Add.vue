<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Peminjam</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store" enctype="multipart/form-data">
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
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// export default {
//   setup() {
//     //state posts
//     const borrower = reactive({
//       peminjam_nama: "",
//       peminjam_no_identitas: "",
//       peminjam_jurusan: "",
//       peminjam_email: "",
//       peminjam_no_wa: "",
//       peminjam_status: "",
//     });

//     //state validation
//     const validation = ref([]);

//     let majors = ref([]);

//     //vue router
//     const router = useRouter();

//     //mounted data major
//     onMounted(() => {
//       //get API from Laravel Backend
//       axios
//         .get("http://localhost:8000/api/major?paginate=all", {
//           headers: { Authorization: "Bearer " + this.token },
//         })
//         .then((response) => {
//           majors.value = response.data.data.data;
//         })
//         .catch((error) => {
//           validation.value = error.response.data.message;
//           console.log(validation.value);
//         });
//     });

//     //method store
//     function store() {
//       let peminjam_nama = borrower.peminjam_nama;
//       let peminjam_no_identitas = borrower.peminjam_no_identitas;
//       let peminjam_jurusan = borrower.peminjam_jurusan;
//       let peminjam_email = borrower.peminjam_email;
//       let peminjam_no_wa = borrower.peminjam_no_wa;
//       let peminjam_status = borrower.peminjam_status;

//       axios
//         .post(
//           "http://localhost:8000/api/borrower",
//           {
//             peminjam_nama: peminjam_nama,
//             peminjam_no_identitas: peminjam_no_identitas,
//             peminjam_jurusan: peminjam_jurusan,
//             peminjam_email: peminjam_email,
//             peminjam_no_wa: peminjam_no_wa,
//             peminjam_status: peminjam_status,
//           },
//           {
//             headers: { Authorization: "Bearer " + this.token },
//           }
//         )
//         .then(() => {
//           this.$swal.fire("Created!", "Your file has been created.", "success");
//           //redirect ke borrower index
//           router.push({
//             name: "Borrower",
//           });
//         })
//         .catch((error) => {
//           //assign state validation with error
//           validation.value = error.response.data.message;
//           console.log(validation.value);
//         });
//     }

//     //return
//     return {
//       borrower,
//       validation,
//       router,
//       store,
//       majors,
//     };
//   },
// };

export default {
  name: "AddBorrower",
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
        console.log(response);
        this.majors = response.data.data.data;
        console.log(this.majors);
      } catch (error) {
        console.log(error);
      }
    },

    async store() {
      try {
        await axios
          .post(
            "http://localhost:8000/api/borrower",
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
            console.log(data);
            if (data.data.code == 201) {
              this.$swal.fire(
                "Created!",
                "Your file has been created.",
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
        // this.validation = error.response.data.errors;
        this.validation = error.response.data.message;
        console.log(this.validation);
      }
    },
  },
  // check user logged in or not
  mounted() {
    if (!this.loggedIn) {
      return this.$router.push({ name: "Login" });
    }
  },
};
</script>
