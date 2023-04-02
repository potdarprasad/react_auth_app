import { Field, Formik, FormikHelpers, FormikProps, FormikValues, useFormik } from 'formik'
import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import * as Yup from 'yup';
import TextFormField from '../common/TextFormField';

type NotesModalType = {
  show: boolean,
  handleClose: () => any,
  handleOpen: () => any
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

function NotesModal({ show, handleClose, handleOpen }: NotesModalType) {
  const formRef = useRef<FormikProps<FormikValues>>(null);

  const submit = () => {
    console.log('called');
    if (formRef.current) {
      console.log('aaa');
      formRef.current.handleSubmit();
    }
  }


  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={
            { firstName: '' }
          }
          onSubmit={(values) => {
            console.log('submit', values);
          }}
          validationSchema={SignupSchema}
          innerRef={formRef}
        >
          {({ errors, touched, values, handleBlur, handleChange }) => (
            <TextFormField
              label='First Name'
              name='firstName'
              error={errors.firstName}
              touched={touched.firstName}
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          )}
        </Formik>

      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' variant='primary' onClick={submit}>Create</Button>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )
}

export default NotesModal