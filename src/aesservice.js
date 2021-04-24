import AES from "js-crypto-aes"

let AESService={
    generetaIV: function(){
        let result = new ArrayBuffer(16);
        window.crypto.getRandomValues(result);
        return result;
    },
    generateAesKey: function (){
        let result = new ArrayBuffer(32);
        window.crypto.getRandomValues(result);
        return result;
    }
}

export default AESService;