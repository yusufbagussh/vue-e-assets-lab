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
              <div class="card-body">{{ totalTransactions }}</div>
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
              <div class="card-body">10</div>
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
              <div class="card-body">10</div>
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
              <div class="card-body">10</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <canvas
          class="chart-container"
          id="myChart"
          :width="100"
          :height="100"
        ></canvas>
      </div>
      <div id="app">
        <PlanetChart />
      </div>
    </section>
  </div>
</template>

<script>
//Coba Chart Fix
import Chart from "chart.js/auto";
export default {
  mounted() {
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [5, 3, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        legend: {
          display: false,
        },
      },
    });
    myChart;
  },
};

//Fetch Data Dasboard Fix
// import { reactive, ref, onMounted } from "vue";
// import { useRouter, useRoute } from "vue-router";
// import axios from "axios";

// export default {
//   setup() {
//     //state posts
//     const dashboard = reactive({
//       totalTransactions: "",
//       totalBorrowers: "",
//       totalItems: "",
//       totalUsers: "",
//     });

//     //vue router
//     const router = useRouter();

//     //vue router
//     const route = useRoute();

//     //mounted
//     onMounted(() => {
//       //get API from Laravel Backend
//       axios
//         .get(`http://localhost:8000/api/dashboard/`)
//         .then((response) => {
//           console.log(response);
//           //assign state posts with response data
//           dashboard.totalTransactions = response.data.data.totalTransactions;
//           dashboard.totalBorrowers = response.data.data.totalBorrowers;
//           dashboard.totalItems = response.data.data.totalItems;
//           dashboard.totalUsers = response.data.data.totalUsers;
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });

//     //return
//     return {
//       dashboard,
//       router,
//     };
//   },
// };

// import axios from "axios";
// // import Chart from "./components/Chart.vue";

// export default {
//   name: "Dashboard",
//   // components: {
//   //   Chart,
//   // },
//   data() {
//     return {
//       totalTransactions: "",
//       totalBorrowers: "",
//       totalItems: "",
//       totalUsers: "",
//     };
//   },
//   created() {
//     this.getDashboardData();
//     this.mounted();
//   },
//   methods: {
//     async getDashboardData() {
//       try {
//         const response = await axios.get("http://localhost:8000/api/dashboard");
//         console.log(response);
//         (this.totalTransactions = response.data.data.totalTransactions),
//           (this.totalBorrowers = response.data.data.totalBorrowers),
//           (this.totalItems = response.data.data.totalItems),
//           (this.totalUsers = response.data.data.totalUsers);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     mounted() {
//       const ctx = document.getElementById("myChart");
//       const myChart = new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//           datasets: [
//             {
//               label: "# of Votes",
//               data: [5, 3, 3, 5, 2, 3],
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(255, 206, 86, 0.2)",
//                 "rgba(75, 192, 192, 0.2)",
//                 "rgba(153, 102, 255, 0.2)",
//                 "rgba(255, 159, 64, 0.2)",
//               ],
//               borderColor: [
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(54, 162, 235, 1)",
//                 "rgba(255, 206, 86, 1)",
//                 "rgba(75, 192, 192, 1)",
//                 "rgba(153, 102, 255, 1)",
//                 "rgba(255, 159, 64, 1)",
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//           responsive: true,
//           legend: {
//             display: false,
//           },
//         },
//       });
//       myChart;
//     },
//   },
// };
</script>

<style>
.chart-container {
  width: 200px;
  height: 200px;
}
</style>
