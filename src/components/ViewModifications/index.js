import "./index.scss"
import React, { useEffect, useState, memo } from 'react';
import { Form, Input, Button } from 'antd';

const ViewModifications = (props) => {
    const { data, mode, returnSubmit, index } = props
    const [formData, setFormData] = useState(data)
    useEffect(() => {
        // 清空表单
        form.resetFields()
        setFormData(data)
    })
    const [form] = Form.useForm();
    const onFinish = (data) => {
        returnSubmit && returnSubmit({ data, index })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <Form form={form}
        labelCol={{ span: 6, }}
        wrapperCol={{ span: 18, }}
        initialValues={formData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        {formData &&
            [Object.entries(formData).map(([key, value], index) => {
                return <Form.Item name={key} label={key} key={index + 1}>
                    {mode == "edit" ? <Input /> : value}
                </Form.Item>
            }),
            mode == "edit" && <Form.Item key={0}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>]
        }
    </Form>

}

export default ViewModifications