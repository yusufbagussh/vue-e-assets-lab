<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Transaksi</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store" enctype="multipart/form-data">
              <div class="form-group">
                <label>Nama Peminjam</label>
                <select class="form-control" v-model="transaksi_peminjam">
                  <option
                    v-for="borrower in borrowers"
                    :key="borrower.peminjam_id"
                    :value="borrower.peminjam_id"
                  >
                    {{ borrower.peminjam_nama }}
                  </option>
                </select>
                <!-- validation -->
                <div
                  v-if="validation.transaksi_peminjam"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.transaksi_peminjam[0] }}
                </div>
              </div>
              <div class="form-group">
                <label>Nama Item</label>
                <select class="form-control" v-model="transaksi_item">
                  <option
                    v-for="item in items"
                    :key="item.item_id"
                    :value="item.item_id"
                  >
                    {{ item.item_nama }}
                  </option>
                </select>
                <!-- validation -->
                <div
                  v-if="validation.transaksi_item"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.transaksi_item[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Jumlah Item</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="transaksi_jumlah"
                  placeholder="Masukkan jumlah item"
                />
                <!-- validation -->
                <div
                  v-if="validation.transaksi_jumlah"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.transaksi_jumlah[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Lama Peminjaman</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="transaksi_lama_pinjam"
                  placeholder="Masukkan lama peminjaman"
                />
                <!-- validation -->
                <div
                  v-if="validation.transaksi_lama_pinjam"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.transaksi_lama_pinjam[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Denda Peminjaman</label
                >
                <input
                  readonly
                  type="number"
                  class="form-control"
                  v-model="transaksi_denda"
                  placeholder="Denda peminjaman"
                />
                <!-- validation -->
                <div
                  v-if="validation.transaksi_denda"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.transaksi_denda[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Tanggal Peminjaman</label
                >
                <input
                  type="date"
                  class="form-control"
                  v-model="transaksi_tgl_pinjam"
                  placeholder="Masukkan tanggal pinjam"
                />
                <!-- validation -->
                <div
                  v-if="validation.transaksi_tgl_pinjam"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.transaksi_tgl_pinjam[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Tanggal Pengembalian</label
                >
                <input
                  type="date"
                  class="form-control"
                  v-model="transaksi_tgl_kembali"
                  placeholder="Masukkan tanggal pinjam"
                />
                <!-- validation -->
                <div
                  v-if="validation.transaksi_tgl_kembali"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.transaksi_tgl_kembali[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Status Peminjaman</label
                >
                <select class="form-control" v-model="transaksi_status">
                  <option value="Dipinjam">Dipinjam</option>
                  <option value="Dikembalikan">Dikembalikan</option>
                  <option value="Terlambat">Terlambat</option>
                </select>
                <!-- validation -->
                <div
                  v-if="validation.transaksi_status"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.transaksi_status[0] }}
                </div>
              </div>
              <input
                type="hidden"
                class="form-control"
                v-model="created_by"
                placeholder="Masukkan kondisi transaction"
              />
              <input
                type="hidden"
                class="form-control"
                v-model="updated_by"
                placeholder="Masukkan kondisi transaction"
              />
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

export default {
  name: "AddBorrower",
  data() {
    return {
      transaksi_item: "",
      transaksi_peminjam: "",
      transaksi_jumlah: "",
      transaksi_tgl_pinjam: "",
      transaksi_lama_pinjam: "",
      transaksi_tgl_kembali: "",
      transaksi_denda: "",
      transaksi_status: "",
      created_by: "",
      updated_by: "",
      borrowers: [],
      items: [],
      validation: [],

      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
  },
  created() {
    this.getItem();
    this.getBorrower();
  },
  methods: {
    async getItem() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/item?paginate=all`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        console.log(response);
        this.items = response.data.data.data;
        console.log(this.items);
      } catch (error) {
        console.log(error);
      }
    },

    async getBorrower() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/borrower?paginate=all`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        console.log(response);
        this.borrowers = response.data.data.data;
        console.log(this.borrowers);
      } catch (error) {
        console.log(error);
      }
    },

    async store() {
      try {
        await axios
          .post(
            "http://localhost:8000/api/transaction",
            {
              transaksi_item: this.transaksi_item,
              transaksi_peminjam: this.transaksi_peminjam,
              transaksi_jumlah: this.transaksi_jumlah,
              transaksi_tgl_pinjam: this.transaksi_tgl_pinjam,
              transaksi_lama_pinjam: this.transaksi_lama_pinjam,
              transaksi_tgl_kembali: this.transaksi_tgl_kembali,
              transaksi_status: this.transaksi_status,
              transaksi_denda: this.transaksi_denda,
              created_by: this.userId,
              updated_by: this.updated_by,
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
        (this.transaksi_item = ""),
          (this.transaksi_peminjam = ""),
          (this.transaksi_jumlah = ""),
          (this.transaksi_tgl_pinjam = ""),
          (this.transaksi_lama_pinjam = ""),
          (this.transaksi_tgl_kembali = ""),
          (this.transaksi_denda = ""),
          (this.transaksi_status = ""),
          (this.created_by = ""),
          (this.updated_by = ""),
          this.$router.push("/transaction");
      } catch (error) {
        console.log(error);
        // this.validation = error.response.data.errors;
        this.validation = error.response.data.message;
        console.log(this.validation);
      }
    },
  },
  // check transaction logged in or not
  mounted() {
    if (!this.loggedIn) {
      return this.$router.push({ name: "Login" });
    }
  },
};

// export default {
//   setup() {
//     //state posts
//     const transaction = reactive({
//       transaksi_item: "",
//       transaksi_peminjam: "",
//       transaksi_jumlah: "",
//       transaksi_tgl_pinjam: "",
//       transaksi_lama_pinjam: "",
//       transaksi_tgl_kembli: "",
//       transaksi_denda: "",
//       transaksi_status: "",
//       created_by: 2,
//       updated_by: 2,
//     });

//     //state validation
//     const validation = ref([]);

//     let borrowers = ref([]);
//     let items = ref([]);

//     //vue router
//     const router = useRouter();

//     //mounted data location
//     onMounted(() => {
//       //get API from Laravel Backend
//       axios
//         .get("http://localhost:8000/api/borrower?paginate=all")
//         .then((response) => {
//           //assign state locations with response data
//           // console.log(response);
//           borrowers.value = response.data.data.data;
//           // console.log(locations.value[0]);
//           // console.log(locations.data);
//         })
//         .catch((error) => {
//           validation.value = error.response.data.message;
//           console.log(validation.value);
//         });
//     });

//     onMounted(() => {
//       //get API from Laravel Backend
//       axios
//         .get("http://localhost:8000/api/item?paginate=all")
//         .then((response) => {
//           //assign state locations with response data
//           console.log(response);
//           items.value = response.data.data.data;
//           // console.log(locations.value[0]);
//           // console.log(locations.data);
//         })
//         .catch((error) => {
//           validation.value = error.response.data.message;
//           console.log(validation.value);
//         });
//     });

//     //method store
//     function store() {
//       let transaksi_item = transaction.transaksi_item;
//       let transaksi_peminjam = transaction.transaksi_peminjam;
//       let transaksi_jumlah = transaction.transaksi_jumlah;
//       let transaksi_tgl_pinjam = transaction.transaksi_tgl_pinjam;
//       let transaksi_lama_pinjam = transaction.transaksi_lama_pinjam;
//       let transaksi_tgl_kembali = transaction.transaksi_tgl_kembali;
//       let transaksi_status = transaction.transaksi_status;
//       let transaksi_denda = transaction.transaksi_denda;
//       let created_by = transaction.created_by;
//       let updated_by = transaction.updated_by;

//       axios
//         .post("http://localhost:8000/api/transaction", {
//           transaksi_item: transaksi_item,
//           transaksi_peminjam: transaksi_peminjam,
//           transaksi_jumlah: transaksi_jumlah,
//           transaksi_tgl_pinjam: transaksi_tgl_pinjam,
//           transaksi_lama_pinjam: transaksi_lama_pinjam,
//           transaksi_tgl_kembali: transaksi_tgl_kembali,
//           transaksi_status: transaksi_status,
//           transaksi_denda: transaksi_denda,
//           created_by: created_by,
//           updated_by: updated_by,
//         })
//         .then(() => {
//           //redirect ke transaction index
//           router.push({
//             name: "Transaction",
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
//       transaction,
//       validation,
//       router,
//       store,
//       borrowers,
//       items,
//     };
//   },
// };
</script>
