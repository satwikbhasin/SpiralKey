export function SpiralMatrixEncryption(cipherT) {
  let cipherArray = [];
  for (let i = 0; i < cipherT.length; i++) {
    cipherArray.push(cipherT[i].charCodeAt(0));
  }
  let bstring = "";
  let cipherb = "";
  for (let i = 0; i < cipherArray.length; i++) {
    bstring = bstring + asciiToBinary(cipherArray[i]);
  }
  let key = generateSessionKey(bstring.length);
  let temp = bstring;
  key.forEach((value, key) => {
    let val = value;
    let k = key;
    while (val != 0) {
      let extracted = temp.substring(0, k);
      cipherb = cipherb + encrypt(extracted, k);
      temp = temp.substring(k);
      val = val - 1;
    }
  });
  const res = getCipherText(cipherb);

  let cipherAscii = res.cipherasci;
  let cipherText = res.ctext;
  let jsonString = JSON.stringify(Array.from(key.entries()));

  return {
    cipherascii: cipherAscii,
    ciphertextS: cipherText,
    keystring: jsonString,
  };
}

function encrypt(binaryString, size) {
  let cipherb = "";
  let matrixSize = Math.sqrt(size);
  let matrix = new Array(matrixSize);
  for (let i = 0; i < matrixSize; i++) {
    matrix[i] = new Array(matrixSize);
  }
  let pos = 0;
  let r1 = 0;
  let r2 = matrixSize - 1;
  let c1 = 0;
  let c2 = matrixSize - 1;
  while (true) {
    for (let i = c1; i <= c2; i++) {
      matrix[r1][i] = binaryString[pos];
      pos = pos + 1;
    }
    r1 = r1 + 1;
    if (r1 > r2) {
      break;
    }
    for (let i = r1; i <= r2; i++) {
      matrix[i][c2] = binaryString[pos];
      pos = pos + 1;
    }
    c2 = c2 - 1;
    if (c2 < c1) {
      break;
    }
    for (let i = c2; i >= c1; i--) {
      matrix[r2][i] = binaryString[pos];
      pos = pos + 1;
    }
    r2 = r2 - 1;
    if (r1 > r2) {
      break;
    }
    for (let i = r2; i >= r1; i--) {
      matrix[i][c1] = binaryString[pos];
      pos = pos + 1;
    }
    c1 = c1 + 1;
    if (c2 < c1) {
      break;
    }
  }
  r1 = 0;
  r2 = 1;
  c1 = 0;
  c2 = 1;
  for (let i = 0; i < matrixSize - 1; i = i + 2) {
    r1 = i;
    r2 = i + 1;
    for (let j = 0; j < matrixSize - 1; j = j + 2) {
      c1 = j;
      c2 = j + 1;
      cipherb = cipherb + matrix[r1][c1];
      cipherb = cipherb + matrix[r2][c1];
      cipherb = cipherb + matrix[r1][c2];
      cipherb = cipherb + matrix[r2][c2];
    }
  }
  return cipherb;
}
function getCipherText(cipherb) {
  let cipherText = "";
  let cipherAscii = [];
  for (let i = 0; i < cipherb.length; i += 8) {
    let eightBits = cipherb.substring(i, i + 8);
    let decimalval = parseInt(eightBits, 2);
    cipherAscii.push(decimalval);
    cipherText = cipherText + String.fromCharCode(decimalval);
  }
  return {
    cipherasci: cipherAscii,
    ctext: cipherText,
  };
}
function generateSessionKey(len) {
  let key = new Map();
  console.log(len);
  let i = 0;
  let n = 0;
  while (true) {
    let bs = 0;
    if (i === 0) {
      bs = 4;
      if (bs >= len) {
        break;
      }
    } else {
      bs = 4 * i * (4 * i);
      if (bs >= len) {
        if (bs === len) {
          n = i;
          break;
        } else {
          n = i - 1;
          break;
        }
      }
    }
    i++;
  }
  while (len !== 0) {
    if (n === 0) {
      let bs = 4;
      key.set(4, len / 4);
      len = 0;
      break;
    }
    let bs = 4 * n * (4 * n);
    if (bs <= len) {
      let y = Math.floor(len / bs);
      key.set(bs, y);
      len = len - bs * y;
    }
    n--;
  }
  return key;
}
export function SpiralMatrixDecryption(cipherText, keyBack) {
  let cipherbBack = "";
  let cipherAsciiBack1 = [];
  for (let i = 0; i < cipherText.length; i++) {
    cipherAsciiBack1.push(cipherText[i].charCodeAt(0));
  }
  let plainb = "";
  for (let i = 0; i < cipherAsciiBack1.length; i++) {
    cipherbBack += asciiToBinary(cipherAsciiBack1[i]);
  }
  let temp = cipherbBack;
  let array = JSON.parse(keyBack);
  let key = new Map(array);
  key.forEach((value, key) => {
    let val = value;
    let k = key;
    while (val != 0) {
      // remember to decrement val
      let extracted = temp.substring(0, k);
      plainb = plainb + decrypt(extracted, k);
      temp = temp.substring(k);
      val = val - 1;
    }
  });
  let plainText = getPlainText(plainb);
  console.log(plainText);
  return plainText;
}

function decrypt(binaryString, size) {
  let plainb = "";
  let matrixSize = Math.sqrt(size);
  let matrix = new Array(matrixSize);
  for (let i = 0; i < matrixSize; i++) {
    matrix[i] = new Array(matrixSize);
  }
  let pos = 0;
  let r1 = 0;
  let r2 = 1;
  let c1 = 0;
  let c2 = 1;
  for (let i = 0; i < matrixSize - 1; i = i + 2) {
    r1 = i;
    r2 = i + 1;
    for (let j = 0; j < matrixSize - 1; j = j + 2) {
      c1 = j;
      c2 = j + 1;
      matrix[r1][c1] = binaryString[pos++];
      matrix[r2][c1] = binaryString[pos++];
      matrix[r1][c2] = binaryString[pos++];
      matrix[r2][c2] = binaryString[pos++];
    }
  }
  pos = 0;
  r1 = 0;
  r2 = matrixSize - 1;
  c1 = 0;
  c2 = matrixSize - 1;
  while (true) {
    for (let i = c1; i <= c2; i++) {
      plainb = plainb + matrix[r1][i];
    }
    r1 = r1 + 1;
    if (r1 > r2) {
      break;
    }
    for (let i = r1; i <= r2; i++) {
      plainb = plainb + matrix[i][c2];
    }
    c2 = c2 - 1;
    if (c2 < c1) {
      break;
    }
    for (let i = c2; i >= c1; i--) {
      plainb = plainb + matrix[r2][i];
    }
    r2 = r2 - 1;
    if (r1 > r2) {
      break;
    }
    for (let i = r2; i >= r1; i--) {
      plainb = plainb + matrix[i][c1];
    }
    c1 = c1 + 1;
    if (c2 < c1) {
      break;
    }
  }
  return plainb;
}
function getPlainText(plainb) {
  let plainText = "";
  for (let i = 0; i < plainb.length; i += 8) {
    let eightBits = plainb.substring(i, i + 8);
    let decimalval = parseInt(eightBits, 2);
    plainText = plainText + String.fromCharCode(decimalval);
  }
  return plainText;
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

function asciiToBinary(ascival) {
  let binaryValue = ascival.toString(2);
  while (binaryValue.length < 8) {
    binaryValue = "0" + binaryValue;
  }

  return binaryValue;
}
