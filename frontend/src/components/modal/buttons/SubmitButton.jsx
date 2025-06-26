import { useTranslation } from 'react-i18next'

import { Button } from 'react-bootstrap'

const SubmitButton = ({ disabled, form }) => {
  const { t } = useTranslation()

  return (
    <Button type="submit" variant="primary" disabled={disabled} form={form}>
      {t('chat.send')}
    </Button>
  )
}

export default SubmitButton

//
