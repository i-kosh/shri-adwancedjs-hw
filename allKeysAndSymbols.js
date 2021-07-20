const allKeysAndSymbols = (obj) => {
  if (!obj || typeof obj !== "object") {
    return [];
  }

  const objProto = Object.getPrototypeOf(obj);

  return Object.getOwnPropertyNames(obj).concat(
    Object.getOwnPropertySymbols(obj),
    allKeysAndSymbols(objProto)
  );
};

console.log(allKeysAndSymbols([123, 321]));
