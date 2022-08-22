<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Edit Item</h4>
          </div>
          <div class="card-body col-8">
            <form @submit.prevent="update">
              <div class="form-group">
                <label
                  for="title"
                  class="font-weight-bold d-flex flex-column justify-content-start"
                  >Nama Item</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="item.item_nama"
                  placeholder="Masukkan nama item"
                />
                <!-- validation -->
                <div
                  v-if="validation.item_nama"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_nama[0] }}
                </div>
              </div>
              <div class="form-group">
                <label>Lokasi Penyimpanan</label>
                <select class="form-control" v-model="item.item_lokasi">
                  <option selected>Pilih lokasi Penyimpanan</option>
                  <option
                    v-for="location in locations"
                    :key="location.lokasi_id"
                    :value="location.lokasi_id"
                  >
                    {{ location.lokasi_nama }}
                  </option>
                </select>
                <!-- validation -->
                <div
                  v-if="validation.item_lokasi"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_lokasi[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Jumlah Item</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.item_jumlah"
                  placeholder="Masukkan Judul Post"
                />
                <!-- validation -->
                <div
                  v-if="validation.item_jumlah"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_jumlah[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Kondisi Item</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item.item_kondisi"
                  placeholder="Masukkan Judul Post"
                />
                <!-- validation -->
                <div
                  v-if="validation.item_kondisi"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_kondisi[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold"
                  >Spesifikasi Item</label
                >
                <!-- <input
                  type="text"
                  class="form-control"
                  v-model="item.item_spesifikasi"
                  placeholder="Masukkan kondisi item"
                /> -->
                <textarea
                  class="form-control"
                  v-model="item.item_spesifikasi"
                  placeholder="Masukkan spesifikasi item"
                  width="100"
                ></textarea>
                <!-- validation -->
                <div
                  v-if="validation.item_spesifikasi"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_spesifikasi[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Status Item</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item.item_status"
                  placeholder="Masukkan Judul Post"
                />
                <!-- validation -->
                <div
                  v-if="validation.item_status"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_status[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="title" class="font-weight-bold">Gambar Item</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item.item_gambar"
                  placeholder="Masukkan Judul Post"
                />
                <!-- validation -->
                <div
                  v-if="validation.item_gambar"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_gambar[0] }}
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state posts
    const item = reactive({
      item_nama: "",
      item_lokasi: "",
      item_jumlah: "",
      item_gambar: "",
      item_spesifikasi: "",
      item_kondisi: "",
      item_status: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    let locations = ref([]);

    //vue router
    const route = useRoute();

    //mounted data location
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/location")
        .then((response) => {
          //assign state locations with response data
          // console.log(response);
          locations.value = response.data.data;
          // console.log(locations.value[0]);
          // console.log(locations.data);
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
        });
    });

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(`http://localhost:8000/api/item/${route.params.id}`)
        .then((response) => {
          console.log(response);
          //assign state posts with response data
          item.item_nama = response.data.data[0].item_nama;
          item.item_lokasi = response.data.data[0].item_lokasi;
          item.item_jumlah = response.data.data[0].item_jumlah;
          item.item_gambar = response.data.data[0].item_gambar;
          item.item_spesifikasi = response.data.data[0].item_spesifikasi;
          item.item_kondisi = response.data.data[0].item_kondisi;
          item.item_status = response.data.data[0].item_status;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
      let item_nama = item.item_nama;
      let item_lokasi = item.item_lokasi;
      let item_jumlah = item.item_jumlah;
      let item_gambar = item.item_gambar;
      let item_kondisi = item.item_kondisi;
      let item_spesifikasi = item.item_spesifikasi;
      let item_status = item.item_status;

      axios
        .put(`http://localhost:8000/api/item/${route.params.id}`, {
          item_nama: item_nama,
          item_lokasi: item_lokasi,
          item_jumlah: item_jumlah,
          item_gambar: item_gambar,
          item_spesifikasi: item_spesifikasi,
          item_kondisi: item_kondisi,
          item_status: item_status,
        })
        .then(() => {
          //redirect ke item index
          router.push({
            name: "Item",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      item,
      validation,
      router,
      update,
      locations,
    };
  },
};
</script>
