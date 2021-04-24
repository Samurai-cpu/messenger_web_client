import RSA from "js-crypto-rsa";

let RSAService = {
    generateKeys: function(){
        let rsaKeyPair ={
            publicKey:'',
            privateKey:''
        }
       RSA.generateKey(2048).then((key)=>{
             rsaKeyPair.publicKey=key.publicKey;
             rsaKeyPair.privateKey=key.privateKey;
        })
        return rsaKeyPair;
    },
    encrypt: function(rsaPublicKey, dataToCrypt){
        let encryptedMessage=RSA.encrypt(dataToCrypt,rsaPublicKey);
        return encryptedMessage;
    },
    decrypt: function(rsaPrivateKey, dataToDecrypt){
        let decryptedMessage=RSA.decrypt(dataToDecrypt,rsaPrivateKey);
        return decryptedMessage;
    },
    signData: function(rsaPrivateKey, dataToSign){
        let signedHasValue = RSA.sign(dataToSign,rsaPrivateKey)
        return signedHasValue;
    },
    verifySign: function(msg,rsaPublickKey,signedMsg){
        if(RSA.verify(msg,signedMsg,rsaPublickKey))
            return true;
        return false;
    }
}

export default RSAService;

