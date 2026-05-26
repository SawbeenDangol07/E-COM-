const mongoose = require("mongoose");
const { Status } = require("../../config/constant");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brandId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null,
      },
    ],

    image: {
      publicID: String,
      url: String,
      optimization: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  },
);

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
