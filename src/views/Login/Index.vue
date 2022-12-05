<template>
  <div id="app">
    <section class="section">
      <div class="d-flex flex-wrap align-items-stretch">
        <div
          class="col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white"
        >
          <div class="p-4 m-3">
            <img
              src="assets/img/stisla-fill.svg"
              alt="logo"
              width="80"
              class="shadow-light rounded-circle mb-5 mt-2"
            />
            <h4 class="text-dark font-weight-normal">
              Welcome to <span class="font-weight-bold">E-Assets</span>
            </h4>
            <p class="text-muted">
              Before you get started, you must login or register if you don't
              already have an account.
            </p>
            <div v-if="loginFailed" class="alert alert-danger">
              {{ validation.message[0] }}
            </div>
            <form @submit.prevent="login" action="#" class="needs-validation">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  v-model="user.user_email"
                  name="email"
                  tabindex="1"
                  required
                  autofocus
                />
                <div class="invalid-feedback">Please fill in your email</div>
              </div>

              <div class="form-group">
                <div class="d-block">
                  <label for="password" class="control-label">Password</label>
                </div>
                <input
                  id="password"
                  type="password"
                  class="form-control"
                  name="password"
                  tabindex="2"
                  v-model="user.password"
                  required
                />
                <div class="invalid-feedback">please fill in your password</div>
              </div>

              <div class="form-group">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    name="remember"
                    class="custom-control-input"
                    tabindex="3"
                    id="remember-me"
                  />
                  <label class="custom-control-label" for="remember-me"
                    >Remember Me</label
                  >
                </div>
              </div>

              <div class="form-group text-right">
                <a href="auth-forgot-password.html" class="float-left mt-3">
                  Forgot Password?
                </a>
                <button
                  type="submit"
                  class="btn btn-primary btn-lg btn-icon icon-right"
                  tabindex="4"
                >
                  Login
                </button>
              </div>

              <div class="mt-5 text-center">
                Don't have an account?
                <router-link to="/register">
                  <span>Create new one</span></router-link
                >
              </div>
            </form>

            <div class="text-center mt-5 text-small">
              Copyright &copy;
              <div class="mt-2">
                <a href="#">Privacy Policy</a>
                <div class="bullet"></div>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-lg-8 col-12 order-lg-2 order-1 min-vh-100 background-walk-y position-relative overlay-gradient-bottom"
          data-background="assets/img/unsplash/login-bg.jpg"
          id="bg-auth"
        >
          <div class="absolute-bottom-left index-2">
            <div class="text-light p-5 pb-2">
              <div class="mb-5 pb-3">
                <h1 class="mb-2 display-4 font-weight-bold">Good Morning</h1>
                <h5 class="font-weight-normal text-muted-transparent">
                  Bali, Indonesia
                </h5>
              </div>
              Photo by
              <a
                class="text-light bb"
                target="_blank"
                href="https://unsplash.com/photos/a8lTjWJJgLA"
                >Justin Kauffman</a
              >
              on
              <a
                class="text-light bb"
                target="_blank"
                href="https://unsplash.com"
                >Unsplash</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import Api from "../../api/api.js";

export default {
  name: "Login",

  data() {
    return {
      //state loggedIn with localStorage
      loggedIn: localStorage.getItem("loggedIn"),
      //state token
      token: localStorage.getItem("token"),
      //state token
      userNama: localStorage.getItem("userNama"),
      userEmail: localStorage.getItem("userEmail"),
      userRole: localStorage.getItem("userRole"),
      userId: localStorage.getItem("userId"),
      //state user
      user: [],
      //state validation
      validation: [],
      //state login failed
      loginFailed: null,
      //state user
    };
  },
  methods: {
    login() {
      if (this.user.user_email && this.user.password) {
        axios
          .get("http://localhost:8000/sanctum/csrf-cookie")
          .then((response) => {
            //debug cookie
            // console.log(response);

            axios
              .post("api/login", {
                user_email: this.user.user_email,
                password: this.user.password,
              })
              .then((res) => {
                //debug user login
                // console.log(res);

                if (res.data.success) {
                  //set localStorage
                  localStorage.setItem("loggedIn", "true");

                  //set localStorage Token
                  localStorage.setItem("token", res.data.token);

                  //set nama user
                  localStorage.setItem("userNama", res.data.user.user_nama);

                  //set nama user
                  localStorage.setItem("userEmail", res.data.user.user_email);

                  localStorage.setItem("userRole", res.data.user.user_role);

                  localStorage.setItem("userId", res.data.user.id);

                  //change state
                  this.loggedIn = true;

                  //redirect Dashboard
                  return this.$router.push({ name: "Dashboard" });
                } else {
                  //set state login failed
                  this.loginFailed = true;
                }
              })
              .catch((error) => {
                this.validation = error.response.data;
                this.loginFailed = true;
              });
          });
      }

      this.validation = [];

      if (!this.user.user_email) {
        this.validation.user_email = true;
      }

      if (!this.user.password) {
        this.validation.password = true;
      }
    },
  },

  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler() {
  //       this.getLoggedIn();
  //     },
  //   },
  // },

  //check user already logged in
  mounted() {
    if (this.loggedIn) {
      return this.$router.push({ name: "Dashboard" });
    }
    const gambar = document.querySelector("#bg-auth");
    gambar.style.backgroundImage = "url('assets/img/unsplash/login-bg.jpg')";
  },
};
</script>
