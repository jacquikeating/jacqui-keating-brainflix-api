import express from 'express';
import fs from 'fs';
import uniqid from 'uniqid';


const router = express.Router();


function readData() {
    const videosFile = fs.readFileSync("../jacqui-keating-brainflix-api/data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
}

function writeData(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync("../jacqui-keating-brainflix-api/data/videos.json", stringifiedData);
}

router.get('/videos', (req, res) => {
    const videosData = readData();
    const basicDataOnly = videosData.videosBasics;
    res.send(basicDataOnly);
});

router.get('/videos/:id', (req, res) => {
    const { id } = req.params;
    const videosData = readData();
    const detailedData = videosData.videosDetails;
    const matchingVideo = detailedData.find(video => video.id === id);
    if (!matchingVideo) {
        return res.status(404).send(`Cannot find video with ID ${id}.`);
    }
    res.send(matchingVideo);
});

router.post('/videos', (req, res) => {
    const videosData = readData();
    const videosBasics = videosData.videosBasics;
    const videosDetails = videosData.videosDetails;
    const newVideoDetails = {
        id: uniqid(),
        title: req.body.title,
        channel: "Test User",
        image: req.body.image,
        description: req.body.description,
        views: 0,
        duration: "0:00",
        video: "Placeholder",
        timestamp: Date.now(),
        comments: []
    };
    const newVideoBasics = {
       id: newVideoDetails.id,
       title: newVideoDetails.title,
       channel: newVideoDetails.channel,
       image: newVideoDetails.image
    };
    videosBasics.push(newVideoBasics);
    videosDetails.push(newVideoDetails);
    writeData(videosData);
    console.log(videosData);
    res.status(201).send(`Your video was successfully published!`);
});

router.post('/videos/:id/comments', (req, res) => {
    const videosData = readData();
    const { id } = req.params;
    const detailedData = videosData.videosDetails;
    const matchingVideo = detailedData.find(video => video.id === id);
    if (!matchingVideo) {
        return res.status(404).send(`Cannot find video with ID ${id}`);
    }
    const videoComments = matchingVideo.comments;
    const newComment = {
        id: uniqid(),
        name: "Test User",
        comment: req.body.comment,
        likes: 0,
        timestamp: Date.now()
    }
    videoComments.push(newComment);
    writeData(videosData);
    res.status(201).send(`Your comment has been posted. Details:
        - ID: ${newComment.id}
        - Name: ${newComment.name}
        - Comment: ${newComment.comment}
        - Likes: ${newComment.likes}
        - Timestamp: ${newComment.timestamp} `
    );
});

router.delete('/videos/:id/comments/:commentId', (req, res) => {
    const { id, commentId } = req.params;
    const videosData = readData();
    const detailedData = videosData.videosDetails;
    const matchingVideo = detailedData.find(video => video.id === id);
    if (!matchingVideo) {
        return res.status(404).send(`Cannot find video with ID ${id}.`);
    }
    const videoComments = matchingVideo.comments;
    const matchingComment = videoComments.find(comment => comment.id == commentId);
    if (!matchingComment) {
        return res.status(404).send(`Cannot find comment with ID ${commentId}.`);
    }
    const commentIndex = videoComments.indexOf(matchingComment);
    videoComments.splice(commentIndex, 1);
    writeData(videosData);
    res.status(204);
});

export default router;