import  Crypto from 'crypto-js'
import {
    encode, decode,
} from 'url-safe-base64'

let AESService={
    generateIV: function(){
        let buffer = new ArrayBuffer(16);
        let result = new Uint8Array(buffer)
        window.crypto.getRandomValues(result);
        return result;
    },
    generateAesKey: function (){
        let buffer = new ArrayBuffer(32);
        let result = new Uint8Array(buffer)
        window.crypto.getRandomValues(result);
        return result;
    },
    encrypt: function(value, cypherSecret=localStorage.getItem('strongKey')){
        let secret = decode(cypherSecret)
        let iv = this.generateIV();
        let encrypted = Crypto.AES.encrypt(value, secret, {
            mode: Crypto.mode.ECB,
            padding: Crypto.pad.Iso10126,
            iv: iv
        });
        return encode(encrypted.toString());
    },
    decrypt: function (value,cypherSecret=localStorage.getItem('strongKey')){
        let secret = decode(cypherSecret)
        let iv = this.generateIV();
        let base = decode(value)
        let decrypted= Crypto.AES.decrypt(base, secret,{
            mode: Crypto.mode.ECB,
            padding: Crypto.pad.Iso10126,
            iv: iv
        })
        return decrypted.toString(Crypto.enc.Utf8);
    },


}

export default AESService;