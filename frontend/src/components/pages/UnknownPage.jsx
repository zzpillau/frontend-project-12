import React from 'react'
import tomato from '../../assets/tomato.png'

import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

const UnknownPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={tomato} />
      <h1 className="h4 text-muted">{t('page_not_found')}</h1>
      <p className="text-muted">
        {t('you_can_go')}
        {' '}
        <Link to="/">{t('to_main_page')}</Link>
      </p>
    </div>
  )
}

export default UnknownPage
