# Proof of Concept for AES Decryption

## Table of Contents

1. [Introduction](#introduction)
2. [What to Achieve](#what-to-achieve)
3. [Required Libraries](#required-libraries)
4. [Setup](#setup)
5. [Implementation](#implementation)
6. [Result](#result)
7. [Conclusion](#conclusion)

## Introduction

In this POC, we demonstrate how to implement AES decryption with RSA and IV (Initialization Vector) in a React application. AES (Advanced Encryption Standard) is a symmetric encryption algorithm, while RSA (Rivest–Shamir–Adleman) is an asymmetric encryption algorithm. We will encrypt data using AES, then encrypt the AES key using RSA. Finally, we will decrypt the data by first decrypting the AES key with RSA and then using the AES key to decrypt the data.

## What to Achieve

In this POC, we demonstrate the process of decrypting a permission array encrypted using AES and RSA. The procedure involves retrieving the encrypted AES key, initialization vector (IV), and permission data. The encrypted AES key is first decrypted using a private RSA key. Once the AES key is obtained, it is used with the IV to decrypt the permission array. This approach combines RSA for secure key management and AES for data decryption, ensuring that sensitive information is securely handled and accurately restored.

## Required Libraries

- **node-forge**: 
Used to decrypt the AES key that was encrypted with RSA. It converts the private key from a string format to a usable object, then uses this object to decrypt the AES key. Finally, it handles the Base64 encoding and decoding of the keys.

- **CryptoJS**: 
Used for AES encryption and decryption because it provides a simple API to perform these operations. It decrypts the data using the decrypted AES key and IV. CryptoJS handles the complex details of AES decryption, making it easier to manage encrypted data in the application.

## Setup

Install libraries and dependencies:

```sh
npm install node-forge crypto-js
```

## Implementation

### 1. Import Required Libraries

Import the libraries in your React component:

```js
import forge from 'node-forge';
import CryptoJS from 'crypto-js';
```

### 2. Define RSA Decryption Function

The `decryptAESKeyWithRSA` function decrypts an AES key using an RSA private key stored in `process.env.REACT_APP_PRIVATE_KEY`. It decodes the encrypted AES key from Base64, decrypts it with RSA, and returns the result encoded in Base64. If an error occurs, it logs the issue and returns null.

```js
const decryptAESKeyWithRSA = (encryptedAESKey) => {
    try {
        const privateKey = forge.pki.privateKeyFromPem(process.env.REACT_APP_PRIVATE_KEY);
        const decodedAESKey = forge.util.decode64(encryptedAESKey);
        const decryptedAESKey = privateKey.decrypt(decodedAESKey, 'RSA-OAEP');
        return forge.util.encode64(decryptedAESKey);
    } catch (error) {
        console.error('Error decrypting AES key with RSA:', error);
        return null;
    }
};
```

### 3. Define AES Decryption Function

The `decryptWithAES` function decrypts permission data that has been encrypted with AES. It takes the encrypted data (`PERMISSION_DATA`), the AES key, and the initialization vector (IV). The function uses `CryptoJS.AES.decrypt` to perform the decryption using the provided key and IV, with CBC mode and PKCS7 padding. It then converts the decrypted data from a byte array to a UTF-8 string and parses it as JSON. If an error occurs, it logs the error and returns null.

```js
const decryptWithAES = (encryptedData, aesKey, iv) => {
    try {
        const key = CryptoJS.enc.Base64.parse(aesKey);
        const initVector = CryptoJS.enc.Base64.parse(iv);
        const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
            iv: initVector,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedData = CryptoJS.enc.Utf8.stringify(decrypted);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error('Error decrypting data with AES:', error);
        return null;
    }
};
```

### 4. Decrypt AES Key

Perform the AES key decryption now that you have the decryption functions ready. This is a crucial step before decrypting the permission data.

```js
const encryptedAESKey = 'YOUR_ENCRYPTED_AES_KEY';
const decryptedAESKey = decryptAESKeyWithRSA(encryptedAESKey);
if (!decryptedAESKey) {
    console.error('Failed to decrypt AES key.');
}
```

### 5. Decrypt Permission Data

Finally, decrypt the permission data using the decrypted AES key and IV. This step depends on the successful decryption of the AES key.

```js
const encryptedData = 'YOUR_ENCRYPTED_DATA';
const iv = 'YOUR_INITIALIZATION_VECTOR';
const permissions = decryptWithAES(encryptedData, decryptedAESKey, iv);

if (permissions) {
    console.log('Decrypted Permission Array:', permissions);
} else {
    console.error('Failed to decrypt permission data.');
}
```

## Result

After decryption, the permission array should appear as follows:

```json
[
    {
    "roleId": 3,
    "moduleId": 1,
    "create": 1,
    "read": 1,
    "update": 1,
    "delete": 0,
    "statusUpdate": 0
  },
  {
    "roleId": 3,
    "moduleId": 2,
    "create": 1,
    "read": 1,
    "update": 0,
    "delete": 0,
    "statusUpdate": 0
  },
  {
    "roleId": 3,
    "moduleId": 3,
    "create": 1,
    "read": 1,
    "update": 1,
    "delete": 0,
    "statusUpdate": 0
  }
]
```

## Conclusion

This Proof of Concept (POC) demonstrates a secure method for decrypting a permission array using a combination of RSA and AES encryption techniques. By decrypting the AES key with RSA and subsequently using it to decrypt the permission data, we ensure that sensitive information remains protected throughout the process. The approach leverages industry-standard cryptographic practices to manage and decrypt encrypted data efficiently. This POC highlights the integration of RSA and AES in real-world applications, validating the robustness of these encryption methods for secure data handling.




