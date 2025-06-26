import { useTranslation } from 'react-i18next'

import { Button } from 'react-bootstrap'

const DeleteButton = ({ disabled, onClick }) => {
  const { t } = useTranslation()

  return (
    <Button variant="danger" disabled={disabled} onClick={onClick}>
      {t('chat.remove')}
    </Button>
  )
}

export default DeleteButton
