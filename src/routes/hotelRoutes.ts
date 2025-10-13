import express from "express";
import * as hotelController from "../controllers/hotelControllers"
const router = express.Router();

//----------Same-----------
/* router.get("/:id", async (req, res) => {
  res.status(200).json({ success: true });
});
router.delete("/:id", async (req, res) => {
  res.status(200).json({ success: true });
});
router.post("/:id", async (req, res) => {
  res.status(200).json({ success: true });
});
router.put("/:id", async (req, res) => {
  res.status(200).json({ success: true });
});
router.get("/list", async (req, res) => {
  res.status(200).json({ success: false });
}); */

//-----------Same----------

router.route("/").post(hotelController.add);
router.route("/").get(hotelController.getList);
router.route("/:id").get( hotelController.getById).put(hotelController.update).delete(hotelController.deleteHotel);

export default router;
