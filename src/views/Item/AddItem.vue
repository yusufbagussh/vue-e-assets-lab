<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Item</h4>
          </div>
          <div class="card-body col-8">
            <form @submit.prevent="store" enctype="multipart/form-data">
              <div class="form-group flex-column justify-content-star">
                <label for="title" class="font-weight-bold">Nama Item</label>
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
                  placeholder="Masukkan jumlah item"
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
                  placeholder="Masukkan kondisi item"
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
                  placeholder="Masukkan kondisi item"
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
                  placeholder="Masukkan status item"
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
                  placeholder="Masukkan status item"
                />
                <!-- validation -->
                <div
                  v-if="validation.item_gambar"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.item_gambar[0] }}
                </div>
              </div>
              <!-- <div class="form-group">
                <label for="title" class="font-weight-bold">Gambar Item</label>
                <input
                  type="file"
                  class="form-control mb-2"
                  v-on:change="onChange"
                />
                <div>
                  <img
                    v-bind:src="imgPreview"
                    width="100"
                    height="100"
                    alt="item-image"
                  />
                </div>
              </div> -->
              <button type="submit" class="btn btn-primary">Simpan</button>
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
    const item = reactive({
      item_nama: "",
      item_lokasi: "Pilih lokasi penyimpanan",
      item_jumlah: "",
      item_gambar: "item-image/default.png",
      item_kondisi: "",
      item_spesifikasi: "",
      item_status: "",
    });

    //state validation
    const validation = ref([]);

    let locations = ref([]);

    //vue router
    const router = useRouter();

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

    //method store
    function store() {
      let item_nama = item.item_nama;
      let item_lokasi = item.item_lokasi;
      let item_jumlah = item.item_jumlah;
      let item_gambar = item.item_gambar;
      let item_kondisi = item.item_kondisi;
      let item_spesifikasi = item.item_spesifikasi;
      let item_status = item.item_status;

      axios
        .post("http://localhost:8000/api/item", {
          item_nama: item_nama,
          item_lokasi: item_lokasi,
          item_jumlah: item_jumlah,
          item_gambar: item_gambar,
          item_kondisi: item_kondisi,
          item_spesifikasi: item_spesifikasi,
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
          console.log(validation.value);
        });
    }

    //return
    return {
      item,
      validation,
      router,
      store,
      locations,
    };
  },
};
</script>
