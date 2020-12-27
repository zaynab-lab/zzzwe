const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");

const gc = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCLOUD_MAIL,
    private_key: process.env.GCLOUD_PRIVET_KEY
  }
});
const bucket = gc.bucket(process.env.BUCKET_NAME);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export default async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    res.status(200).end("done");
  } else {
    gc.getBuckets().then((x) => console.log(x));

    res.statusCode = 200;
    res.json({ name: "John Doe" });
  }
};
