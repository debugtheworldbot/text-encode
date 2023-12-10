function encodeStr(text: string, hiddenImgSrc: string) {
  let tempStrArr = [];
  tempStrArr = text.split("");
  tempStrArr.splice(
    1,
    0,
    hiddenImgSrc
      .split("")
      .map((char) => char.codePointAt(0)!.toString(2)) // ["1110011", "1110010", "1110011", "1110010"]
      .join(" ")
      .split("") // [ '1', '0', '0', ' ',  ...]
      .map((binaryNum) => {
        if (binaryNum === "1") {
          return String.fromCharCode(8203); // 零宽空格符&#8203;
        }
        if (binaryNum === "0") {
          return String.fromCharCode(8204); // 零宽不连字符&#8204;
        }
        return String.fromCharCode(8205); // 空格 -> 零宽连字符&#8205;
      })
      .join(String.fromCharCode(8206)),
  );
  return tempStrArr.join("");
}
function decodeStr(content: string) {
  if (!content) {
    return "";
  }
  const hiddenText = content.replace(
    /[^\u200b-\u200f\uFEFF\u202a-\u202e]/g,
    "",
  );
  if (!hiddenText) return "";
  const result = hiddenText
    .split(String.fromCharCode(8206))
    .map((char) => {
      if (char === String.fromCharCode(8203)) {
        return "1";
      }
      if (char === String.fromCharCode(8204)) {
        return "0";
      }
      return " ";
    })
    .join("")
    // 转数组
    .split(" ")
    // 根据指定的 Unicode 编码中的序号值来返回一个字符串。
    .map((binaryNum) => String.fromCharCode(parseInt(binaryNum, 2)))
    .join("");
  return result;
}

export { encodeStr, decodeStr };
