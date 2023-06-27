import React from 'react';
import { Form, Input } from 'antd';

const FormFields = (props) => {
    const { formItems } = props;
    return formItems.map(entry => {
        const { name, rules, placeholder, icon, type } = entry;
        return (
            <Form.Item
                key={name}
                name={name}
                rules={rules}
            >
                <Input type={type} placeholder={placeholder} prefix={React.createElement(icon)} />
            </Form.Item>
        )
    })
};

export default FormFields;
