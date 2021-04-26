import axios from "axios";
import RSAService from "@/rsaservice";
import {decode} from 'url-safe-base64'
import AESService from "@/aesservice";
let AuthRequest = {
    makeAuthToken: function(isNeedRefresh=false){
        let refreshToken = localStorage.getItem('refreshToken')

        if(!isNeedRefresh){
            const config ={
                headers:{Authorization:'Bearer '+refreshToken}
            }
            axios.get('https://loveproj.fun/Account/getauthuserinfo',config)
                .then(function (response) {
                    localStorage.setItem('refreshToken',response.data.refreshToken);
                    localStorage.setItem('accessToken',response.data.accessToken);
                    console.log(response);
                })
        }
        let data=JSON.stringify({refreshToken:refreshToken})
            axios({
                method:'post',
                url:'https://loveproj.fun/Account/longsessionupdate',
                data: data,
                headers: { "Content-Type": "application/json" }
            })
                .then(function(response){
                    localStorage.setItem('refreshToken',response.data.refreshToken);
                    localStorage.setItem('accessToken',response.data.accessToken);
                    console.log(response)
                })
    },
    createSession: async function(){
        let rsaKeyPair =RSAService.generateKeys()
        let strongKey = localStorage.getItem('strongKey')

        if(strongKey===null){
            let data= JSON.stringify({PublicKey:rsaKeyPair.publicKey})
            let firstSessionResponse= await axios({
                method:'post',
                url:'https://loveproj.fun/MessangerSession/createfirstsession',
                data:data,
                headers: { "Content-Type": "application/json" }
            })
            let decryptedAesKey = decode(RSAService.decrypt(rsaKeyPair.privateKey,firstSessionResponse.data.CryptedAes))
            localStorage.setItem('strongKey',decryptedAesKey)
            await this.makeAuthToken();

            rsaKeyPair=RSAService.generateKeys();

            let cryptedPublicKey = AESService.encrypt(rsaKeyPair.publicKey)
            let sessionRequstData = JSON.stringify({PublicKey:cryptedPublicKey})

            let sessionResponse= await axios({
                method:'post',
                url:'https://loveproj.fun/MessangerSession/createsession',
                data:sessionRequstData,
                headers:{ "Content-Type": "application/json" }
            })

            let decryptedServerPublicKey = AESService.decrypt(sessionResponse.data.ServerPublicKey)
            let decryptedSessionId = AESService.decrypt(sessionResponse.data.SessionId)
            localStorage.setItem('clientPublicKey',rsaKeyPair.publicKey)
            localStorage.setItem('clientPrivateKey',rsaKeyPair.privateKey)
            localStorage.setItem('serverPublicKey',decryptedServerPublicKey)
            localStorage.setItem('sessionId',decryptedSessionId)
            localStorage.setItem('created', Date.now().toString() )
        }

    }
}

export default AuthRequest;