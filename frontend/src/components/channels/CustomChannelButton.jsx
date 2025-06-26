import { useTranslation } from 'react-i18next'
import { Dropdown, ButtonGroup } from 'react-bootstrap'

import PrimaryChannelButton from './PrimaryChannelButton.jsx'

const CustomChannelButton = (props) => {
  const { t } = useTranslation()

  const { id, classes, onClick, channelName, isActive, handleRemoveModal, handleRenameModal } = props

  return (
    <Dropdown className="d-flex justify-content-between w-100" as={ButtonGroup}>
      <PrimaryChannelButton id={id} classes={classes} onClick={onClick} channelName={channelName} />
      <Dropdown.Toggle split variant={isActive ? 'secondary' : 'light'} id={`dropdown-${id}`}>
        <span className="visually-hidden">{t('chat.management')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemoveModal}>{t('chat.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameModal}>{t('chat.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CustomChannelButton
