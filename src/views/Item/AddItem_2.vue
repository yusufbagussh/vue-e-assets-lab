<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Item</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <div class="form-group">
                <label>Nama Item</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Lokasi</label>
                <select class="form-control">
                  <option value="Lokasi 1">Lokasi 1</option>
                  <option value="Lokasi 2">Lokasi 2</option>
                  <option value="Lokasi 3">Lokasi 3</option>
                </select>
              </div>
              <div class="form-group">
                <label>Kondisi Item</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Gambar Item</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Jumlah Item</label>
                <input type="number" class="form-control" />
              </div>
              <div class="form-group">
                <label>Status Item</label>
                <select class="form-control">
                  <option value="Tersedia">Tersedia</option>
                  <option value="Tidak Tersedia">Tidak Tersedia</option>
                </select>
              </div>
              <div class="form-group">
                <label>Spesifikasi Item</label>
                <textarea class="form-control"></textarea>
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state posts
    const post = reactive({
      item_nama: "",
      item_lokasi: "",
      item_jumlah: "",
      item_gambar: "",
      item_kondisi: "",
      item_status: "",
      item_spesifikasi: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store() {
      let item_nama = post.item_nama;
      let item_lokasi = post.item_lokasi;
      let item_jumlah = post.item_jumlah;
      let item_gambar = post.item_gambar;
      let item_kondisi = post.item_kondisi;
      let item_status = post.item_status;
      let item_spesifikasi = post.item_spesifikasi;

      axios
        .post("http://localhost:8000/api/items", {
          item_nama: item_nama,
          item_lokasi: item_lokasi,
          item_jumlah: item_jumlah,
          item_gambar: item_gambar,
          item_kondisi: item_kondisi,
          item_status: item_status,
          item_spesifikasi: item_spesifikasi,
        })
        .then(() => {
          //redirect ke post index
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
      post,
      validation,
      router,
      store,
    };
  },
};
</script>
