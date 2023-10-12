import React from "react";
import Modal from "react-bootstrap/Modal";
// import SoundContext from "../context/SoundContext";
import CloseButtonNoSound from "../CloseButtonNoSound";
import ButtonNoSound from "../ButtonNoSound";
import { useTranslation } from "react-i18next";
import { useServiceWorker } from "../../useServiceWorker";

export default function UpdateModal({ show, setShow }) {
  const { reloadPage } = useServiceWorker();
  // const { sound, useSound } = useContext(SoundContext);
  const handleClose = () => setShow(false);
  // const [playModalOpen] = useSound("../assets/audio/sfx/modal-open.mp3");
  // const [playModalClose] = useSound("../assets/audio/sfx/modal-close.mp3");

  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onEntering={() => {
        // if (sound) playModalOpen();
      }}
      onExiting={() => {
        // if (sound) playModalClose();
      }}
      centered
    >
      <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
        <Modal.Title style={{ fontWeight: "bold" }}>
          {t("modal.update.header")}
        </Modal.Title>
        <CloseButtonNoSound
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
        {t("modal.update.body")}
      </Modal.Body>
      <Modal.Footer
        className="justify-content-center"
        style={{ backgroundColor: "#e9e7e2" }}
      >
        <ButtonNoSound
          cancel
          onClick={() => reloadPage()}
          content={
            <span className="d-flex align-items-center justify-content-center">
              <img
                className="mx-1"
                alt="Confirm"
                src="assets/button-confirm.webp"
                width={18}
              />
              {t("modal.update.footer")}
            </span>
          }
          size="sm"
          resize={false}
        />
      </Modal.Footer>
    </Modal>
  );
}
