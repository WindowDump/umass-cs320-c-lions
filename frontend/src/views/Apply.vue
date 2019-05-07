<template>
  <div class="apply">
    <center>
      <h1 id="title">
        <font>
          Application Page
        </font>
      </h1>
    </center>
    <ApplyForm></ApplyForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ApplyForm from '@/components/ApplyForm.vue'
export default Vue.extend({
  components: {
    ApplyForm
  }
})
</script>

<!-- doesn't do anything rn -->
<style>
#title {
  padding: vertical;
}
</style>
