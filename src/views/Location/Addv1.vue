<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state posts
    const post = reactive({
      lokasi_nama: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store() {
      let lokasi_nama = post.lokasi_nama;

      axios
        .post("http://localhost:8000/api/location", {
          lokasi_nama: lokasi_nama,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "Location",
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
