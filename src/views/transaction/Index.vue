<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>Daftar Transaksi</h4>
              <div class="card-header-action">
                <router-link to="/transaction/add" class="btn btn-primary"
                  >Tambah Transaksi</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Peminjam</th>
                      <th>Item</th>
                      <th>Tanggal Pinjam</th>
                      <th>Lama (Hari)</th>
                      <th>Jumlah</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(transaction, index) in transactions"
                      :key="index"
                    >
                      <td>{{ transaction.borrower.peminjam_nama }}</td>
                      <td>{{ transaction.item.item_nama }}</td>
                      <td>{{ transaction.transaksi_tgl_pinjam }}</td>
                      <td>{{ transaction.transaksi_lama_pinjam }}</td>
                      <td>{{ transaction.transaksi_jumlah }}</td>
                      <td>{{ transaction.transaksi_status }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditTransaction',
                            params: { id: transaction.transaksi_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="
                            transactionDelete(transaction.transaksi_id)
                          "
                          class="btn btn-danger btn-action"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  setup() {
    //reactive state
    let transactions = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/transaction")
        .then((response) => {
          //assign state transactions with response data
          console.log(response);
          transactions.value = response.data.data;
          console.log(transactions);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function transactionDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/transaction/${id}`)
        .then(() => {
          //splice posts
          transactions.value.splice(transactions.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      transactions,
      transactionDelete,
    };
  },
};
</script>
