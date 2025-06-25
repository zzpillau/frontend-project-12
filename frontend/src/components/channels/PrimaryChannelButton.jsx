import { Button } from 'react-bootstrap'

import leoFilter from 'leo-profanity'

const PrimaryChannelButton = ({ id, classes, onClick, channelName }) => {
  return (
    <Button
      id={id}
      type="button"
      variant="null"
      className={classes}
      onClick={onClick}
    >
      <span className="me-1">#</span>
      {leoFilter.clean(channelName)}
    </Button>
  )
}

export default PrimaryChannelButton
