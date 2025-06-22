import AddChannelModal from './AddChannelModal.jsx'
import RemoveChannelModal from './RemoveChannelModal.jsx'

const modalComponents = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: null,
}

const getModalComponent = type => modalComponents[type]

export default getModalComponent
