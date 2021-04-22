<template>
  <input type="text" v-on:input="updateValue($event.target.value)">

</template>

<script>
export default {
  name: "MyInput",
  methods: {
  updateValue: function (value) {
    this.$emit('input', value)
  }
}
}
</script>

<style scoped>
input
{
  width:300px;
  padding: 14px 16px;
  margin-bottom: 20px;
  font-size:20px;
  border-radius: 15px;
  border-color: grey;

}

</style>