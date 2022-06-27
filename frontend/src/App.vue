<script>
import axios from "axios";
export default {
  data() {
    return {
      inputValue: "",
      response: [],
    };
  },
  methods: {
    searchAPI(e) {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER
          }/symptoms-search?page=1&size=50&search=` + this.inputValue
        )
        .then((res) => {
          this.response = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.textField {
  height: 30px;
  font-size: 15px;
}
.searchButton {
  height: 36px;
  font-size: 15px;
  margin-left: 10px;
}
</style>

<template>
  <input
    v-model="inputValue"
    @change="searchAPI($event)"
    placeholder="Type here..."
    class="textField"
  />
  <button @click="searchAPI($event)" class="searchButton">Search</button>
  <ul id="response">
    <li v-for="item in response" :key="item">
      {{ item }}
    </li>
  </ul>
</template>
