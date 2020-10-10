import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    console.log(token);
    const verified = jwt.verify(token, "mdskddgfebedfsddfsd");
    req.user = verified;
    next();
  } catch (err) {
    res.status(200).send("Invalid Token");
  }
};
