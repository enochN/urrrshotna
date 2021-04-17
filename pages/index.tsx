import Head from 'next/head';
import {useState} from "react";
import axios, {AxiosError} from "axios";
import styles from '../styles/Home.module.css';
import {Alert, Button, Form, Input, Layout, Typography}  from "antd";


const  {Header, Content, Footer} = Layout;
const { Title} = Typography;

type FormValues = {
  link: string
}

type ShortenLinkError = {
  error: string,
  error_description: string
}

type ShortenLinkResponse = {
  short_link: string
}

export default function Home() {
  const [status, setStatus]  = useState<'initial'| 'error' | 'success'>('initial');
  const [message, setMessage] = useState('');
  const [form] = Form.useForm();


  const onFinish = async ({link} : FormValues) => {
    try {
      const response = await axios.post<ShortenLinkResponse>('/api/shorten_link', {link});
      setStatus('success')
      setMessage(response.data?.short_link)
    } catch (e) {
      const error = e as AxiosError<ShortenLinkError>;
      setStatus('error')
      setMessage(error.response?.data?.error_description || 'Something went wrong')
    }
  }

  const onFinishedFailed = () => {
    setStatus('error')
    const error = form.getFieldError('link').join(' ')
    setMessage(error)
  }

  return (
    <Layout>
      <Head>
        <title>My Urrrshotna</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <div className={styles.logo} />
      </Header>

      <Content className={styles.content}>
        <div className={styles.shortner}>
          <Title level={5}>Copy &amp; Paste your lengthy link</Title>
          <Form form={form} onFinish={onFinish} onFinishFailed={onFinishedFailed}>
            <div className={styles.linkField}>
              <div className={styles.linkFieldInput}>
                <Form.Item name="link" noStyle rules={[{required: true, message: 'Please paste a correct link', type: 'url'}]}>
                  <Input placeholder={"https://super-long-url.com/blah-blah-blah-blah"} size="large" />
                </Form.Item>
              </div>
              <div className={styles.linkFieldButton}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{width: '100%'}} size="large">
                    Shorten!
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
          {['error', 'success'].includes(status) && <Alert showIcon message={message} type={status as 'error' | 'success'} />}
        </div>
      </Content>


      <Footer className={styles.footer}>
        Urrrshotna &copy; 2021
      </Footer>


    </Layout>
  )
}
