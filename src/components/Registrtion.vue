<template>
<div id="reg">
  <my-input v-model="email" placeholder="Email"></my-input>
  <my-input v-model="userName" placeholder="User Name"></my-input>
  <my-input v-model="password" placeholder="Password"></my-input>
  <my-input  v-model="phone" placeholder="Phone number"></my-input>
  <MyButton id="reg-btn" @click.native="complete"></MyButton>
  <router-link :to="{name:'authorization'}">
  <MyButton id="back-btn" ></MyButton>
  </router-link>
  <p>{{email}}</p>
</div>
</template>


<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import AESService from "@/aesservice";
import axios from "axios";
export default {
name: "Registrtion",
  components: {MyButton, MyInput},
  data:function(){
  return{
  email:'',
    userName:'',
    password:'',
    phone:''

  }
  },
  methods:{
  complete:function(){
    AESService.encrypt(' ');
    let bodyFormData = new FormData();
    bodyFormData.append('email',this.email)
    bodyFormData.append('userName',this.userName)
    bodyFormData.append('password',this.password)
    bodyFormData.append('phone',this.phone)
    axios({
      method: 'post',
      url: 'https://loveproj.fun/Account/signup',
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  }
  }
}
</script>

<style scoped>
#reg{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>