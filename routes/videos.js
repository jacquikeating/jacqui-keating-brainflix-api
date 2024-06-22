import express from 'express';
import allVideos from '../data/videos.json' assert { type: "json" };

const router = express.Router();

router.get('/videos', (req, res) => {
    res.send(allVideos);
});

router.get('/video/:id', (req, res) => {
    res.send(allVideos[0]);
});

export default router;