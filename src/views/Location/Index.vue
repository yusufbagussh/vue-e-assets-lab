<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>List Items</h4>
              <div class="card-header-action">
                <router-link to="/addlocation" class="btn btn-primary"
                  >Tambah Ruang</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Lokasi Penyimpanan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(location, index) in locations" :key="index">
                      <td>{{ location.lokasi_nama }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'EditLocation',
                            params: { id: location.lokasi_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="locationDelete(location.lokasi_id)"
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
    let locations = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/location")
        .then((response) => {
          //assign state locations with response data
          console.log(response);
          locations.value = response.data.data;
          console.log(locations);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function locationDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/location/${id}`)
        .then(() => {
          //splice posts
          locations.value.splice(locations.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      locations,
      locationDelete,
    };
  },
};
</script>
