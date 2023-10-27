import React, { useState, useContext, useMemo, useEffect } from "react";
import SoundContext from "./context/SoundContext";
import { json, allChars, allWeapons, LATESTVERS } from "../util/Constants";
import { CalcWarp } from "../util/CalcWarp";
import History from "../util/History";
import WarpButtons from "./WarpButtons";
import MiniBanners from "./MiniBanners";
import Settings from "./Settings";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "./context/ResizeContext";
import DepartureWarp from "../banners/DepartureWarp";
import ButterflyOnSwordtip from "../banners/1.0.1/ButterflyOnSwordtip";
import BrilliantFixationS from "../banners/1.0.1/BrilliantFixationS";
import BrilliantFixationJY from "../banners/1.0.2/BrilliantFixationJY";
import SwirlOfHeavenlySpear from "../banners/1.0.2/SwirlOfHeavenlySpear";
import BrilliantFixationSW from "../banners/1.1.1/BrilliantFixationSW";
import ContractZero from "../banners/1.1.1/ContractZero";
import BrilliantFixationL from "../banners/1.1.2/BrilliantFixationL";
import LaicPursuit from "../banners/1.1.2/LaicPursuit";
import BrilliantFixationB from "../banners/1.2.1/BrilliantFixationB";
import ALostSoul from "../banners/1.2.1/ALostSoul";
import BrilliantFixationK from "../banners/1.2.2/BrilliantFixationK";
import NessunDorma from "../banners/1.2.2/NessunDorma";
import EpochalSpectrum from "../banners/1.3.1/EpochalSpectrum";
import BrilliantFixationI from "../banners/1.3.1/BrilliantFixationI";
import FFF from "../banners/1.3.2/FFF";
import BrilliantFixationFX from "../banners/1.3.2/BrilliantFixationFX";
import GEOTM from "../banners/1.4.1/GEOTM";
import BrilliantFixationJ from "../banners/1.4.1/BrilliantFixationJ";
import SunsetClause from "../banners/1.4.2/SunsetClause";
import BrilliantFixationTAN from "../banners/1.4.2/BrilliantFixationTAN";
import RerunChar142 from "../banners/1.4.2/RerunChar142";
import RerunWeap142 from "../banners/1.4.2/RerunWeap142";
import Banner151 from "../banners/1.5.1/151";
import BrilliantFixation151 from "../banners/1.5.1/BrilliantFixation151";
import Banner152 from "../banners/1.5.2/152";
import BrilliantFixation152 from "../banners/1.5.2/BrilliantFixation152";
import StellarWarp from "../banners/StellarWarp";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

