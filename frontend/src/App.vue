<script>
import axios from "axios";
export default {
  data() {
    return {
      inputValue: "",
      searchValue: "",
      response: [],
      loading: false,
    };
  },
  methods: {
    searchAPI(e) {
      this.searchValue = this.inputValue.trim();
      this.response = [];
      this.loading = true;
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER
          }/symptoms-search?page=1&size=80&search=` + this.searchValue
        )
        .then((res) => {
          this.response = res.data.data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getHighlightString(str) {
      const list = str.toLowerCase().split(this.searchValue.toLowerCase());
      const output = [];
      var counter = 0;
      list.forEach((item) => {
        const itemLen = item.length;
        output.push(str.substr(counter, itemLen));
        counter += itemLen;
        output.push(str.substr(counter, this.searchValue.length));
        counter += this.searchValue.length;
      });
      return output;
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

.inlinePrint {
  display: inline;
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
  <div v-if="loading">Loading...</div>
  <div v-else>
    <ol id="highlightString">
      <li v-for="string in response" :key="string">
        <p
          v-for="item in getHighlightString(string)"
          :key="item"
          class="inlinePrint"
        >
          <span v-if="item.toLowerCase() === this.searchValue.toLowerCase()"
            ><b>{{ item }}</b></span
          >
          <span v-else>{{ item }}</span>
        </p>
      </li>
    </ol>
  </div>
</template>
