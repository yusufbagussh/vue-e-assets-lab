<template>
  <div class="main-content">
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>List Items</h4>
              <form class="card-tools p-2 mt-1">
                <div class="input-group input-group-sm"></div>
              </form>
              <form class="card-tools p-2 mt-1" @input="getResult">
                <div class="input-group input-group-sm">
                  <input
                    class="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    v-model="search"
                  />
                </div>
              </form>
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
                      <th>
                        Nama Item
                        <a @click="sortTable('item_nama')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
                      <th>
                        Lokasi
                        <a @click="sortTable('lokasi_nama')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
                      <th>
                        Kondisi
                        <a @click="sortTable('item_kondisi')">
                          <i
                            class="fa fa-sort grey"
                            style="margin-left: 20px"
                          ></i>
                        </a>
                      </th>
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
            <div class="card">
              <div class="card-footer">
                <div class="row ml-sm-1">
                  <select
                    class="custom-select col-1 mr-2"
                    style="width: 10; height=100;"
                    v-model="paginate"
                    @change="getResult"
                  >
                    <option selected>Choose...</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="all">All</option>
                  </select>
                  <paginate
                    v-model="current_page"
                    :page-count="last_page"
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="myCallback"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                    :first-last-button="true"
                    :first-button-text="'First'"
                    :last-button-text="'Last'"
                  >
                  </paginate>
                </div>
                <div>showing {{ from }} to {{ to }} of {{ total }} entries</div>
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
import Paginate from "vuejs-paginate-next";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "Item",
  components: {
    Paginate,
    Datepicker,
  },
  data() {
    return {
      items: [],
      paginate: 10,
      search: "",

      from: "",
      to: "",
      total: "",

      page: 1,

      current_page: null,
      last_page: 0,

      sortBy: "",
      typeBy: "",
      sortOrder: "",

      date: null,

      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token"),
    };
  },
  created() {
    this.getResult();
  },
  methods: {
    sortTable(sortBy) {
      // console.log(sortBy);
      this.sortBy = sortBy;
      this.typeBy = !this.typeBy;
      if (this.typeBy) {
        this.sortOrder = "ASC";
      } else {
        this.sortOrder = "DESC";
      }
      axios
        .get(
          `http://localhost:8000/api/item?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.items = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    myCallback() {
      axios
        .get(
          `http://localhost:8000/api/item?page=${this.current_page}&paginate=${this.paginate}&search=${this.search}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          this.items = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    getResult() {
      axios
        .get(
          `http://localhost:8000/api/item?paginate=${this.paginate}&search=${this.search}`,
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          // console.log(response);
          this.items = response.data.data.data;

          this.from = response.data.data.from;
          this.to = response.data.data.to;
          this.total = parseInt(response.data.data.total);

          this.current_page = parseInt(response.data.data.current_page);
          this.last_page = parseInt(response.data.data.last_page);
        });
    },
    async itemDelete(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          // Send request to the server
          if (result.value) {
            axios
              .delete(`api/item/${id}`, {
                headers: { Authorization: "Bearer " + this.token },
              })
              .then(() => {
                this.$swal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                this.getResult();
              })
              .catch((data) => {
                this.$swal.fire("Failed!", data.message, "warning");
              });
          }
        });
    },
  },
  mounted() {
    if (!this.loggedIn) {
      return this.$router.push({ name: "Login" });
    }
  },
};
</script>
