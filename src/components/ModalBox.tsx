import Modal from 'react-modal';
import { useTheme } from '../hooks/useTheme';

import '../styles/modal.scss';

const customStyles: ReactModal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    alignContent: 'center',
    alignItems: 'center',
    //borderRadius: '8px',
    border: '0px'
  },
  overlay:{
    backgroundColor: 'rgba(41,41,46,0.5)'
  }
};

Modal.setAppElement('#root');

type ModelProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  confirmModal: () => void;
};

export function ModalBox(props: ModelProps) {
  let modalIsOpen = props.modalIsOpen;

  const { theme } = useTheme();

  return(
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
    >
      <div className={theme}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5.99988H5H21" stroke="#e73f5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#e73f5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2>Excluir pergunta</h2>
        <span>Tem certeza que você deseja excluir esta pergunta?</span>
        <span className="modal-footer">
          <button className="modal-button-close" onClick={props.closeModal}>Cancelar</button>
          <button className="modal-button-confirm" onClick={props.confirmModal}>Sim, excluir</button>
        </span>
      </div>
    </Modal>
  )
}