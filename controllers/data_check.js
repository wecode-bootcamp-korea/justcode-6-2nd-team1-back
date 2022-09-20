const dataCheck = (data) => {
  const data = Object.keys(data);

  const haskey = { account: false, password: false };
  const requireKey = Object.keys(haskey);

  Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value) {
      haskey[key] = true;
    }
  });
  const haskeyArray = Object.entries(haskey);
  for (let i = 0; i < haskeyArray.length; i++) {
    const [key, value] = haskeyArray[i];
    if (!value) {
      res.status(400).json({ message: `${key}이/가 없습니다` });
      return;
    }
  }
};
