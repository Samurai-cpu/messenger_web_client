<template>
 <div id="auth">

     <my-input placeholder="Phone number"></my-input>
     <my-input placeholder="Password"></my-input>
     <my-button id="sign-btn" @click.native="test" v-text="'Sign in'"></my-button>
     <router-link :to="{name:'registration'}">
       <my-button id="reg-btn" @click.native="registr" v-text="'Sign up'"></my-button>
     </router-link>

 </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput";
import axios from 'axios'
export default {
  name: "authorization",
  components: {MyButton, MyInput},
  data(){return{
    response:null
  };
  },
  methods:{
    test: function (event){
      if(event){
        console.log(event.target.name)
      }
      axios
        .get('https://loveproj.fun/Debug')
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });

    },
    registr:function(){

    }
  }

}
</script>

<style scoped>
#auth{
  display: flex;
  flex-direction: column;
  align-items: center;
}
form{

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
#sign-btn{
  color:black;
}
</style>