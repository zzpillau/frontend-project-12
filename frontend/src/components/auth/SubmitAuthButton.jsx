import { Button } from 'react-bootstrap'

const SubmitAuthButton = ({ title }) => {
  return (
    <Button className="w-100" type="submit" variant="outline-primary">{title}</Button>
  )
}

export default SubmitAuthButton
