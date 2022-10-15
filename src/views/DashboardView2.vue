<template>
  <div class="main-content">
    <section class="section">
      <div class="section-header">
        <h1>Dashboard</h1>
      </div>
      <div class="dashboard" style="margin-top: 80px">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  MAIN MENU
                  <hr />
                  <ul class="list-group">
                    <router-link
                      :to="{ name: 'Dashboard' }"
                      class="list-group-item text-dark text-decoration-none"
                      >DASHBOARD</router-link
                    >
                    <li
                      @click="logout"
                      class="list-group-item text-dark text-decoration-none"
                      style="cursor: pointer"
                    >
                      LOGOUT
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card">
                <div class="card-body">
                  DASHBOARD
                  <hr />
                  Selamat Datang <strong>{{ userNama }}</strong>
                </div>
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
import Api from "../api/api.js";

export default {
  name: "Dashboard",

  data() {
    return {
      //state loggedIn with localStorage
      loggedIn: localStorage.getItem("loggedIn"),
      //state token
      token: localStorage.getItem("token"),
      //state user logged In
      user: [],
      //
      userNama: localStorage.getItem("userNama"),
    };
  },

  created() {
    axios
      .get("http://localhost:8000/api/user", {
        headers: { Authorization: "Bearer " + this.token },
      })
      .then((response) => {
        this.user = response.data.data.data[0]; // assign response to state user
        // console.log(this.user);
        // console.log(this.token);
        // console.log(this.userNama);
      });
  },

  methods: {
    logout() {
      Api.post("/logout").then(() => {
        //remove localStorage
        localStorage.removeItem("loggedIn");

        //redirect
        return this.$router.push({ name: "Login" });
      });
    },
  },

  //check user logged in or not
  mounted() {
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
