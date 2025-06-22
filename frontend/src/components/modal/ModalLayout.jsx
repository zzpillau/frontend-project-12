import Modal from 'react-bootstrap/Modal'

const ModalLayout = ({ show, onHide, children}) => {
  // TODO layout должен принимать тип модалки

  return (
    <Modal show={show} onHide={onHide} centered>
      {children}
    </Modal>
  )
}

export default ModalLayout
