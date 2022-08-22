<template>
  <div class="main-wrapper">
    <div class="navbar-bg"></div>
    <!-- NavBar -->
    <NavBar />
    <!-- SideBar -->
    <SideBar />
    <!-- Main Content -->
    <router-view />
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
};
</script>
