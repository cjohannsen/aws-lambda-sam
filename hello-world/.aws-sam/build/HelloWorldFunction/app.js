const aws = require("aws-sdk");
const s3 = new aws.S3();
const fs = require("fs");

const { loadNuxt } = require("nuxt");

const decompress = require("decompress");
const decompressTargz = require("decompress-targz");
const serverEntryZip = "nuxt.tar.gz";

exports.handler = async (event, context) => {
  const bucket = "ceres-lambda-ssr";
  const key = `vuestorefront/${serverEntryZip}`;

  // Get the object from the event and show its content type
  const params = {
    Bucket: bucket,
    Key: key,
  };
  try {
    const { ContentType, Body } = await s3.getObject(params).promise();
    console.log("CONTENT TYPE:", ContentType);
    fs.writeFileSync(`/tmp/${serverEntryZip}`, Body);

    const test = await decompress(`/tmp/${serverEntryZip}`, "/tmp/", {
      plugins: [decompressTargz()],
    });

    let _files = [];
    _files = fs.readdirSync("/tmp/.nuxt");
    console.log(_files);

    const nuxt = await loadNuxt(
    { 
        for: "start",
        rootDir: '/tmp'
    });

    const { html, error, redirected } = await nuxt.renderRoute("/home");

    return {
      body: html,
    };
  } catch (err) {
    console.log(err);
    const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    console.log(message);
    throw new Error(message);
  }
};
