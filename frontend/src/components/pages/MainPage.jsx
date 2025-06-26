import Channels from '../channels/Channels.jsx'
import Messages from '../messages/Messages.jsx'
import MessageForm from '../messages/MessageForm.jsx'

import ActiveChannelInfo from '../channels/ActiveChannelInfo.jsx'
import AddChannelButton from '../channels/AddChannelButton.jsx'

import { Container, Row, Col } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <Row className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <Col xs="auto">
              <b>{t('channels')}</b>
            </Col>
            <Col xs="auto">
              <AddChannelButton />
            </Col>
          </Row>
          <Channels />
        </Col>
        <Col className="p-0 h-100 d-flex flex-column">
          <ActiveChannelInfo />
          <div className="flex-grow-1 overflow-auto">
            <Messages />
          </div>
          <div className="mt-auto px-5 py-3">
            <MessageForm />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MainPage
