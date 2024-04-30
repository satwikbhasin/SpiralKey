export const CeaserCipherEncryption = async (plainText) => {
  const key = CeaserKeyGeneration(plainText);
  const len = countDigits(key);
  const hashCode = hashCodeGenerator(key, len);
  let cipher = [];
  for (let i = 0; i < plainText.length; i++) {
    cipher.push((plainText[i].charCodeAt(0) + key) % 257);
  }
  const cipherText = displayText(cipher);
  return {
    cipherArray: cipher,
    hashCode: hashCode,
    length: len,
    ciphertextC: cipherText,
  };
};

export const CeaserCipherDecryption = async (cipherText1, hash, len) => {
  let cipherText = [];
  for (let i = 0; i < cipherText1.length; i++) {
    cipherText.push(cipherText1[i].charCodeAt(0));
  }
  let nkey = keyfromHash(hash, len);
  let decipher = [];
  for (let i = 0; i < cipherText.length; i++) {
    let temp = cipherText[i] - nkey;
    while (temp < 0) {
      temp += 257;
    }
    temp = temp % 257;
    decipher.push(temp);
  }
  return displayText(decipher);
};

function CeaserKeyGeneration(plainText) {
  let first = plainText[0];
  let binary = charToBinary(first);
  let reverse = reverseString(binary);
  binary += reverse;
  let key = binaryToDecimal(binary);
  return key;
}

function hashCodeGenerator(key, len) {
  let hash = 0;
  for (let i = 0; i < len; i++) {
    hash = hash + Math.pow(31, i) * (key % 10);
    key = Math.floor(key / 10);
  }
  return hash;
}

function keyfromHash(hash, len) {
  let key = 0;
  let q = 0;
  for (let i = len - 1; i >= 0; i--) {
    q = Math.floor(hash / Math.pow(31, i));
    key = 10 * key + q;
    hash = hash % Math.pow(31, i);
  }
  return key;
}
function displayText(ar) {
  let dis = "";
  for (let i = 0; i < ar.length; i++) {
    dis = dis + String.fromCharCode(ar[i]);
  }
  return dis;
}

function charToBinary(char) {
  // helper function
  // Get the ASCII value of the character
  const asciiValue = char.charCodeAt(0);

  // Convert ASCII value to binary string
  let binaryValue = asciiValue.toString(2);

  // Ensure it is 8 bits long
  while (binaryValue.length < 8) {
    binaryValue = "0" + binaryValue;
  }

  return binaryValue;
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function binaryToDecimal(binaryStr) {
  return parseInt(binaryStr, 2);
}
function countDigits(num) {
  // Convert number to string, replace any decimal point or negative sign, and get length
  return num.toString().replace("-", "").replace(".", "").length;
}
