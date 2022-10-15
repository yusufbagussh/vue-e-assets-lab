<template>
  <div class="main-wrapper">
    <div class="navbar-bg"></div>
    <div v-if="loggedIn">
      <!-- NavBar -->
      <NavBar />
      <!-- SideBar -->
      <SideBar />
      <!-- Main Content -->
      <router-view />
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
  <!-- <Footer /> -->
</template>

<script>
import NavBar from "./components/layouts/NavBar.vue";
import SideBar from "./components/layouts/SideBar.vue";
import Footer from "./components/layouts/Footer.vue";
export default {
  name: "App",
  components: {
    NavBar,
    SideBar,
    Footer,
  },
  data() {
    return {
      //state loggedIn with localStorage
      // loggedIn: localStorage.getItem("loggedIn"),
      loggedIn: null,
    };
  },
  methods: {
    getLoggedIn() {
      this.loggedIn = localStorage.getItem("loggedIn");
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getLoggedIn();
      },
    },
  },
};
</script>
