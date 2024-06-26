import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { request } from '@/utils'
import { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import useChannel from '@/hooks/useChannel'
import { getArticleByIdApi } from '@/apis/article'




const { Option } = Select

const Publish = () => {
    // 频道列表
    const { channels } = useChannel()

    // 上传图片
    const cacheImageList = useRef([])
    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        setImageList(info.fileList)
        cacheImageList.current = info.fileList
    }

    // 控制图片Type
    const [imageType, setImageType] = useState(0)
    const onRadioChange = (e) => {
        const type = e.target.value
        setImageType(type)
        if (type === 1) {
            // 单图，截取第一张展示
            const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
            setImageList(imgList)
        } else if (type === 3) {
            // 三图，取所有图片展示
            setImageList(cacheImageList.current)
        }
    }

    // 发布文章
    const onFinish = async (formValue) => {
        if (imageType !== imageList.length) return message.warning('图片类型和数量不一致')
        const { channel_id, content, title } = formValue
        const params = {
            channel_id,
            content,
            title,
            type: imageType,
            cover: {
                type: imageType,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                })
            }
        }
        // 不同地方调用不同接口
        if (articleId) {
            await request.put(`/mp/articles/${articleId}?draft=false`, params)
            message.success('编辑文章成功')
        } else {
            await request.post('/mp/articles?draft=false', params)
            message.success('发布文章成功')
        }
    }


    // 回填数据
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')

    // 获取实例
    const [form] = Form.useForm()

    useEffect(() => {
        async function getArticleDetails() {
            const res = await getArticleByIdApi(articleId)
            const [data, { cover }] = [res.data, res.data]
            form.setFieldsValue({
                ...data,
                type: cover.type
            })
            setImageType(cover.type)
            setImageList(cover.images.map(url => {
                return {
                    url
                }
            }))
        }
        if (articleId) {
            getArticleDetails()
        }
    }, [articleId])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${articleId ? '编辑文章' : '发布文章'}` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 200 }}>
                            {channels.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面" ref={FormItem}>
                        <Form.Item name="type">
                            <Radio.Group onChange={onRadioChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList
                                action={'http://geek.itheima.net/v1_0/upload'}
                                onChange={onUploadChange}
                                maxCount={imageType}
                                multiple={imageType > 1}
                                fileList={imageList}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {articleId ? '编辑文章' : '发布文章'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish