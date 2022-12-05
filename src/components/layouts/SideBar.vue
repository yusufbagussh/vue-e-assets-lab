<template>
  <div class="main-sidebar">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <a href="index.html">E-Assets</a>
      </div>
      <div class="sidebar-brand sidebar-brand-sm">
        <a href="index.html">St</a>
      </div>
      <ul class="sidebar-menu">
        <!-- <li class="nav-item dropdown active"> -->
        <li
          class="nav-item"
          v-bind:class="{ active: currentRouteName === 'Dashboard' }"
        >
          <router-link to="/"
            ><i class="fas fa-fire"></i><span>Dashboard</span></router-link
          >
        </li>
        <li
          class="nav-item dropdown"
          v-bind:class="{
            active:
              currentRouteName === 'Location' ||
              currentRouteName === 'EditLocation' ||
              currentRouteName === 'AddLocation',
          }"
        >
          <router-link to="/location" class="nav-link"
            ><i class="fas fa-map-marker-alt"></i>
            <span>Lokasi</span></router-link
          >
        </li>
        <li
          class="nav-item dropdown"
          v-bind:class="{
            active:
              currentRouteName === 'Item' ||
              currentRouteName === 'EditItem' ||
              currentRouteName === 'AddItem',
          }"
        >
          <router-link to="/item" class="nav-link"
            ><i class="fas fa-th"></i> <span>Item</span></router-link
          >
        </li>
        <li
          class="nav-item dropdown"
          v-bind:class="{
            active:
              currentRouteName === 'Major' ||
              currentRouteName === 'EditMajor' ||
              currentRouteName === 'AddMajor',
          }"
        >
          <router-link to="/major" class="nav-link" href="credits.html"
            ><i class="fas fa-pencil-ruler"></i>
            <span>Jurusan</span></router-link
          >
        </li>
        <li
          class="nav-item dropdown"
          v-bind:class="{
            active:
              currentRouteName === 'Borrower' ||
              currentRouteName === 'EditBorrower' ||
              currentRouteName === 'AddBorrower',
          }"
        >
          <router-link to="/borrower" href="#" class="nav-link"
            ><i class="far fa-user"></i> <span>Peminjam</span></router-link
          >
        </li>
        <li
          v-if="userRole == 1"
          class="nav-item dropdown"
          v-bind:class="{
            active:
              currentRouteName === 'Role' ||
              currentRouteName === 'EditRole' ||
              currentRouteName === 'AddRole',
          }"
        >
          <router-link to="/role" class="nav-link" href="credits.html"
            ><i class="fas fa-pencil-ruler"></i> <span>Role</span></router-link
          >
        </li>
        <li
          class="nav-item dropdown"
          v-if="userRole == 1"
          v-bind:class="{
            active:
              currentRouteName === 'User' ||
              currentRouteName === 'EditUser' ||
              currentRouteName === 'AddUser',
          }"
        >
          <router-link to="/user" href="#" class="nav-link"
            ><i class="far fa-user"></i> <span>Pengguna</span></router-link
          >
        </li>
        <li
          class="nav-item dropdown"
          v-bind:class="{
            active:
              currentRouteName === 'Transaction' ||
              currentRouteName === 'EditTransaction' ||
              currentRouteName === 'AddTransaction',
          }"
        >
          <router-link to="/transaction" href="#" class="nav-link"
            ><i class="far fa-file-alt"></i> <span>Transaksi</span></router-link
          >
        </li>
        <!-- <li class="nav-item dropdown">
          <router-link to="/detailtransaction" href="#" class="nav-link"
            ><i class="far fa-file-alt"></i> <span>Report</span></router-link
          >
        </li> -->
        <!-- <li class="nav-item dropdown">
          <router-link to="/dashboard2" href="#" class="nav-link"
            ><i class="far fa-file-alt"></i>
            <span>Dashboard2</span></router-link
          >
        </li> -->
        <!-- <li class="nav-item dropdown">
          <router-link to="" href="#" class="nav-link"
            ><i class="fas fa-th-large"></i>
            <span>Components</span></router-link
          >
        </li> -->
        <!-- <li
          @click="logout"
          class="list-group-item text-dark text-decoration-none"
          style="cursor: pointer"
        >
          LOGOUT
        </li>
        <li>
          <router-link to="/login" class="nav-link" href="blank.html"
            ><i class="far fa-square"></i> <span>Login</span></router-link
          >
        </li>
        <li>
          <router-link to="" @click="logout" class="nav-link"
            ><i class="far fa-square"></i> <span>Logout</span></router-link
          >
        </li>
        <li>
          <router-link to="/register" class="nav-link" href="blank.html"
            ><i class="far fa-square"></i> <span>Register</span></router-link
          >
        </li> -->
      </ul>
      <div class="mt-4 mb-4 p-3 hide-sidebar-mini">
        <button
          class="btn btn-primary btn-lg btn-block btn-icon-split"
          @click="logout"
        >
          <i class="fas fa-rocket"></i> Keluar
        </button>
      </div>
    </aside>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: null,
      userRole: localStorage.getItem("userRole"),
      token: localStorage.getItem("token"),
      // routeName: "Dashboard",
    };
  },
  methods: {
    // logout() {
    //   axios
    //     .post("http://localhost:8000/api/logout", {
    //       headers: { Authorization: "Bearer " + this.token },
    //     })
    //     .then(() => {
    //       //remove localStorage
    //       localStorage.removeItem("loggedIn");
    //       //redirect
    //       return this.$router.push({ name: "Login" });
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    logout() {
      this.$swal
        .fire({
          icon: "warning",
          title: "Apakah anda yakin?",
          text: "Anda akan keluar dari web ini!",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        })
        .then((result) => {
          // Send request to the server
          if (result.value) {
            axios
              .post("http://localhost:8000/api/logout", {
                headers: { Authorization: "Bearer " + this.token },
              })
              .then(() => {
                this.$swal.fire("Sukses!", "Anda Berhasil Log Out.", "success");
                //remove localStorage
                localStorage.removeItem("loggedIn");
                //redirect
                return this.$router.push({ name: "Login" });
              })
              .catch((data) => {
                this.$swal.fire("Failed!", data.message, "warning");
              });
          }
        });
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
