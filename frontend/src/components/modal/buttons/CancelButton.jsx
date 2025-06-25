import { useTranslation } from 'react-i18next'

import { Button } from 'react-bootstrap'

const CancelButton = ({ disabled, onClick }) => {
  const { t } = useTranslation()

  return (
    <Button variant="secondary" className="me-2" disabled={disabled} onClick={onClick}>
      {t('reject')}
    </Button>
  )
}

export default CancelButton
