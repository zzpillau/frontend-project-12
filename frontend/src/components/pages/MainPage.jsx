import Channels from '../channels/Channels.jsx'
import Messages from '../messages/Messages.jsx'
import MessageForm from '../messages/MessageForm.jsx'

import ActiveChannelInfo from '../channels/ActiveChannelInfo.jsx'
import AddChannelButton from '../channels/AddChannelButton.jsx'

import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('channels')}</b>
            <AddChannelButton />
          </div>
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ActiveChannelInfo />
            <Messages />
            <div className="mt-auto px-5 py-3">
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
