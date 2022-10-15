<template>
  <div class="main-content">
    <div id="app">
      <section class="section">
        <div class="d-flex flex-wrap align-items-stretch">
          <div class="p-4 m-3">
            <img
              src="assets/img/stisla-fill.svg"
              alt="logo"
              width="80"
              class="shadow-light rounded-circle mb-5 mt-2"
            />
            <h4 class="text-dark font-weight-normal">
              Welcome to <span class="font-weight-bold">Stisla</span>
            </h4>
            <p class="text-muted">
              Before you get started, you must login or register if you don't
              already have an account.
            </p>
            <form @submit.prevent="store">
              <div class="form-group">
                <label for="email">Name</label>
                <input
                  id="user_nama"
                  type="text"
                  class="form-control"
                  name="user_nama"
                  v-model="form.user_nama"
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
                  id="user_email"
                  type="email"
                  class="form-control"
                  name="user_email"
                  v-model="form.user_email"
                  tabindex="1"
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
                  v-model="form.password"
                  tabindex="2"
                />
                <div v-if="validation.password" class="mt-2 alert alert-danger">
                  {{ validation.password[0] }}
                </div>
                <div class="invalid-feedback">please fill in your password</div>
              </div>

              <div class="form-group">
                <div class="d-block">
                  <label for="password" class="control-label"
                    >Password Confirmation</label
                  >
                </div>
                <input
                  id="password_confirmation"
                  type="password"
                  class="form-control"
                  name="password_confirmation"
                  v-model="form.password_confirmation"
                  tabindex="2"
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
                v-model="form.user_role"
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
            </form>

            <div class="text-center mt-5 text-small">
              Copyright &copy; Your Company. Made with 💙 by Stisla
              <div class="mt-2">
                <a href="#">Privacy Policy</a>
                <div class="bullet"></div>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
// import axios from "axios";

// export default {
//   name: "Register",
//   data() {
//     return {
//       user_nama: "",
//       user_email: "",
//       password: "",
//       password_confirmation: "",
//       user_role: 2,
//       validation: [],
//     };
//   },
//   methods: {
//     async store() {
//       try {
//         await axios.post("http://localhost:8000/api/form", {
//           user_nama: this.user_nama,
//           user_email: this.user_email,
//           password: this.password,
//           password_confirmation: this.password_confirmation,
//           user_role: this.user_role,
//         });
//         (this.user_nama = ""),
//           (this.user_email = ""),
//           (this.password = ""),
//           (this.password_confirmation = ""),
//           (this.user_role = ""),
//           this.$router.push("/login");
//       } catch (error) {
//         console.log(error.response.data);
//         this.validation.value = error.response.data;
//         console.log(this.validation);
//       }
//     },
//   },
// };

import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state posts
    const form = reactive({
      user_nama: "",
      user_email: "",
      user_role: 2,
      password: "",
      password_confirmation: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store() {
      let user_nama = form.user_nama;
      let user_email = form.user_email;
      let password = form.password;
      let password_confirmation = form.password_confirmation;
      let user_role = form.user_role;

      axios
        .post("http://localhost:8000/api/register", {
          user_nama: user_nama,
          user_email: user_email,
          user_role: user_role,
          password: password,
          password_confirmation: password_confirmation,
        })
        .then(() => {
          //redirect ke login
          router.push({
            name: "Login",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      form,
      validation,
      router,
      store,
    };
  },
};
</script>
