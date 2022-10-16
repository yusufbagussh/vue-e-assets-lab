<template>
  <div class="main-content">
    <section class="section">
      <div class="section-header">
        <h1>Dashboard</h1>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
          <div class="card card-statistic-1">
            <div class="card-icon bg-primary">
              <i class="far fa-user"></i>
            </div>
            <div class="card-wrap">
              <div class="card-header">
                <h4>Total Admin</h4>
              </div>
              <!-- <div class="card-body">{{ dashboard.totalUsers }}</div> -->
              <div class="card-body">{{ totalUsers }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
          <div class="card card-statistic-1">
            <div class="card-icon bg-danger">
              <i class="far fa-newspaper"></i>
            </div>
            <div class="card-wrap">
              <div class="card-header">
                <h4>Total Barang</h4>
              </div>
              <!-- <div class="card-body">{{ dashboard.totalItems }}</div> -->
              <div class="card-body">{{ totalItems }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
          <div class="card card-statistic-1">
            <div class="card-icon bg-warning">
              <i class="far fa-file"></i>
            </div>
            <div class="card-wrap">
              <div class="card-header">
                <h4>Total Transaksi</h4>
              </div>
              <!-- <div class="card-body">{{ dashboard.totalTransactions }}</div> -->
              <div class="card-body">{{ totalTransactions }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
          <div class="card card-statistic-1">
            <div class="card-icon bg-success">
              <i class="fas fa-circle"></i>
            </div>
            <div class="card-wrap">
              <div class="card-header">
                <h4>Total Peminjam</h4>
              </div>
              <!-- <div class="card-body">{{ dashboard.totalBorrowers }}</div> -->
              <div class="card-body">{{ totalBorrowers }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2" style="display: flex">
        <div class="col-lg-6">
          <div class="card text-center" style="height: 500px">
            <div
              class="card-header text-white d-flex justify-content-center"
              style="background-color: #1e90ff; font-size: 20px"
            >
              Data Transaksi Per Bulan
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-center">
                <div class="row">
                  <div class="row mr-2">
                    <div class="mr-2">
                      <select
                        id="inputState"
                        class="form-control"
                        style="width: 110px"
                        v-model="start_month"
                      >
                        <option selected disabled>Choose NS</option>
                        <option value="01">Januari</option>
                        <option value="02">Februari</option>
                        <option value="03">Maret</option>
                        <option value="04">April</option>
                        <option value="05">Mei</option>
                        <option value="06">Juni</option>
                        <option value="07">Juli</option>
                        <option value="08">Agustus</option>
                        <option value="09">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                      </select>
                    </div>
                    <div class="">
                      <select
                        id="inputState"
                        class="form-control"
                        style="width: 110px"
                        v-model="start_year"
                      >
                        <option selected disabled>Choose DO</option>
                        <option
                          v-for="year in years"
                          :key="year.id"
                          :value="year.name"
                        >
                          {{ year.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="p-1">-</div>
                  <div class="row ml-2">
                    <div class="mr-2">
                      <select
                        id="inputState"
                        class="form-control"
                        style="width: 110px"
                        v-model="end_month"
                      >
                        <option selected disabled>Choose NS</option>
                        <option value="01">Januari</option>
                        <option value="02">Februari</option>
                        <option value="03">Maret</option>
                        <option value="04">April</option>
                        <option value="05">Mei</option>
                        <option value="06">Juni</option>
                        <option value="07">Juli</option>
                        <option value="08">Agustus</option>
                        <option value="09">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                      </select>
                    </div>
                    <div class="">
                      <select
                        id="inputState"
                        class="form-control"
                        style="width: 110px"
                        v-model="end_year"
                      >
                        <option selected disabled>Choose DO</option>
                        <option
                          v-for="year in years"
                          :key="year.id"
                          :value="year.name"
                        >
                          {{ year.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="card-tools p-2">
                  <button
                    type="button"
                    class="btn btn-md btn-primary"
                    @click="getDataTransaksiByMonth"
                  >
                    <i class="fa fa-eye mr-1" aria-hidden="true"></i>
                    View
                  </button>
                </div>
                <!-- <div class="card-tools p-2">
                  <button
                    type="button"
                    class="btn btn-md btn-danger"
                    @click="ExportNsDaily"
                  >
                    <i class="fa fa-file-arrow-up mr-1"></i>
                    Export
                  </button>
                </div> -->
                <div class="card-tools p-2">
                  <button
                    type="button"
                    class="btn btn-md btn-secondary"
                    @click="resetDataTransaksiByMonth"
                  >
                    <i class="fa fa-refresh mr-1" aria-hidden="true"></i>
                    Reset
                  </button>
                </div>
              </div>
              <apexchart
                height="335"
                type="bar"
                :options="chartOptions6"
                :series="series6"
              ></apexchart>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card text-center" style="height: 500px">
            <div
              class="card-header text-white d-flex justify-content-center"
              style="background-color: #1e90ff; font-size: 20px"
            >
              Data Barang
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-center">
                <div class="row">
                  <div class="row mr-2">
                    <div class="mr-2">
                      <select
                        id="inputState"
                        class="form-control"
                        style="width: 110px"
                        v-model="id_item"
                      >
                        <option
                          v-for="item in items"
                          :key="item.item_id"
                          :value="item.item_id"
                        >
                          {{ item.item_nama }}
                        </option>
                      </select>
                    </div>
                    <div class="card-tools p-1">
                      <button
                        type="button"
                        class="btn btn-md btn-primary"
                        @click="getDataBarangById"
                      >
                        <i class="fa fa-eye mr-1" aria-hidden="true"></i>
                        View
                      </button>
                    </div>
                    <div class="card-tools p-1">
                      <button
                        type="button"
                        class="btn btn-md btn-secondary"
                        @click="resetDataBarangById"
                      >
                        <i class="fa fa-refresh mr-1" aria-hidden="true"></i>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <apexchart
                height="350"
                type="bar"
                :options="chartOptions5"
                :series="series5"
              ></apexchart>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2" style="display: flex">
        <div class="col-lg-12">
          <div class="card text-center" style="height: 500px">
            <div
              class="card-header text-white d-flex justify-content-center"
              style="background-color: #1e90ff; font-size: 20px"
            >
              Data Transaksi Per Hari
            </div>
            <div class="card-body">
              <div class="row d-flex justify-content-center">
                <div class="card-tools p-1">
                  <Datepicker
                    v-model="date"
                    range
                    multiCalendars
                    :enableTimePicker="false"
                    @click="getDataTransaksiByDate"
                  ></Datepicker>
                </div>
                <div class="card-tools p-1">
                  <button
                    type="button"
                    class="btn btn-md btn-primary"
                    @click="getDataTransaksiByDate"
                  >
                    <i class="fa fa-eye mr-1" aria-hidden="true"></i>
                    View
                  </button>
                </div>
                <!-- <div class="card-tools p-1">
                  <button
                    type="button"
                    class="btn btn-md btn-danger"
                    @click="ExportNsDaily"
                  >
                    <i class="fa fa-file-arrow-up mr-1"></i>
                    Export
                  </button>
                </div> -->
                <div class="card-tools p-1">
                  <button
                    type="button"
                    class="btn btn-md btn-secondary"
                    @click="resetDataTransaksiByDate"
                  >
                    <i class="fa fa-refresh mr-1" aria-hidden="true"></i>
                    Reset
                  </button>
                </div>
              </div>
              <apexchart
                height="350"
                type="bar"
                :options="chartOptions7"
                :series="series7"
              ></apexchart>
            </div>
          </div>
        </div>
        <!-- <div class="col-lg-6">
          <div class="card text-center" style="height: 500px">
            <div
              class="card-header text-white"
              style="background-color: #1e90ff; font-size: 20px"
            >
              Data Barang
            </div>
            <apexchart
              height="425"
              type="bar"
              :options="chartOptions5"
              :series="series5"
            ></apexchart>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";
import _ from "lodash";
import moment from "moment";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  name: "Dashboard",
  components: {
    apexchart: VueApexCharts,
    Datepicker,
  },
  data() {
    return {
      id_item: "",
      items: [],
      date: [],
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      years: [],
      totalTransactions: null,
      totalBorrowers: null,
      totalItems: null,
      totalUsers: null,
      totalItemDipinjam: null,
      totalItemTidakDpinjam: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
      chartOptions3: {},
      series3: [],
      chartOptions4: {},
      series4: [],
      chartOptions5: {},
      series5: [],
      chartOptions6: {},
      series6: [],
      chartOptions7: {},
      series7: [],

      loggedIn: localStorage.getItem("loggedIn"),
      //state token
      token: localStorage.getItem("token"),
    };
  },
  created() {
    this.getDashboardData();
    this.getDataTransaksiByMonth();
    this.getDataTransaksiByDateDefault();
    this.getDataBarang();
    this.getItem();
  },
  methods: {
    resetDataBarangById(e) {
      e.preventDefault();
      this.id_item = "";
      this.getDataBarang();
    },
    async getDashboardData() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/dashboard",
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        (this.totalTransactions = response.data.data.totalTransactions),
          (this.totalBorrowers = response.data.data.totalBorrowers),
          (this.totalItems = response.data.data.totalItems),
          (this.totalUsers = response.data.data.totalUsers),
          (this.totalItemDipinjam = response.data.data.itemDipinjam),
          (this.totalItemTidakDipinjam = response.data.data.itemTidakDipinjam),
          (this.totalItem = response.data.data.total);
      } catch (error) {
        console.log(error);
      }
    },
    async getDataBarang() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/dashboard`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        const totalItemDipinjam = response.data.data.itemDipinjam;
        const totalItemTidakDipinjam = response.data.data.itemTidakDipinjam;
        (this.chartOptions5 = {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: ["Item Dipinjam", "Item Tidak Dipinjam"],
          },
        }),
          (this.series5 = [
            {
              name: "series-1",
              data: [totalItemDipinjam, totalItemTidakDipinjam],
            },
          ]);
      } catch (error) {
        console.log(error);
      }
    },
    async getDataBarangById() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/dashboard?item_id=${this.id_item}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        const totalItemDipinjam = response.data.data.itemDipinjam;
        const totalItemTidakDipinjam = response.data.data.itemTidakDipinjam;
        (this.chartOptions5 = {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: ["Item Dipinjam", "Item Tidak Dipinjam"],
          },
        }),
          (this.series5 = [
            {
              name: "series-1",
              data: [totalItemDipinjam, totalItemTidakDipinjam],
            },
          ]);
      } catch (error) {
        console.log(error);
      }
    },
    async getDataTransaksiByMonth() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/dashboard?start_month=${this.start_month}&start_year=${this.start_year}&end_month=${this.end_month}&end_year=${this.end_year}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        const listDateTransaksi = response.data.data.listDateTransaksi;
        const listTotalTransaksi = response.data.data.listTotalTransaksi;
        (this.chartOptions6 = {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: listDateTransaksi,
          },
        }),
          (this.series6 = [
            {
              name: "series-1",
              data: listTotalTransaksi,
            },
          ]);
      } catch (error) {
        console.log(error);
      }
    },
    async getDataTransaksiByDate() {
      try {
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
        // console.log(this.date[0]);
        const response = await axios.get(
          `http://localhost:8000/api/transaksibydate?start_date=${start_date}&end_date=${end_date}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        const listDateTransaksi = response.data.data.listDateTransaksi;
        const listTotalTransaksi = response.data.data.listTotalTransaksi;
        (this.chartOptions7 = {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: listDateTransaksi,
          },
        }),
          (this.series7 = [
            {
              name: "series-1",
              data: listTotalTransaksi,
            },
          ]);
      } catch (error) {
        console.log(error);
      }
    },
    async getDataTransaksiByDateDefault() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/transaksibydate`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        // console.log(response);
        const listDateTransaksi = response.data.data.listDateTransaksi;
        const listTotalTransaksi = response.data.data.listTotalTransaksi;
        (this.chartOptions7 = {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: listDateTransaksi,
          },
        }),
          (this.series7 = [
            {
              name: "series-1",
              data: listTotalTransaksi,
            },
          ]);
      } catch (error) {
        console.log(error);
      }
    },
    resetDataTransaksiByMonth(e) {
      e.preventDefault();
      // SET DEFAULT MONTH DATA DO
      if (new Date().getMonth()) {
        this.start_month = "01";
      }
      // SET DEFAULT YEAR DATA DO
      this.start_year = new Date().getFullYear();
      // SET DEFAULT MONTH DATA DO
      if (new Date().getMonth() + 1 < 10) {
        this.end_month = `0${new Date().getMonth() + 1}`;
      } else {
        this.end_month = `${new Date().getMonth() + 1}`;
      }
      // SET DEFAULT YEAR DATA DO
      this.end_year = new Date().getFullYear();
      this.getDataTransaksiByMonth();
    },
    resetDataTransaksiByDate(e) {
      e.preventDefault();
      this.date = [];
      const date = new Date();
      date.setDate(1);
      date.setMonth(new Date().getMonth() - 1);
      date.setFullYear(new Date().getFullYear());
      // console.log(date);
      this.date.push(date);
      this.date.push(new Date());

      this.getDataTransaksiByDateDefault();
    },
    getItem() {
      axios
        .get(`http://localhost:8000/api/item?paginate=all`, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          // console.log(response);
          this.items = response.data.data.data;
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/dashboard", {
        headers: { Authorization: "Bearer " + this.token },
      })
      .then((data) => {
        const totalItemDipinjam = data.data.data.itemDipinjam;
        const totalItemTidakDipinjam = data.data.data.itemTidakDipinjam;
        (this.chartOptions3 = {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: ["Item Dipinjam", "Item Tidak Dipinjam"],
          },
        }),
          (this.series3 = [
            {
              name: "series-1",
              data: [totalItemDipinjam, totalItemTidakDipinjam],
            },
          ]);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:8000/api/dashboard", {
        headers: { Authorization: "Bearer " + this.token },
      })
      .then((data) => {
        const listDateTransaksi = data.data.data.listDateTransaksi;
        const listTotalTransaksi = data.data.data.listTotalTransaksi;
        (this.chartOptions4 = {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: listDateTransaksi,
          },
        }),
          (this.series4 = [
            {
              name: "series-1",
              data: listTotalTransaksi,
            },
          ]);
      })
      .catch((error) => {
        console.log(error);
      });
    const year = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      this.years.push({
        name: (year - i).toString(),
      });
    }
    const date = new Date();
    //SET DATE TRANSACTION
    date.setDate(1);
    date.setMonth(new Date().getMonth() - 1);
    date.setFullYear(new Date().getFullYear());
    this.date.push(date);
    this.date.push(new Date());
    // SET DEFAULT MONTH
    if (new Date().getMonth()) {
      this.start_month = "01";
    }
    // SET DEFAULT YEAR
    this.start_year = new Date().getFullYear();
    // SET DEFAULT MONTH
    if (new Date().getMonth() + 1 < 10) {
      this.end_month = `0${new Date().getMonth() + 1}`;
    } else {
      this.end_month = `${new Date().getMonth() + 1}`;
    }
    // SET DEFAULT YEAR
    this.end_year = new Date().getFullYear();

    if (!this.loggedIn) {
      return this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style>
.chart-container {
  width: 200px;
  height: 200px;
}
</style>
