import React, { useState, useCallback, useEffect } from "react";
import "./css/App.css";
import "./css/Lazy.css";
import WarpVideo from "./components/WarpVideo";
import WarpResults from "./components/WarpResults";
import useWindowSize from "./components/useWindowSize";
import WarpSingle from "./components/WarpSingle";
import useSound from "use-sound";
import { SoundProvider } from "./components/SoundContext";
import { ResizeProvider } from "./components/ResizeContext";
import Main from "./components/Main";

function App() {
  const [content, setContent] = useState("main");

  const [currentWarp, setCurrentWarp] = useState([]);

  const [sound, setSound] = useState(false);
  const soundValue = { sound, setSound };

  const [lockout, setLockout] = useState(true);

  const [newItems, setNewItems] = useState([]);

  const size = useWindowSize();

  const getWidth = useCallback(
    (width) => {
      return window.innerWidth > 1280 ? width : size.width / (1280 / width);
    },
    [size]
  );

  const getHeight = useCallback(
    (height, width) => {
      return window.innerWidth > 1280
        ? height
        : (getWidth(width) * height) / width;
    },
    [getWidth]
  );

  const resizeValue = { getWidth, getHeight };

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const [bgm] = useState(
    // allBGM[Math.floor(Math.random() * allBGM.length)]
    "ooc-timeline"
  );

  const [playMainBGM, mainData] = useSound(`assets/audio/bgm/${bgm}.mp3`, {
    loop: true,
    onload: () => setLockout(false),
    mute: true,
  });

  const [playWarpBGM, warpData] = useSound("/assets/audio/bgm/warp.mp3", {
    loop: true,
  });

  useEffect(() => {
    if (!sound) {
      mainData.pause();
      warpData.stop();
      return;
    }

    let mainTimeout;
    let warpTimeout;

    if (content === "main") {
      if (!mainData.sound.playing()) {
        mainData.sound.fade(0, 1, 2000);
        playMainBGM();
      }
    } else if (content === "single") {
      if (warpData.sound.playing()) return;
      playWarpBGM();
      warpData.sound.fade(0, 1, 1000);
    }
    return () => {
      if (content === "main") clearTimeout(warpTimeout);

      if (content === "video") {
        clearTimeout(warpTimeout);
        clearTimeout(mainTimeout);
      }
      if (!hasFive && !hasFour && content === "single") {
        clearTimeout(warpTimeout);
        warpData.sound.fade(1, 0, 1000);
        warpTimeout = setTimeout(() => {
          warpData.stop();
        }, 1000);
      }
      if (content === "results") {
        clearTimeout(warpTimeout);
        warpData.sound.fade(1, 0, 1000);
        warpTimeout = setTimeout(() => {
          warpData.stop();
        }, 1000);
      }
    };
  }, [
    content,
    sound,
    playMainBGM,
    mainData,
    playWarpBGM,
    warpData,
    hasFive,
    hasFour,
  ]);

  return (
    <ResizeProvider value={resizeValue}>
      <SoundProvider value={soundValue}>
        <div className="App">
          {content === "main" && (
            <Main
              lockout={lockout}
              setNewItems={setNewItems}
              setHasFive={setHasFive}
              setHasFour={setHasFour}
              setContent={setContent}
              setCurrentWarp={setCurrentWarp}
            />
          )}
          {content === "video" && (
            <WarpVideo
              src={
                hasFive
                  ? "/assets/five.mp4"
                  : hasFour
                  ? "/assets/four.mp4"
                  : "/assets/three.mp4"
              }
              onEnded={() => {
                setContent("single");
              }}
              mainBGM={{ playMainBGM, mainData }}
              warpBGM={{ playWarpBGM, warpData }}
            />
          )}
          {content === "single" && (
            <WarpSingle
              currentWarp={currentWarp}
              newItems={newItems}
              setNewItems={setNewItems}
              setContent={setContent}
            />
          )}
          {content === "results" && (
            <React.Fragment>
              <img
                className="ring"
                src="/assets/rings.webp"
                alt="rings"
                width={resizeValue.getWidth(550)}
              />
              <WarpResults
                currentWarp={currentWarp}
                newItems={newItems}
                onClose={() => {
                  setContent("main");
                  setNewItems([]);
                }}
              />
            </React.Fragment>
          )}
        </div>
      </SoundProvider>
    </ResizeProvider>
  );
}

export default App;
