<template>
  <div>
    <p>{{axiosData.productData}}</p>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    let axiosData = reactive({
      productData: {'text':"no"},
    });
    return { axiosData };
  },
  created() {
    axios
      .get("http://api-carrack.inspire-dt.tw/api/products", {})
      .then((res) => {
        this.axiosData.productData = res.data;
        // console.log(this.axiosData.productData);
      });
  },
};
</script>