import React, { useContext } from "react";
import "../css/Banners.css";
import "../css/vers/1.1.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../components/ResizeContext";
import { useTranslation } from "react-i18next";

const BrilliantFixationJY = () => {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { i18n } = useTranslation();
  return (
    <React.Fragment>
      <div
        style={{
          width: getWidth(764),
          height: getHeight(677.33, 1100),
          background:
            "linear-gradient(to bottom, rgba(164, 164, 128, 1) 70%, rgba(255, 255, 255, 0) 100%)",
          position: "absolute",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(8, 8, 8, 0.521)",
          top: "50%",
          left: "50%",
          transform: "translate(-27.5%, -50%)",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/banner/right-corner.webp)",
            height: getHeight(200, 148),
            width: getWidth(148),
            backgroundSize: `${getWidth(148)}px ${getHeight(200, 148)}px`,
            position: "absolute",
            zIndex: "100",
            right: "0",
          }}
        />
        <LazyLoadImage
          effect="opacity"
          src="../assets/banner/1.1/weap-banner-back.webp"
          width={getWidth(1200)}
          alt="right"
          draggable="false"
          style={{
            animation: "jing-yuan-weap-back-animation 2s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/1.1/weap-rate-1.webp"
        alt="The Moles Welcome You"
        width={getWidth(135)}
        style={{
          animation: "cone-1-animation 0.3s 1",
          animationTimingFunction: "linear",
          animationFillMode: "both",
          animationDelay: "100ms",
        }}
      />
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/1.1/weap-rate-2.webp"
        alt="Post-Op Conversation"
        width={getWidth(108)}
        style={{
          animationTimingFunction: "linear",
          animation: "cone-2-animation 0.3s 1",
          animationFillMode: "both",
          animationDelay: "150ms",
        }}
      />
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/1.1/weap-rate-3.webp"
        alt="Good Night and Sleep Well"
        width={getWidth(108)}
        style={{
          animationTimingFunction: "linear",
          animation: "cone-3-animation 0.3s 1",
          animationFillMode: "both",
          animationDelay: "200ms",
        }}
      />
      <LazyLoadImage
        effect="opacity-100"
        src={`../assets/banner/1.1/${i18n.resolvedLanguage}/weap-left.webp`}
        width={getWidth(1101.5)}
        alt="left"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "100",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        className="ring"
        src="/assets/rings.webp"
        alt="rings"
        width={getWidth(550)}
        style={{
          filter: "brightness(1.4)",
          top: "50%",
          left: "50%",
          animation: "banner-ring-spin 60s infinite linear",
          transform: `translate(-24%, -50%) rotate(${Math.floor(
            Math.random() * 360
          )}deg)`,
        }}
      />
      {/* <LazyLoadImage
        effect="opacity"
        src="../assets/magnify.webp"
        width={getWidth(40)}
        alt="magnify"
        draggable="false"
        style={{
          zIndex: 100,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-540%, 40%)",
          filter: "brightness(0.4)",
        }}
      /> */}
    </React.Fragment>
  );
};

export default BrilliantFixationJY;
