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
                <label>Nama Peminjam</label>
                <select
                  class="form-control"
                  v-model="transaction.transaksi_peminjam"
                >
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
                <select
                  class="form-control"
                  v-model="transaction.transaksi_item"
                >
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
                  v-model="transaction.transaksi_jumlah"
                  placeholder="Masukkan jumlah transaction"
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
                  v-model="transaction.transaksi_lama_pinjam"
                  placeholder="Masukkan jumlah transaction"
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
                  type="number"
                  class="form-control"
                  v-model="transaction.transaksi_denda"
                  placeholder="Masukkan jumlah transaction"
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
                  v-model="transaction.transaksi_tgl_pinjam"
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
                  v-model="transaction.transaksi_tgl_kembali"
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
                  >Status Peminjam</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="transaction.transaksi_status"
                  placeholder="Masukkan kondisi transaction"
                />
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
                v-model="transaction.created_by"
                placeholder="Masukkan kondisi transaction"
              />
              <input
                type="hidden"
                class="form-control"
                v-model="transaction.updated_by"
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
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state posts
    const transaction = reactive({
      transaksi_item: "",
      transaksi_peminjam: "",
      transaksi_jumlah: "",
      transaksi_tgl_pinjam: "",
      transaksi_lama_pinjam: "",
      transaksi_tgl_kembali: "",
      transaksi_denda: "",
      transaksi_status: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    let borrowers = ref([]);
    let items = ref([]);

    //vue router
    const route = useRoute();

    //mounted data location
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/borrower")
        .then((response) => {
          //assign state borrowers with response data
          // console.log(response);
          borrowers.value = response.data.data;
          // console.log(borrowers.value[0]);
          // console.log(borrowers.data);
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
        });
    });

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/item")
        .then((response) => {
          //assign state borrowers with response data
          // console.log(response);
          items.value = response.data.data;
          // console.log(borrowers.value[0]);
          // console.log(borrowers.data);
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
        .get(`http://localhost:8000/api/transaction/${route.params.id}`)
        .then((response) => {
          console.log(response);
          //assign state posts with response data
          transaction.transaksi_item = response.data.data[0].transaksi_item;
          transaction.transaksi_peminjam =
            response.data.data[0].transaksi_peminjam;
          transaction.transaksi_jumlah = response.data.data[0].transaksi_jumlah;
          transaction.transaksi_tgl_pinjam =
            response.data.data[0].transaksi_tgl_pinjam;
          transaction.transaksi_lama_pinjam =
            response.data.data[0].transaksi_lama_pinjam;
          transaction.transaksi_tgl_kembali =
            response.data.data[0].transaksi_tgl_kembali;
          transaction.transaksi_denda = response.data.data[0].transaksi_denda;
          transaction.transaksi_status = response.data.data[0].transaksi_status;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
      let transaksi_item = transaction.transaksi_item;
      let transaksi_peminjam = transaction.transaksi_peminjam;
      let transaksi_jumlah = transaction.transaksi_jumlah;
      let transaksi_tgl_pinjam = transaction.transaksi_tgl_pinjam;
      let transaksi_tgl_kembali = transaction.transaksi_tgl_kembali;
      let transaksi_lama_pinjam = transaction.transaksi_lama_pinjam;
      let transaksi_denda = transaction.transaksi_denda;
      let transaksi_status = transaction.transaksi_status;

      axios
        .put(`http://localhost:8000/api/transaction/${route.params.id}`, {
          transaksi_item: transaksi_item,
          transaksi_peminjam: transaksi_peminjam,
          transaksi_jumlah: transaksi_jumlah,
          transaksi_tgl_pinjam: transaksi_tgl_pinjam,
          transaksi_lama_pinjam: transaksi_lama_pinjam,
          transaksi_tgl_kembali: transaksi_tgl_kembali,
          transaksi_denda: transaksi_denda,
          transaksi_status: transaksi_status,
        })
        .then(() => {
          //redirect ke transaction index
          router.push({
            name: "Transaction",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      transaction,
      validation,
      router,
      update,
      borrowers,
      items,
    };
  },
};
</script>
