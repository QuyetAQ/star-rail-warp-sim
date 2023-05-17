import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import CloseButton from "./CloseButton";
import Button from "./Button";
import { allVers } from "../classes/Constants";
import VersionInfo from "./VersionInfo";

export default function VersionModal({ show, setShow, currentVers, setVers }) {
  const { sound } = useContext(SoundContext);
  const handleClose = () => {
    if (sound) playModalClose();
    setShow(false);
  };

  const [playModalClose] = useSound("../assets/audio/sfx/banner-close.mp3");
  const [playButton] = useSound("/assets/audio/sfx/button-select.mp3");
  const [playCancel] = useSound("/assets/audio/sfx/button-cancel.mp3");

  const [selected, setSelected] = useState(currentVers);

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={() => {
          handleClose();
          setSelected(currentVers);
        }}
      >
        <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
          <Modal.Title style={{ fontWeight: "bold" }}>
            Choose Your Banner Version
          </Modal.Title>
          <CloseButton
            onClose={() => {
              handleClose();
              setSelected(currentVers);
            }}
            variant="dark"
            style={{ transform: "translate(-10%, -10%)" }}
            resize={false}
          />
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
          {allVers.map((vers, i) => {
            return (
              <VersionInfo
                key={vers + i}
                isCurrentSelected={vers === selected}
                vers={vers}
                setSelected={setSelected}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#e9e7e2" }}>
          <Button
            onClick={() => {
              if (sound) {
                playCancel();
              }
              handleClose();
              setSelected(currentVers);
            }}
            text="Cancel"
            size="sm"
            resize={false}
          />
          <Button
            onClick={() => {
              if (sound) playButton();
              setVers(selected);
              sessionStorage.setItem("vers", selected);
              handleClose();
            }}
            text="Confirm"
            size="sm"
            resize={false}
          />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}