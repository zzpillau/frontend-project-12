import { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'

import { selectUsername } from '../../slices/authSlice.js'
import { selectActiveChannelId } from '../../slices/channelsSlice.js'
import { useAddMessageMutation } from '../../api/messagesApi.js'
import AuthContext from '../../contexts/index.js'

import handleQueryErrors from '../../utils/handleQueryErrors.js'

const MessageForm = () => {
  const { t } = useTranslation()

  const [addMessage] = useAddMessageMutation()

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const username = useSelector(selectUsername)
  const activeChannelId = useSelector(selectActiveChannelId)

  const auth = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const newMessage = {
          id: uniqueId(),
          body: values.body,
          channelId: activeChannelId,
          username: username,
        }

        await addMessage(newMessage).unwrap()
        resetForm()
      }
      catch (err) {
        handleQueryErrors(err, auth, t)
      }
      finally {
        formik.setSubmitting(false)
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit} noValidate autoComplete="off" className="py-1 border rounded-2 ">
      <Form.Group className="input-group has-validation">
        <Form.Control
          onChange={formik.handleChange}
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.body}
          placeholder={t('chat.input_message')}
          name="body"
          autoComplete="off"
          id="body"
          required
          aria-label={t('chat.new_message')}
          ref={inputRef}
        />
        <Button
          type="submit"
          variant="outline"
          className="btn btn-group-vertical"
          disabled={formik.isSubmitting || !formik.values.body.length}
        >
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </Form.Group>
    </Form>
  )
}

export default MessageForm
