import "./css/style.css";

import videoSrc from "./picture/sea_ice_min_w_graph_2022_1080p30.mp4";

const videoElement = document.querySelector("video > source");
videoElement.src = videoSrc;
