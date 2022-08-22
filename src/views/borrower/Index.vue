<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>List Peminjam</h4>
              <div class="card-header-action">
                <router-link to="/addborrower" class="btn btn-primary"
                  >Tambah Peminjam</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Nama Peminjam</th>
                      <th>Jurusan</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(borrower, index) in borrowers" :key="index">
                      <td>{{ borrower.peminjam_nama }}</td>
                      <td>{{ borrower.major.jurusan_nama }}</td>
                      <td>{{ borrower.peminjam_status }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditBorrower',
                            params: { id: borrower.peminjam_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="borrowerDelete(borrower.peminjam_id)"
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
    let borrowers = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/borrower")
        .then((response) => {
          //assign state borrowers with response data
          console.log(response);
          borrowers.value = response.data.data;
          console.log(borrowers);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function borrowerDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/borrower/${id}`)
        .then(() => {
          //splice posts
          borrowers.value.splice(borrowers.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      borrowers,
      borrowerDelete,
    };
  },
};
</script>
