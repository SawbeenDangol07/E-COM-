const authRouter = require("../modules/auth/auth.router");
const brandRouter = require("../modules/brand/brand.router");
const categoryRouter = require("../modules/categories/categories.router");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
module.exports = router;
