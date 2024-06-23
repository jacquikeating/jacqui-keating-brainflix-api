import express from 'express';
import fs from 'fs';
import uniqid from 'uniqid';


const router = express.Router();

let id = "b6f35f03-7936-409b-bd2a-446bcc5f30e7";

function readData() {
    const videosFile = fs.readFileSync("../jacqui-keating-brainflix-api/data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
}

function writeData(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync("/data/videos.json", stringifiedData);
}

router.get('/videos', (req, res) => {
    const videosData = readData();
    const basicDataOnly = videosData.videosBasics;
    res.send(basicDataOnly);
});

router.get('/videos/:id', (req, res) => {
    const videosData = readData();
    const detailedData = videosData.videosDetails;
    const matchingVideo = detailedData.find(video => video.id === id);
    res.send(matchingVideo);
});

router.post('/videos/:id/comments', (req, res) => {
    res.status(201).send(`Your comment has been posted.`);
});

router.delete('/videos/:id/comments/:commentId', (req, res) => {
    res.status(201).send(
        `Comment deleted:
        ${comment.name}
        ${comment.comment}
        ${comment.id}
        ${comment.timestamp}`
    );
});

export default router;