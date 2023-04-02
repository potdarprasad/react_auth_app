import { Field } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';

type TextFormFieldProps = {
    type?: string;
    label: string;
    name: string;
    value?: any;
    error?: any;
    touched?: any;
    onChange?: any;
    onBlur?: any;
}


function TextFormField(props: TextFormFieldProps) {
    return (
        <Form.Group>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type ?? 'text'}
                name={props.name}
                className='form-control'
                onChange={props.onChange}
                onBlur={props.onBlur}
                required
            />
            {props.error && props.touched && (
                <span className='text-danger' style={{ fontSize: "12px" }}>
                    {props.error}
                </span>
            )}
        </Form.Group>
    )
}

export default TextFormField;