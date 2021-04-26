<template>
  <div id="SMS">
    <my-input placeholder="SMS Code" v-model="SMSCode"></my-input>
    <my-button @click.native="phoneConfirm" v-text="'Confirm Phone'"></my-button>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import axios from "axios";
export default {
name: "PhoneConfirm",
  components: {MyButton, MyInput},
  data(){
  return{
    SMSCode:''
  }
  },
  methods:{
  phoneConfirm:function(){
    axios({
      method:'get',
      url:'https://loveproj.fun/Account/confirmphone/'+this.SMSCode,
      headers: { "Content-Type": "application/json" },
    })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    console.log(Response)
  }
  }
}
</script>

<style scoped>
#SMS{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>