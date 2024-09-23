import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, closeModal, modal }) => {
  if (!modal) {
    return;
  }

  const { urls, description, user, likes } = modal;

  return (
    <div className={css.modal}>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.85",
            display: "flex",
            justifyContent: "center",
          },
          content: {
            top: "20px",
            left: "auto",
            right: "auto",
            bottom: "20px",
          },
        }}
      >
        <div className={css.container}>
          <img src={urls.regular} />
          <div>
            <p>
              Description: {description} . Likes: {likes} .
            </p>
            <p>
              Name: {user.name} . Location: {user.location} .
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
