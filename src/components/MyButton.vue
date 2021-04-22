<template>
  <button>
    {{text}}
  </button>
</template>

<script>
export default {
name: "MyButton",
  data:function (){
  return{
    text: 'xyi'
  }
  }
}
</script>

<style scoped>
button
{
  width:200px;
  height: 40px;
  font-size: 20px;
  background-color:white;
  border-radius: 20px;
  border-color:black;
  margin-top: 10px;
  color:black;
  border-width: 2px;

}
</style>