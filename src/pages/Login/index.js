import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values)
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="mobile"
                        // 多条检验逻辑 先校验第一条，第一条通过之后才检验之后的
                        rules={
                            [
                                { required: true, message: '请输入手机号' },
                                {
                                    pattern: /^1[3456789]\d{9}$/,
                                    message: '手机号格式错误'
                                }
                            ]
                        }
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={
                            [
                                { required: true, message: '请输入验证码' }
                            ]
                        }
                    >
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login