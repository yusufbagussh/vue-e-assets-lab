<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah User</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store" enctype="multipart/form-data">
              <div class="form-group flex-column justify-content-star">
                <label for="title" class="font-weight-bold">Nama User</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.user_nama"
                  placeholder="Masukkan nama user"
                />
                <!-- validation -->
                <div
                  v-if="validation.user_nama"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.user_nama[0] }}
                </div>
              </div>
              <div class="form-group">
                <label class="font-weight-bold">Role User</label>
                <select class="form-control" v-model="user.user_role">
                  <option
                    v-for="role in roles"
                    :key="role.role_id"
                    :value="role.role_id"
                  >
                    {{ role.role_nama }}
                  </option>
                </select>
                <!-- validation -->
                <div
                  v-if="validation.user_role"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.user_role[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Email</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.user_email"
                  placeholder="Masukkan email user"
                />
                <!-- validation -->
                <div
                  v-if="validation.user_email"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.user_email[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                  placeholder="Masukkan password user"
                />
                <!-- validation -->
                <div v-if="validation.password" class="mt-2 alert alert-danger">
                  {{ validation.password[0] }}
                </div>
              </div>
              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state posts
    const user = reactive({
      user_nama: "",
      user_role: "",
      user_email: "",
      password: "",
    });

    //state validation
    const validation = ref([]);

    let roles = ref([]);

    //vue router
    const router = useRouter();

    //mounted data role
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/role")
        .then((response) => {
          //assign state roles with response data
          // console.log(response);
          roles.value = response.data.data;
          // console.log(roles.value[0]);
          // console.log(roles.data);
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
        });
    });

    //method store
    function store() {
      let user_nama = user.user_nama;
      let user_role = user.user_role;
      let user_email = user.user_email;
      let password = user.password;
      axios
        .post("http://localhost:8000/api/user", {
          user_nama: user_nama,
          user_role: user_role,
          user_email: user_email,
          password: password,
        })
        .then(() => {
          //redirect ke user index
          router.push({
            name: "User",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
          console.log(validation.value);
        });
    }

    //return
    return {
      user,
      validation,
      router,
      store,
      roles,
    };
  },
};
</script>
