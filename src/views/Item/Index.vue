<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>List Items</h4>
              <div class="card-header-action">
                <router-link to="/additem" class="btn btn-primary"
                  >Tambah Item</router-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Nama Item</th>
                      <th>Lokasi</th>
                      <th>Kondisi</th>
                      <th>Gambar</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td>{{ item.item_nama }}</td>
                      <td>{{ item.location.lokasi_nama }}</td>
                      <td>{{ item.item_kondisi }}</td>
                      <td>
                        <div v-if="item.item_gambar">
                          <img
                            alt="item-image"
                            width="100"
                            v-bind:src="
                              'http://localhost:8000/storage/' +
                              item.item_gambar
                            "
                          />
                        </div>
                      </td>
                      <td class="text-center">
                        <router-link
                          :to="{
                            name: 'EditItem',
                            params: { id: item.item_id },
                          }"
                          class="btn btn-primary btn-action mr-1"
                          ><i class="fas fa-pencil-alt"></i
                        ></router-link>
                        <button
                          @click.prevent="itemDelete(item.item_id)"
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
    let items = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/item")
        .then((response) => {
          //assign state items with response data
          // console.log(response);
          items.value = response.data.data;
          // console.log(items.value[0]);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function itemDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/item/${id}`)
        .then(() => {
          //splice posts
          items.value.splice(items.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      items,
      itemDelete,
    };
  },
};
</script>
