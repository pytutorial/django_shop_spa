<template>
  <ul v-if="errors" style="color:red">
    <li v-for="(e,i) in errors" :key="i">{{e}}</li>
  </ul>
</template>

<script>
export default {
  props: ['errors']
}
</script>
