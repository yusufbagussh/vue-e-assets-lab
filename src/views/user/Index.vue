<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>List User</h4>
              <div class="card-header-action">
                <router-link to="/user/add" class="btn btn-primary"
                  >Tambah User</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Nama User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                      <td>{{ user.user_nama }}</td>
                      <td>{{ user.user_email }}</td>
                      <td>{{ user.role.role_nama }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditUser',
                            params: { id: user.id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="userDelete(user.id)"
                          class="btn btn-danger btn-action"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
import { onMounted, ref } from "vue";

export default {
  setup() {
    //reactive state
    let users = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/user")
        .then((response) => {
          //assign state users with response data
          console.log(response);
          users.value = response.data.data;
          console.log(users);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function userDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/user/${id}`)
        .then(() => {
          //splice posts
          users.value.splice(users.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      users,
      userDelete,
    };
  },
};
</script>
