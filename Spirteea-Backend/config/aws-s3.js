// import AWS from "aws-sdk";
// import { randomUUID } from "crypto";
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });


// const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// AWS.config.update({ region: 'ap-south-1' });

// // Function to generate the S3 URL
// function getS3Url(bucketName, key, region = 'ap-south-1') {
//     return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
// }


// export async function uploadFile(file) {
//     let id = randomUUID()
//     let nameOfFile = 'spireeta-'+id + '.' + file.originalname.split('.').pop()
//     const params = {
//         Bucket: process.env.STORAGE_BUCKET_NAME,
//         Key: nameOfFile,
//         Body: file.buffer,
//         ContentType: file.mimetype
//         // ACL: 'public-read'
//     }
//     try {
//         let res = await s3.upload(params).promise()
//         const fileUrl = getS3Url(process.env.STORAGE_BUCKET_NAME, nameOfFile, 'ap-south-1');
//         return fileUrl
//     }
    
//     catch (err) {
//         console.log(err)
//     }
// }

// export async function deleteFile(key) {
//     const params = {
//         Bucket: process.env.STORAGE_BUCKET_NAME,
//         Key: key
//     }
//     try {
//         let res = await s3.deleteObject(params).promise()
//         return res
//     }
//     catch (err) {
//         console.log(err)
//     }
// }


// export default s3;
const AWS = require("aws-sdk");
const { randomUUID } = require("crypto");

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1' // Moved region here to avoid multiple updates
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Function to generate the S3 URL
function getS3Url(bucketName, key, region = "ap-south-1") {
    return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
}

async function uploadFile(file) {
    const id = randomUUID();
    const nameOfFile = `spireeta-${id}.${file.originalname.split(".").pop()}`;
    
    const params = {
        Bucket: process.env.STORAGE_BUCKET_NAME,
        Key: nameOfFile,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3.upload(params).promise();
        return getS3Url(process.env.STORAGE_BUCKET_NAME, nameOfFile, "ap-south-1");
    } catch (err) {
        console.error("Upload Error:", err);
        return null; // Return null if upload fails
    }
}

async function deleteFile(key) {
    const params = {
        Bucket: process.env.STORAGE_BUCKET_NAME,
        Key: key,
    };

    try {
        return await s3.deleteObject(params).promise();
    } catch (err) {
        console.error("Delete Error:", err);
        return null; // Return null if deletion fails
    }
}

module.exports = {
    s3,
    uploadFile,
    deleteFile,
};
