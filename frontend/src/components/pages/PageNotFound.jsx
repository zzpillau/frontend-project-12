import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'

import tomato from '../../assets/tomato.png'

const PageNotFound = () => {
  const { t } = useTranslation()

  return (
    <Container fluid className="pt-5 px-0 text-center">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={6}>
            <Image alt="Страница не найдена" className="img-fluid h-25" src={tomato} style={{ height: '25%' }} />
            <h1 className="h4 text-muted">{t('texts.page_not_found')}</h1>
            <p className="text-muted">
              {t('texts.you_can_go')}
              {' '}
              <Link to="/">{t('texts.to_main_page')}</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default PageNotFound
