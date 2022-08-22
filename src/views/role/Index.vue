<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>List Role</h4>
              <div class="card-header-action">
                <router-link to="/role/add" class="btn btn-primary"
                  >Tambah Role</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Nama Role</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(role, index) in roles" :key="index">
                      <td>{{ role.role_nama }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditRole',
                            params: { id: role.role_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="roleDelete(role.role_id)"
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
    let roles = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/role")
        .then((response) => {
          //assign state roles with response data
          console.log(response);
          roles.value = response.data.data;
          console.log(roles);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function roleDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/role/${id}`)
        .then(() => {
          //splice posts
          roles.value.splice(roles.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      roles,
      roleDelete,
    };
  },
};
</script>
