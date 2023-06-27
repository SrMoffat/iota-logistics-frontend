import React from 'react';

import { Form } from 'antd';

const FormComponent = (props) => {
    const [FormInstance] = Form.useForm();
    const { children, name, layout, onFinishFailed, onFinish, initialValues } = props;
    return (
        <Form
            form={FormInstance}
            layout={layout}
            name={name}
            initialValues={initialValues}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            autoComplete="off"
            {...props}
        >
           {children}
        </Form>
    )
};

export default FormComponent;
