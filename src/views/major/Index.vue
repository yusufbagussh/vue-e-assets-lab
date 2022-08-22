<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>List Items</h4>
              <div class="card-header-action">
                <router-link to="/addmajor" class="btn btn-primary"
                  >Tambah Jurusan</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Jurusan</th>
                      <th>Fakultas</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(major, index) in majors" :key="index">
                      <td>{{ major.jurusan_nama }}</td>
                      <td>{{ major.jurusan_fakultas }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditMajor',
                            params: { id: major.jurusan_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="majorDelete(major.jurusan_id)"
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
    let majors = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/major")
        .then((response) => {
          console.log(response);
          //assign state majors with response data
          majors.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function majorDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/major/${id}`)
        .then(() => {
          //splice posts
          majors.value.splice(majors.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      majors,
      majorDelete,
    };
  },
};
</script>
