import sharp from "sharp";

const SRC = "C:\\Users\\matha\\Downloads\\stitch_the_record_keeper_portfolio\\nithusa.jpeg";

await sharp(SRC)
  .resize(180, 180, { fit: "cover", position: "centre" })
  .jpeg({ quality: 70 })
  .toFile("src/app/icon.jpg");

await sharp(SRC)
  .resize(180, 180, { fit: "cover", position: "centre" })
  .jpeg({ quality: 70 })
  .toFile("src/app/apple-icon.jpg");

console.log("done");
