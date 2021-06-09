import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCurrentTime, setVideoElem } from "../../store/currentVideo/actions";
import { setPlayerStatus } from "../../store/player/actions";
import { State } from "../../store/tsTypes";
import PlayerControls from "./PlayerControls";
import {
  handleOnMetadataLoaded,
  handleUpdateTime,
  playPauseVideo,
} from "./PlayerHelperFunction";

interface IChapterPlayerProps {
  videoUrl: string;
}

export default function ChapterPlayer({ videoUrl }: IChapterPlayerProps) {
  const { playerStatus } = useSelector((state: State) => state.player);
  const { videoElem, size } = useSelector((state: State) => state.currentVideo);
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [time, setTime] = useState<number>(0);

  const handleClickOnVideo = () => {
    playPauseVideo({ videoRef, dispatch });
  };

  useEffect(() => {
    playPauseVideo({ videoRef, dispatch });
    dispatch(setVideoElem(videoRef));

    return () => {};
  }, []);

  return (
    <PlayerWrapper>
      <PlayerBox>
        <VideoWrapper onClick={handleClickOnVideo} size={size}>
          <VideoElem
            ref={videoRef}
            crossOrigin="anonymous"
            preload="auto"
            onLoadedMetadata={(event) => {
              handleOnMetadataLoaded({
                target: event.target as HTMLVideoElement,
                dispatch,
              });
            }}
            onTimeUpdate={(e) => {
              const target = e.target as HTMLVideoElement;
              dispatch(setCurrentTime(target.currentTime));
            }}
            onEnded={(e) => {
              const target = e.target as HTMLVideoElement;
              dispatch(setPlayerStatus(false));
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </VideoElem>
        </VideoWrapper>

        <ControlsBox>
          <PlayerControls />
        </ControlsBox>
      </PlayerBox>
    </PlayerWrapper>
  );
}

interface VideoWrapperProps {
  size: string;
}

const PlayerWrapper = styled.div`
  /* border: 1px solid red; */
  padding-bottom: 10px;
  margin-top: 4.1rem;
`;

const PlayerBox = styled.div`
  /* border: 1px solid blue; */
  position: relative;
  /* padding-bottom: 10px; */
  /* border-bottom: 3rem solid black; */
`;

const VideoWrapper = styled.div`
  height: ${({ size }: VideoWrapperProps) =>
    size === "small" ? "66.5vh" : "100vh"};
  /* position: ${({ size }: VideoWrapperProps) =>
    size === "small" ? "none" : "absolute"}; */
  /* z-index: 2000; */
`;

const VideoElem = styled.video`
  /* border: 1px solid blue; */
  background-color: #000000;
  width: 100%;
  height: 100%;
`;

const ControlsBox = styled.section`
  /* border: 1px solid green; */
  background-color: #000000a6;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 5px 0;
`;
