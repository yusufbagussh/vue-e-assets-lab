<template>
  <div id="app">
    <section class="section">
      <div class="d-flex flex-wrap align-items-stretch">
        <div
          class="col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white"
        >
          <div class="p-4 m-3">
            <!-- <img
              src="assets/img/stisla-fill.svg"
              alt="logo"
              width="80"
              class="shadow-light rounded-circle mb-5 mt-2"
            /> -->
            <h4 class="text-dark font-weight-normal">
              Welcome to <span class="font-weight-bold">E-Assets</span>
            </h4>
            <p class="text-muted">
              Please register if you don't already have an account.
            </p>
            <form @submit.prevent="store" action="#" class="needs-validation">
              <div class="form-group">
                <label for="user_nama">Name</label>
                <input
                  id="user_nama"
                  type="text"
                  class="form-control"
                  name="user_nama"
                  v-model="user_nama"
                  tabindex="1"
                  autofocus
                />
                <div
                  v-if="validation.user_nama"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.user_nama[0] }}
                </div>
                <div class="invalid-feedback">Please fill in your name</div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  name="email"
                  tabindex="1"
                  v-model="user_email"
                  required
                  autofocus
                />
                <div
                  v-if="validation.user_email"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.user_email[0] }}
                </div>
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
                  v-model="password"
                  tabindex="2"
                  required
                />
                <div v-if="validation.password" class="mt-2 alert alert-danger">
                  {{ validation.password[0] }}
                </div>
                <div class="invalid-feedback">please fill in your password</div>
              </div>

              <div class="form-group">
                <div class="d-block">
                  <label for="password" class="control-label"
                    >Konfirmasi Password</label
                  >
                </div>
                <input
                  id="password_confirmation"
                  type="password"
                  v-model="password_confirmation"
                  class="form-control"
                  name="password_confirmation"
                  tabindex="2"
                  required
                />
                <div
                  v-if="validation.password_confirmation"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.password_confirmation[0] }}
                </div>
                <div class="invalid-feedback">
                  please fill in your confirmation password
                </div>
              </div>

              <input
                id="user_role"
                type="hidden"
                class="form-control"
                name="user_role"
                tabindex="2"
              />

              <div class="form-group text-right">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg btn-icon icon-right"
                  tabindex="4"
                >
                  Register
                </button>
              </div>
              <div class="mt-2 text-center">
                Already have an account?
                <router-link to="/login"> <span>Login here</span></router-link>
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
          id="bg-auth2"
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

export default {
  name: "Register",
  data() {
    return {
      user_nama: "",
      user_email: "",
      password: "",
      password_confirmation: "",
      user_role: 2,
      validation: [],
    };
  },
  methods: {
    async store() {
      try {
        await axios
          .post("http://localhost:8000/api/register", {
            user_nama: this.user_nama,
            user_email: this.user_email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            user_role: this.user_role,
          })
          .then((data) => {
            this.$swal.fire(
              "Sukses!",
              "Akun anda berhasil terdaftar, silahkan login",
              "success"
            );
          });
        (this.user_nama = ""),
          (this.user_email = ""),
          (this.password = ""),
          (this.password_confirmation = ""),
          (this.user_role = ""),
          this.$router.push("/login");
      } catch (error) {
        this.validation = error.response.data;
      }
    },
  },
  mounted() {
    const gambar = document.querySelector("#bg-auth2");
    gambar.style.backgroundImage = "url('assets/img/unsplash/login-bg.jpg')";
  },
};
</script>
