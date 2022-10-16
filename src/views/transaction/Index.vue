<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>Daftar Transaksi</h4>
              <Datepicker
                class="ml-1"
                v-model="date"
                range
                multiCalendars
                :enableTimePicker="false"
                @click="myCallback"
              ></Datepicker>
              <div class="card-tools p-2">
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="myCallback"
                >
                  View
                </button>
              </div>
              <form class="card-tools p-2 mt-1" @input="getResult">
                <div class="input-group input-group-sm">
                  <input
                    class="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    v-model="search"
                  />
                </div>
              </form>
              <div class="card-tools p-2">
                <button
                  type="button"
                  class="btn btn-sm btn-secondary"
                  @click="resetData"
                >
                  <i class="fa fa-refresh mr-1" aria-hidden="true"></i>
                  Reset
                </button>
              </div>
              <div class="card-tools p-2">
                <button
                  type="button"
                  class="btn btn-sm btn-success"
                  @click="Export"
                >
                  <i class="fa fa-file-arrow-up mr-1"></i>
                  Export
                </button>
              </div>
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
                      <th>
                        Peminjam
                        <a @click="sortTable('peminjam_nama')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
                      <th>
                        Item
                        <a @click="sortTable('item_nama')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
                      <th>
                        Tanggal Pinjam
                        <a @click="sortTable('transaksi_tgl_pinjam')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
                      <th>
                        Lama (Hari)
                        <a @click="sortTable('transaksi_lama_pinjam')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
                      <th>
                        Jumlah
                        <a @click="sortTable('peminjam_jumlah')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
                      <th>
                        Status
                        <a @click="sortTable('transaksi_nama')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
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
            <div class="card">
              <div class="card-footer">
                <div class="row ml-sm-1">
                  <select
                    class="custom-select col-1 mr-1"
                    style="width: 10; height: 5%"
                    v-model="paginate"
                    @change="getResult"
                  >
                    <option selected>Choose...</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="all">All</option>
                  </select>
                  <paginate
                    v-model="current_page"
                    :page-count="last_page"
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="myCallback"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                    :first-last-button="true"
                    :first-button-text="'First'"
                    :last-button-text="'Last'"
                  >
                  </paginate>
                </div>
                <div>showing {{ from }} to {{ to }} of {{ total }} entries</div>
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
import Paginate from "vuejs-paginate-next";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "Borrower",
  components: {
    Paginate,
    Datepicker,
  },
  data() {
    return {
      transactions: [],
      paginate: 10,
      search: "",

      from: "",
      to: "",
      total: "",

      page: 1,

      current_page: null,
      last_page: 0,

      sortBy: "",
      typeBy: "",
      sortOrder: "",

      date: [],

      token: localStorage.getItem("token"),
      loggedIn: localStorage.getItem("loggedIn"),
    };
  },
  created() {
    // this.getItem();
    this.getResult();
  },
  methods: {
    sortTable(sortBy) {
      // console.log(sortBy);
      this.sortBy = sortBy;
      this.typeBy = !this.typeBy;
      if (this.typeBy) {
        this.sortOrder = "ASC";
      } else {
        this.sortOrder = "DESC";
      }
      axios
        .get(
          `http://localhost:8000/api/transaction?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.transactions = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    myCallback() {
      // console.log(this.date);
      let start_date = "";
      let end_date = "";
      if (this.date) {
        start_date = moment(String(this.date[0]))
          .locale("id")
          .format("YYYY-MM-DD");
        end_date = moment(String(this.date[1]))
          .locale("id")
          .format("YYYY-MM-DD");
      }
      // console.log(start_date);
      axios
        .get(
          `http://localhost:8000/api/transaction?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}&start_date=${start_date}&end_date=${end_date}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.transactions = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    getResult() {
      axios
        .get(
          `http://localhost:8000/api/transaction?paginate=${this.paginate}&search=${this.search}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          // console.log(response);
          this.transactions = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    async transactionDelete(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          // Send request to the server
          if (result.value) {
            axios
              .delete(`api/transaction/${id}`, {
                headers: { Authorization: "Bearer " + this.token },
              })
              .then(() => {
                this.$swal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                this.getResult();
              })
              .catch((data) => {
                this.$swal.fire("Failed!", data.message, "warning");
              });
          }
        });
    },
    resetData(e) {
      e.preventDefault();
      this.date = [];
      const date = new Date();
      date.setDate(1);
      date.setMonth(new Date().getMonth() - 1);
      date.setFullYear(new Date().getFullYear());
      // console.log(date);
      this.date.push(date);
      this.date.push(new Date());
      this.search = "";
      this.myCallback();
      this.getResults();
    },
    Export() {
      let start_date = "";
      let end_date = "";
      // if (this.date_logs) {
      //   start_date = moment(String(this.date_logs[0]))
      //     .locale("id")
      //     .format("YYYY-MM-DD");
      //   end_date = moment(String(this.date_logs[1]))
      //     .locale("id")
      //     .format("YYYY-MM-DD");
      // }
      axios
        .get(`/api/export?start_date=${start_date}&end_date=${end_date}`, {
          responseType: "blob",
        })
        .then((response) => {
          // const outputFilename = "xyzzzz.xls";
          // fs.writeFileSync(outputFilename, response.data);
          // return outputFilename;
          // console.log(response);
          // Let's create a link in the document that we'll
          // programmatically 'click'.
          const link = document.createElement("a");

          // Tell the browser to associate the response data to
          // the URL of the link we created above.
          link.href = window.URL.createObjectURL(new Blob([response.data]));

          // Tell the browser to download, not render, the file.
          link.setAttribute("download", "transaction_report.xlsx");

          // Place the link in the DOM.
          document.body.appendChild(link);

          // Make the magic happen!
          link.click();
        }); // Please catch me!
    },
  },
  mounted() {
    if (!this.loggedIn) {
      return this.$router.push({ name: "Login" });
    }
    const date = new Date();
    date.setDate(1);
    date.setMonth(new Date().getMonth() - 1);
    date.setFullYear(new Date().getFullYear());
    this.date.push(date);
    this.date.push(new Date());
  },
};
</script>
