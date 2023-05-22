import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import useSound from "use-sound";
import SoundContext from "../SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { useTranslation, Trans } from "react-i18next";

export default function CreditsModal({ show, setShow }) {
  const { sound } = useContext(SoundContext);
  const handleClose = () => {
    setShow(false);
  };

  const [playModalClose] = useSound("../assets/audio/sfx/modal-close.mp3");
  const [playButton] = useSound("/assets/audio/sfx/button-select.mp3");

  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      onExiting={() => {
        if (sound) playModalClose();
      }}
    >
      <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
        <Modal.Title style={{ fontWeight: "bold" }}>
          {t("modal.credits.title")}
        </Modal.Title>
        <CloseButton
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
        <Trans i18nKey="modal.credits.body">
          Most assets belong to Mihoyo and were taken from in Honkai Star Rail
          and edited.
          <br />
          Some icons provided by:
          <ul>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/reset"
                title="reset icons"
                target="_blank"
                rel="noreferrer"
              >
                Reset icons created by inkubators - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/cinema"
                title="cinema icons"
                target="_blank"
                rel="noreferrer"
              >
                Cinema icons created by SumberRejeki - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/country"
                title="country icons"
                target="_blank"
                rel="noreferrer"
              >
                Country icons created by Freepik - Flaticon
              </a>
            </li>
          </ul>
        </Trans>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e9e7e2" }}>
        <Button
          onClick={() => {
            handleClose();
            if (sound) {
              playButton();
            }
          }}
          text="Close"
          size="sm"
          resize={false}
        />
      </Modal.Footer>
    </Modal>
  );
}
