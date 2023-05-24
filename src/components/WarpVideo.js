import { useContext, useState, useEffect } from "react";
import SoundContext from "./SoundContext";
import CloseButton from "./CloseButton";

const WarpVideo = ({ onEnded, event, mainBGM, warpBGM, rarity }) => {
  const { sound } = useContext(SoundContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || !sound) return;
    mainBGM.mainData.pause();
    let warpTimeout = setTimeout(
      () => {
        warpBGM.playWarpBGM();
        warpBGM.warpData.sound.fade(0, 1, 1500);
      },
      rarity === "five" ? 15500 : 14000
    );
    return () => {
      clearTimeout(warpTimeout);
    };
  }, [loaded, sound, mainBGM, warpBGM, rarity]);

  return (
    <section id="video-container">
      <CloseButton onClose={onEnded} />
      <video
        autoPlay
        onEnded={onEnded}
        muted={!sound}
        onCanPlayThrough={(e) => {
          if (sound) {
            e.target.volume = 0.5;
            setLoaded(true);
          }
        }}
      >
        <source
          src={`assets/${event ? "event" : "normal"}-${rarity}.webm`}
          type="video/webm"
        />
      </video>
    </section>
  );
};

export default WarpVideo;
