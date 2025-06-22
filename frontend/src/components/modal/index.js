import AddChannelModal from './AddChannelModal.jsx'
import RemoveChannelModal from './RemoveChannelModal.jsx'
import RenameChannelModal from './RenameChannelModal.jsx'

const modalComponents = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
}

const getModalComponent = type => modalComponents[type]

export default getModalComponent
