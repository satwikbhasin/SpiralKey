
function generateShares(cipherAscii){
    let a1=[];
    let a2=[];
    let a3=[];
    for (let i = 0; i < cipherAscii.length; i++) {
        let ascii = cipherAscii[i];
        let r1 = getRandomNumber(1, 256);
        let r2 = getRandomNumber(1, 256);
        let a = getShare1(ascii, r1, r2);
        let b = getShare2(ascii, r1, r2);
        let c = getShare3(ascii, r1, r2);
        a1.push(a);
        a2.push(b);
        a3.push(c);
      }
    let share1=displayShare(a1);
    let share2=displayShare(a2);
    let share3=displayShare(a3);
    return{
        displayShare1: share1,
        displayShare2: share2,
        displayShare3: share3,
        share1: a1,
        share2: a2,
        share3: a3
    };
}

function generateSharesKey(keyString){
    let a1=[];
    let a2=[];
    let a3=[];
    for (let i = 0; i < keyString.length; i++) {
        let ascii = keyString[i].charCodeAt(0);
        let r1 = getRandomNumber(1, 256);
        let r2 = getRandomNumber(1, 256);
        let a = getShare1(ascii, r1, r2);
        let b = getShare2(ascii, r1, r2);
        let c = getShare3(ascii, r1, r2);
        a1.push(a);
        a2.push(b);
        a3.push(c);
      }
    let share1=displayShare(a1);
    let share2=displayShare(a2);
    let share3=displayShare(a3);
    return{
        displayShare1: share1,
        displayShare2: share2,
        displayShare3: share3,
        share1: a1,
        share2: a2,
        share3: a3
    };
}

function reconstructFromShares(a1,a2,a3){
    let cipherAsciiBack=[];
    let cipherTextBack="";
    for (let i = 0; i < a1.length; i++) {
        let temp = reconstruct(1, a1[i], 2, a2[i], 3, a3[i]);
        cipherAsciiBack.push(temp);
        cipherTextBack = cipherTextBack + String.fromCharCode(temp);
    }
    return{
        cipherasciiback: cipherAsciiBack,
        cipherTextBack: cipherTextBack
    }
}

function reconstructKeyFromShares(a1,a2,a3){
    let keyback="";
    for (let i = 0; i < a1.length; i++) {
        let temp = reconstruct(1, a1[i], 2, a2[i], 3, a3[i]);
       // cipherAsciiBack.push(temp);
        //console.log(temp);
        keyBack=keyBack+String.fromCharCode(temp);
        //cipherTextBack = cipherTextBack + String.fromCharCode(temp);
    }
    //let array = JSON.parse(keyBack);
    //let nKey=new Map(array);
    //return nKey;
    return keyBack;
}

function displayShare(ar) {
    // display the shares and make slight modification to the non-printable characters
    let dis = "";
    for (let i = 0; i < ar.length; i++) {
      let num = ar[i] % 127;
      if (num >= 0 && num <= 31) {
        num = num + 32;
      }
      //System.out.print((char)num);
      dis = dis + String.fromCharCode(num);
    }
    //console.log(dis);
    //System.out.println();
    return dis;
  }

  function getShare1(a, r1, r2) {
    let x = 1;
    let cal = (x * r1 + a + r2 * x * x) % 257;
    return cal;
  }
  function getShare2(a, r1, r2) {
    let x = 2;
    let cal = (x * r1 + a + r2 * x * x) % 257;
    return cal;
  }
  function getShare3(a, r1, r2) {
    let x = 3;
    let cal = (x * r1 + a + r2 * x * x) % 257;
    return cal;
  }
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function asciiToBinary(ascival) { // t
    let binaryValue = ascival.toString(2);
    while (binaryValue.length < 8) {
      binaryValue = "0" + binaryValue;
    }
  
    return binaryValue;
  }

  function reconstruct(x1, y1, x2, y2, x3, y3) {
    let d1 = (x2 - x1) * (x3 - x1);
    let d2 = (x2 - x1) * (x3 - x2);
    let d3 = (x3 - x1) * (x3 - x2);
    let md1 = modInverse(d1, 257);
    let md2 = modInverse(d2, 257);
    let md3 = modInverse(d3, 257);
    let t1 = (y1 * x2 * x3) % 257;
    let t2 = y2 * x1 * x3 * -1;
    let t3 = (y3 * x1 * x2) % 257;
    while (t2 < 0) {
      t2 += 257;
    }
    t2 = t2 % 257;
    t1 = (t1 * md1) % 257;
    t2 = (t2 * md2) % 257;
    t3 = (t3 * md3) % 257;
    return (t1 + t2 + t3) % 257;
  }
  function modInverse(a, m) {
    let m0 = m;
    let y = 0;
    let x = 1;
    if (m === 1) {
      return 0;
    }
    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0) {
      x = x + m0;
    }
    return x;
  }