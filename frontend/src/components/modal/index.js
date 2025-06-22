import AddChannelModal from "./AddChannelModal.jsx";

const modalComponents = {
  'add': AddChannelModal,
  'remove': null,
  'rename': null
}

const getModalComponent = (type) => modalComponents[type]

export default getModalComponent