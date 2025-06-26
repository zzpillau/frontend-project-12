import tomato from '../../assets/tomato.png'

import { Container, Row, Col, Image } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

const PageNotFound = () => {
  const { t } = useTranslation()

  return (
    <Container fluid className="text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <Image alt="Страница не найдена" className="img-fluid h-25" src={tomato} style={{ height: '25%' }} />
          <h1 className="h4 text-muted">{t('page_not_found')}</h1>
          <p className="text-muted">
            {t('you_can_go')}
            {' '}
            <Link to="/">{t('to_main_page')}</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default PageNotFound
