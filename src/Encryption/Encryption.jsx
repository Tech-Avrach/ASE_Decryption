import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import forge from "node-forge";

const Encryption = () => {
    const [decryptedPermissions, setDecryptedPermissions] = useState(null);

    useEffect(() => {
        const encryptedAESKey =
            "THDgR8jaPc6xs9mxSj5DRirXAn5q26Y0wIs423HVLjcbgXGPdu37EOGpH7bpengoAoLbhmB1MEqqB43Op3yB87jr51cN0GyGdpLrTdFDmeAmnPjyiIqpbpqUqp1Qa00hrPdO6WdQJSHpctjnD6QqBuJmb45qeVQivxGBoJfxA6gRDZQby/Ia+6d7e+RSDbrsznHHX31sblBwcXWdcxwAHJkxRRZAJVAEvUMerY3Ru+hsMWlpeAdp50rnaiSfkzTxsdRGCnrS28nEnblDjuBHeZ2pMCAFAsQPRowsFpswIrVLtdNE73vparct9WDTx1CVTJTaFd+AwX/Eing02EFaNg=="; // Your encrypted AES key in base64

            const privateKEY = "-----BEGIN RSA PRIVATE KEY-----MIIEogIBAAKCAQEAhj0datVD7UEi+GzU8nCOgZtkJ5Obc0Wp7ULa/WGP1On/DniIdJWLPOgZ7oFV9QcCNpbmV7IEh4ARfq8MDsuK8i22ngYhDc79tIb4u/mFi1PxFMynTkxKrK4+Ko5kcMQmofqtK6b0FMNK1gU2w8ZbdNmDrUV9VlOUP0+DVRRYY9vUNZY9QoUr8QM2jEJHhpGE3YamTbV+NfLipG6/rbRrL81Xt93+kjyXhlDmr5pKLWAYVTnjwjnr++E5i03s+BsMCtZsWzBg24LUN34giuFeD639SyqLFTLc/CecL7RFhEpbk1uGfBij74vZYQ0RWuMdzgGq8OpcZwHNZRPBFEj6lwIDAQABAoIBAGVE+8lZxFnbVud1Kx0O/uMV+HPG7nIC7xPX6N9YV6q3MLyY/9B79MPpEY8VsWQdenT2WCV2XeZfHlOk+QK8WUEkbW0/kHYbXthvLnyY3D9k/y3CysDN21P0S1/NdkaAI+j09OlGlUKIpg9ZdZwyK1K2uZjhIJIckW1Frf1kUN5bnz+JL6WKiWj5WIsVUdd+5pUCCDW0VPz5tTmB+sO35kpqWmwvPrpKDXdG/q978MriDM/qI8j1OokXbcsQxzm3k2hkz8khNS/66VFdOkDFnvtSmp/fl18SVYUFrjv+293cylQKzZWbazRgP9n/VQ3WF4XFGAWzRpdcoPuePqHdTHECgYEA3/ZkejCHet6LUzkIR8JQEhfb+cFZy5dLvzpxbMvWpHsWO5Rga8VVunw3NuLYwNz/qryReRx+17RSvWlS0Pcq9acKkiTsfHwoL8vVnpeiK6ggwh0s8K+cBJE2wJPVZsvKs42N4Jfla24KEhFx33GYa4+NuXVzfMP5yv9k8mYu198CgYEAmXD/jRJM+x+oXFcq6pG903RDDZAEItQDOd6Rk16JPJwojEX8wiTtU6MlX5eDgk8nzznAqowVqfCG3Rdg+PUHnCZ/0xO/2rGr8FJggC3pugzJEoKSAVxjwIkUjt0nJhwU4yUJINvlDRXN9FjSaWWMzO53hGFLM6Zj/iZpvPnwFEkCgYAQftpZsZdY8mk6oPm+J060dnNqStZtS2B13j0acU0G4lX532zWozs0OA/tB/pFAkIGdksUq4egJZTuhIJoB7xvSXVa3ENay9493vqF6s8z/fcjtPhpZdXM9FEfEARoxNvSK7vmbemk5v7w474KYhiC25jprv/pkZmlXPg3blVG6wKBgBBYz4DyAC2I0+DykGnpGPYcHsClJSuotqdFpPC0U56XbGJ1WlY8pOQSL3sdoy8Qy8bx+iqxPeWa8GNBiF09jY//MgMEyZ286/pwbEN7oLjnf8xvCKsIcsAiWoRV30PaHgeM/In5o09fkU+E3vXHkdaLWURLMT3Rbjm3UfCGGCOxAoGAE/M+zkGCzM6ehp89TGFMLe4InirZP0pGryFUcL0UQRa0U1K3OQ5fYb3q2Uah+MIDKg3ibMGyTjrzaPzEWgPS3f44/jZMAJq4hO0+yX8mmMkyJGjomjGYV+JRrn6miiKXaIWmOGmWBgkyr/JSZigzHyAzk7XQEO7IU/NNElMwuVA=-----END RSA PRIVATE KEY-----";            
        const permissionData =
            "TBTZ/eMCtTadQoPpqWVQinx0S5JLDdY4w7lL+7R7A6FUdoWZXgD6cbdDQYl79V7fp0IEyc1uKhqDKx9ivaOmE6Q8kQb4oSQ1neHfFsnvI22qItLwsuhymhEdG2vnDULwddSzxQiwJCdeRMaqOX9DJlYiWZ8BHICB2aEN/Xe/7DJCuLzKPsPEARzauk5HjcVQZx1FcBfw2giPxHce/lNkdR/mNlNjuvJHRpUkL648fiKto47iMQgJZRhTurtBJwkRahUwCBxCmjtghhA94IQPBuKkpfnox5KMmrfOSWWta0lvTaHp1Cd4aYY1L/vH3kQMI87CCFa3MrHC1FNZtwaS0dkIsjstdbV9IkfyIQ/ZqSmS2NkN/Ty+CXx/izHFhgrxn/qXwg3mUjXAkgu1fxKrwhboEn3GP2o2d/2h/8/NVVRwzgTcIbuoKlG0kWMqNMtBGBFMoPmjTfYmLRXtQm2cuKt5I1l7gaAz+tRuEgo2F2ZJ0KnLpXms/atwHKukiERGtciNk/smCSYlsq0NQPFOFbQqh6mIchan2PhRWyt2Jyhhaoxn+7EPYTCCRvU2XXtghO4bjfk/Jff1+6++Jk9U0WMO5y4eOU77nJSM4JDd11tGS0H6X6Bgligg7+otNnGmd0xl4B/DOee0fJzmj4g29EPot10KPXLZWzR6gRfRiSlRg9YjXze1WvQtUC4wiZ+mNqkgVYsYwMeSP/u+G1M30JChPLGsNm9q5cWCZ43HMiQOO1/lb+n8jHAcoSw5FZ2tfAAg1bJ8iPTs0xVfXCb/52asko6vccDGo4YqUU2apx0yVz5aT7Ma4c8owWPk66tiH/MdxNRBEgSV3wv7m8rbUiWZbkOXxmY26g3LdlCou6QiCiTxHVWSZ9Ao+t63j8a5gsQTcP75SdmUia2YgaoyRWCLsV1kp+hf+gZ5xN+An4KfnxzUblXzUQQ1s82j/VDPCNVqUkJOnWmbM3fxMLzFDsqs9EbF4xY9vcC7WE6K2jCpNytxfidwpfWjrdLBA8tbiD6e2paE4p71TZv262FA4Nrjn60XwBaMTAmC266GqJPwn92w+0cYWy9mOnkXv2Fba14sY5DsTIREYvmYOMDeC//cBL/zZk2H5chl05icc9+GhuypGQpP2bcH9l+JjelzRGecQ3+TrNZJKjArsqI1v3shJ9dCxIbGnb0RdTJiw/AeaWCXHob9edWjcJAMqIuSp2gHB0+i05LxRX81s+mPrj2Yz6NmGJZMLbpwA+t3ecYfmb/veuEfb1hPeF8cuD8Dd2JSvzfYEUC6BhDhQwhzBq+1of7XstOvTmOBEPtaDCiW38TWp23PxwLQxlklveM21dlLzvm/OlJV7NkC0d+EFjaCigvC3vPGhCP9jUBeqPmw+C3xisOJtiisiBZeA7wDEoicuQTFvMH6WQQ3/9xWNHXqE+TlBTKsf1FS2TNP91HHAfawTT6bch8o3BB04v0e7ERpDlyiuFlzw9c/ynOep5+pH3SgVQjwFB5KHQv8ElRvbkhuTvJzVFN1qt5wwR3iefSgak5wuxXipQ/PCZ8wHMknvCWEX61+vkibOq5/ULCxJdunaGA/g1jTduz/7cVMHP++flyTRKv79UGVR+xxccnPF6r0pbXAwrMzNcVLO0y+ePZ+u04CcAwfFXbsf6DxFcyZ1OPC8BKCPNkThhMTNJ8fMu9stTMECOt8xM6e5vDoDKFeI2fjIzKFRvAhFk18ad+Mni6jjBdmTJB2BAM1GnmkW8OSTM+P8b8MJsTfSL1TRmmkJLc0nZ1OfRdI0LHMUN8J+QfCJ+pwJrt7Gk/kxnUSGuSTRk4aGosqdFhxr3Q="; // Your encrypted permission data in base64
        const iv = "hKMO6fVu1LWsd2n5VDgEGw=="; // Your initialization vector in base64


        const decryptAESKeyWithRSA = (encryptedAESKey, privateKEY) => {
            try {
                const privateKey = forge.pki.privateKeyFromPem(privateKEY);
                const encryptedBuffer = forge.util.decode64(encryptedAESKey);
                const decryptedKey = privateKey.decrypt(encryptedBuffer, "RSA-OAEP");
                return forge.util.encode64(decryptedKey);
            } catch (error) {
                console.error("Error decrypting AES key with RSA:", error);
                return null; 
            }
        };

        const decryptWithAES = (permissionData, key, iv) => {
            const decrypted = CryptoJS.AES.decrypt(
                permissionData,
                CryptoJS.enc.Base64.parse(key),
                {
                    iv: CryptoJS.enc.Base64.parse(iv),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                }
            );
            return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
        };

        const decryptedAESKey = decryptAESKeyWithRSA(encryptedAESKey, privateKEY);
        console.log("Decrypted AES Key:", decryptedAESKey);
        const decryptedPermissions = decryptWithAES(
            permissionData,
            decryptedAESKey,
            iv
        );

        setDecryptedPermissions(decryptedPermissions);
    }, []);

    return (
        <div>
            {decryptedPermissions ? (
                <pre>{JSON.stringify(decryptedPermissions, null, 2)}</pre>
            ) : (
                <p>Decrypting...</p>
            )}
        </div>
    );
};

export default Encryption;
