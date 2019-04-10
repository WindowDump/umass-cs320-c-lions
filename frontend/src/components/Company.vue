<template>
  <div class="job">
    <!-- <span class="dateposted">{{ dateposted }}</span> -->
    <div class="job-info">
      <div class="title">{{ name }}</div>
      <!-- <div class="company-heading"></div> -->
      <button @click="removeCompany">remove</button>
    </div>
    <button class="btn-apply">Info</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  // props: ['name', 'desc', 'company', 'location', 'dateposted']
  props: ['name'],
  methods: {
    async removeCompany() {
      // Axios.delete("/companies", this.name);
      let el = this.$el
      console.log(el)
    }
  }
})
</script>

<style lang="scss">
.job {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: rgb(221, 240, 240);
  padding: 15px;
  width: 100%;
  position: relative;
  margin: 5px;
}

.job-info {
  flex: 1 1;
  padding-right: 10px;
}

.btn-apply {
  width: 100px;
  border-radius: 5px;
  border: none;
  background: green;
  color: #fff;
  font-size: 1rem;
  padding: 10px;
  cursor: pointer;
}

.btn-apply:hover,
.btn-apply:focus {
  background: rgb(5, 150, 5);
}

.btn-apply:focus {
  outline: none;
}

.btn-apply:active {
  transform: scale(0.97);
}

.title {
  font-size: 1.5em;
  padding-bottom: 10px;
}

.company-heading {
  padding-bottom: 5px;
}

.company {
  font-weight: bold;
  padding-bottom: 5px;
}

.dateposted {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
