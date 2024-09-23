import axios from 'axios'
/**
  *
  * @param targetUrl 群机器人地址
  * @param text 文本内容
  * @returns
  */
export const sendLarkTextMessage = (text: string, webhookUrl: string = 'https://open.feishu.cn/open-apis/bot/v2/hook/fae615b4-5f04-436d-9f0c-bb11c1dacd46') => {
  const config = {
    method: 'post',
    url: webhookUrl,
    headers: {
      'Content-Type': 'text/plain'
    },
    data: JSON.stringify({
      msg_type: 'text',
      content: {
        text
      }
    })
  } as any

  return axios(config)
}