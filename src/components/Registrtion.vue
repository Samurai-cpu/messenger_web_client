<template>
<div id="reg">
  <my-input v-model="email" placeholder="Email"></my-input>
  <my-input v-model="userName" placeholder="User Name"></my-input>
  <my-input v-model="password" placeholder="Password"></my-input>
  <my-input  v-model="phone" placeholder="Phone number"></my-input>
  <MyButton id="reg-btn" @click.native="complete" v-text="'Confirm'"> </MyButton>
  <router-link :to="{name:'authorization'}" >
  <MyButton id="back-btn" v-text="'Back'"></MyButton>
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
    let ecrypted =AESService.encrypt('xyi','zalupa');
    let norm = AESService.decrypt(ecrypted, 'zalupa')
    console.log(norm)
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
          localStorage.setItem('userName',response.data.userName)
          localStorage.setItem('accessToken',response.data.accessToken)
          localStorage.setItem('refreshToken', response.data.refreshToken)
        },)
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    localStorage.setItem('email',this.email)
    localStorage.setItem('phone',this.phone)
    localStorage.setItem('password',this.password)
    this.$router.push('/phoneconfirm')
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