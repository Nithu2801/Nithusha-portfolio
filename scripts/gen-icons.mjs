import sharp from "sharp";

const SRC = "C:\\Users\\matha\\Downloads\\stitch_the_record_keeper_portfolio\\nithusa.jpeg";

await sharp(SRC)
  .resize(512, 512, { fit: "cover", position: "centre" })
  .png()
  .toFile("src/app/icon.png");

await sharp(SRC)
  .resize(180, 180, { fit: "cover", position: "centre" })
  .png()
  .toFile("src/app/apple-icon.png");

console.log("done");