export default function Main({
  bannerType,
  bannerState,
  setBannerState,
  showDB,
  setShowDB,
  setBannerType,
  setNewItems,
  setHasFive,
  setHasFour,
  setContent,
  setCurrentWarp,
  setDBType,
  showStart,
  history,
  setHistory,
  bgm,
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);

  const [playOpenDetails] = useSound("/assets/audio/sfx/details-open.mp3");
  const [playOpenStats] = useSound("/assets/audio/sfx/stats-open.mp3");

  const { t, i18n } = useTranslation();

  const [vers, setVers] = useState(
    sessionStorage.getItem("vers") || LATESTVERS
  );

  const [totalBeginner, setTotalBeginner] = useState(
    parseInt(localStorage.getItem("totalBeginner")) || 0
  );

  const localStore = (suffix, value) => {
    switch (bannerType) {
      case "beginner":
        localStorage.setItem("beg" + suffix, value);
        break;
      case "char":
        localStorage.setItem("char" + suffix, value);
        break;
      case "weap":
        localStorage.setItem("weap" + suffix, value);
        break;
      default:
        localStorage.setItem("stand" + suffix, value);
        break;
    }
  };

  // creates stash and updates it if there are new entities
  useEffect(() => {
    const allItems = allChars.concat(allWeapons);
    var stash = JSON.parse(localStorage.getItem("stash")) || {};

    allItems.forEach((item) => {
      if (stash[item] === undefined) stash[item] = 0;
    });
    localStorage.setItem("stash", JSON.stringify(stash));
  }, []);

  const updateStash = (warpItem) => {
    let stash = JSON.parse(localStorage.getItem("stash"));
    if (stash[warpItem] === 0) setNewItems((prev) => [...prev, warpItem]);
    stash[warpItem]++;
    localStorage.setItem("stash", JSON.stringify(stash));
  };

  const allBanners = useMemo(() => {
    return {
      "1.0.1": {
        char: <ButterflyOnSwordtip />,
        weap: <BrilliantFixationS />,
      },
      "1.0.2": {
        char: <SwirlOfHeavenlySpear />,
        weap: <BrilliantFixationJY />,
      },
      "1.1.1": {
        char: <ContractZero />,
        weap: <BrilliantFixationSW />,
      },
      "1.1.2": {
        char: <LaicPursuit />,
        weap: <BrilliantFixationL />,
      },
      "1.2.1": {
        char: <ALostSoul />,
        weap: <BrilliantFixationB />,
      },
      "1.2.2": {
        char: <NessunDorma />,
        weap: <BrilliantFixationK />,
      },
      "1.3.1": {
        char: <EpochalSpectrum />,
        weap: <BrilliantFixationI />,
      },
      "1.3.2": {
        char: <FFF />,
        weap: <BrilliantFixationFX />,
      },
      "1.4.1": {
        char: <GEOTM />,
        weap: <BrilliantFixationJ />,
      },
      "1.4.2": {
        char: <SunsetClause />,
        weap: <BrilliantFixationTAN />,
        "rerun-char": <RerunChar142 />,
        "rerun-weap": <RerunWeap142 />,
      },
      "1.5.1": {
        char: <Banner151 />,
        weap: <BrilliantFixation151 />,
      },
      "1.5.2": {
        char: <Banner152 />,
        weap: <BrilliantFixation152 />,
      },
    };
  }, []);

  const currentBanners = {
    beginner: <DepartureWarp total={totalBeginner} />,
    char: allBanners[vers]["char"],
    weap: allBanners[vers]["weap"],
    "rerun-char": allBanners[vers]["rerun-char"],
    "rerun-weap": allBanners[vers]["rerun-weap"],
    standard: <StellarWarp />,
  };

  const bannerBackColor = {
    "1.0.1": {
      char: "#0a162e",
      weap: "#0a162e",
    },
    "1.0.2": {
      char: "#1f2930",
      weap: "black",
    },
    "1.1.1": {
      char: "#232a3c",
      weap: "black",
    },
    "1.1.2": {
      char: "black",
      weap: "black",
    },
    "1.2.1": {
      char: "black",
      weap: "black",
    },
    "1.2.2": {
      char: "#241330",
      weap: "#241330",
    },
    "1.3.1": {
      char: "#0f1222",
      weap: "black",
    },
    "1.3.2": {
      char: "#17072b",
      weap: "black",
    },
    "1.4.1": {
      char: "#1c253f",
      weap: "black",
    },
    "1.4.2": {
      char: "black",
      weap: "black",
      "rerun-char": "#0a162e",
      "rerun-weap": "#0a162e",
    },
    "1.5.1": {
      char: "#24283b",
      weap: "black",
    },
    "1.5.2": {
      char: "#43444a",
      weap: "black",
    },
  };

  const handleWarp = (warps) => {
    if (bannerType === "beginner") {
      setTotalBeginner(totalBeginner + 1);
      localStorage.setItem("totalBeginner", totalBeginner + 1);
      if (totalBeginner === 4) {
        setBannerType("char");
        sessionStorage.setItem("bannerType", "char");
      }
    }

    let type = bannerType.includes("rerun")
      ? bannerType.includes("char")
        ? "char"
        : "weap"
      : bannerType;

    const prevTotal = parseInt(localStorage.getItem(type + "Total")) || 0;
    localStorage.setItem(type + "Total", prevTotal + warps);

    setHasFive(false);
    setHasFour(false);
    let warpResults = [];
    let banner = bannerState[type];
    for (let i = 0; i < warps; i++)
      warpResults.push(
        CalcWarp(vers, bannerType, banner, setHasFive, setHasFour)
      );

    warpResults.map((item) => {
      updateStash(item);
      return item;
    });

    localStore("PityFive", bannerState[type].pityFive);
    localStore("PityFour", bannerState[type].pityFour);
    localStore("GuaranteeFive", bannerState[type].guaranteeFive);
    localStore("GuaranteeFour", bannerState[type].guaranteeFour);

    let historyClone = structuredClone(history);
    historyClone[type] = historyClone[type].concat(
      new History(warpResults).getHistory()
    );
    localStore("History", JSON.stringify(historyClone[type]));
    setHistory(historyClone);

    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    setBannerState(bannerStateClone);
    setCurrentWarp(warpResults);
    setContent("video");
  };

  const getBack = () => {
    if (bannerType === "beginner") return "beginner/beginner";
    if (bannerType === "standard") return "standard/standard";
    if (bannerType.includes("rerun"))
      return `${json.getRerun(vers)}/${
        bannerType.includes("char") ? "char" : "weap"
      }`;
    return `${vers}/${bannerType}`;
  };

  const setActiveBanner = (banner) => {
    if (bannerType !== banner) {
      setBannerType(banner);
      sessionStorage.setItem("bannerType", banner);
    }
  };

  return (
    <motion.section
      key="main"
      exit={{ opacity: 0 }}
      id="main-back"
      style={{
        backgroundImage: `url(/assets/banner/${getBack()}-back.webp)`,
        backgroundColor: `${bannerType === "beginner"
          ? "#1f2322"
          : bannerBackColor[vers][bannerType]
          }`,
      }}
    >
      <Settings
        vers={vers}
        showDB={showDB}
        setShowDB={setShowDB}
        setVers={setVers}
        setDBType={setDBType}
        setContent={setContent}
        showStart={showStart}
        bgm={bgm}
        setBannerType={setBannerType}
      />
      <div
        id="main-back-cover"
        style={{
          backgroundImage: "url(assets/banner/cover-pattern.webp)",
          backgroundSize: `${getWidth(10)}px ${getHeight(8, 10)}px`,
        }}
      />
      <LazyLoadImage
        effect="opacity"
        draggable="false"
        className="ring"
        src="/assets/rings.webp"
        alt="rings"
        width={getWidth(550)}
      />
      <div
        id="info"
        style={{
          width: getWidth(680, 200),
          height: getHeight(50, 680, 20, 200),
        }}
      >
        <div
          id="warp-icon"
          style={{
            backgroundImage: "url(/assets/icon-warp.webp)",
            width: getWidth(44, 22),
            height: getWidth(44, 22),
            backgroundSize: getWidth(44, 22),
          }}
        />
        <div
          style={{
            height: getHeight(50, 600),
            width: getWidth(600),
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
          }}
        >
          <div
            id="title"
            style={{
              fontSize: getWidth(22, 9),
              height: getWidth(24, 11),
              textAlign: "left",
              marginTop: `-6px`,
            }}
          >
            {t("main.title")}
          </div>
          <div
            id="warp-type"
            style={{
              textAlign: "left",
              fontSize: getWidth(24, 11),
              height: getWidth(24, 11),
            }}
          >
            {json.getTitle(vers, bannerType, i18n.resolvedLanguage)}
          </div>
        </div>
      </div>
      <div
        className="position-absolute"
        style={{
          top: "0",
          left: "0",
          height: getHeight(500, 300, 200),
          width: getWidth(300),
          transform: "translateY(15%)",
          zIndex: 10000,
        }}
      >
        <MiniBanners
          vers={vers}
          bannerType={bannerType}
          setBannerType={setBannerType}
          hasBeginner={totalBeginner < 5}
          handleSelect={setActiveBanner}
        />
      </div>
      <div
        id="banner-container"
        rerun={json.checkRerun(vers).toString()}
        style={{
          width: getWidth(1200),
          height: getHeight(700, 1200),
        }}
      >
        <AnimatePresence>
          <motion.div
            className="banner"
            key={bannerType + vers}
            initial={
              bannerType === "beginner"
                ? {}
                : {
                  transform: `translate(-50%, 500%)`,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }
            }
            animate={{
              transform: "translate(-50%,-50%)",
              opacity: 1,
              transition: { duration: bannerType === "beginner" ? 0 : 0.3 },
            }}
            exit={
              bannerType === "beginner"
                ? { opacity: 0 }
                : {
                  transform: `translate(-50%, -500%)`,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }
            }
          >
            {currentBanners[bannerType]}
          </motion.div>
        </AnimatePresence>
        <Button
          style={{
            position: "absolute",
            bottom: "-1.5%",
            left: "3.5%",
            zIndex: "1000",
          }}
          onClick={() => {
            if (sound) playOpenStats();
            setContent("stats");
          }}
          content={t("button.stats")}
        />
        <Button
          style={{
            position: "absolute",
            bottom: "-1.5%",
            left: "25%",
            zIndex: "1000",
          }}
          onClick={() => {
            if (sound) playOpenDetails();
            setContent("details");
          }}
          content={t("button.view-details")}
        />
        <WarpButtons onWarp={handleWarp} event={bannerType} />
      </div>
      <div
        id="teams"
        style={{
          fontSize: getWidth(36, 12),
          height: getWidth(24, 11),
          textAlign: "left",
          marginTop: `-6px`,
        }}
      >
        1Studio
        {/* <a
          href="https://play.google.com/store/apps/developer?id=1Studio"
          title="1Studio"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#dcc491' }}
        >
          1Studio
        </a> */}
      </div>
    </motion.section>
  );
}
