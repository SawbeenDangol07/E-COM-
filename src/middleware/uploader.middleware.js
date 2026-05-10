const multer = require("multer");
const fs = require("fs");
const uploader = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const path = "./public/uploads";

      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + " " + file.originalname;
      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const allowed = ["jpg", "jpeg", "png", "svg", "gif", "webp"];
    if (allowed.includes(ext.toLowerCase())) {
      cb(null, true);
    } else {
      cb({
        code: 422,
        message: "format not supported",
        status: "FILE_UPLOAD_ERR",
      });
    }
  };
  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 10485760,
    },
  });
};

module.exports = uploader;
