/**
 * 定时拉香港富士相机库存
 */
import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CronKeyEnums, fujiStockMailDetails } from 'utils/const'
import axios from 'axios'
import { sendEmail } from 'utils/email'
import { sendLarkTextMessage } from 'utils/lark'
const { parse } = require('node-html-parser')

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const cron = req.nextUrl.pathname.split('/')[3]
  console.log(cron)
  if (!cron) return new Response('No cron provided', { status: 400 })
  const response = await update(CronKeyEnums['XS20-HK'])
  return new NextResponse(JSON.stringify(response), {
    status: 200,
  })
}

async function update(key: string) {
  // 1. 请求当前这个商品的页面
  try {
    const json: any = await axios.get(
      'https://fujifilmshop.com.hk/zh-hant/products/detail/289'
    )

    const html = parse(json.data)
    // 2. 解析页面，获取库存
    // 找到所有className为add-cart，如果它className为quantity的子元素，没有disable className，就是有库存
    const stock = [...html.querySelectorAll('.add-cart')].filter((el: any) => {
      // debugger
      return true

      
      // 正确的
      return !el.querySelector('.quantity').classList.contains('disable')

    }).length

    // 3. 如果有库存，存入KV，并发送邮件到指定邮箱
    if (stock > 0) {
      for (const to of fujiStockMailDetails.tos) {
        // sendEmail(to, fujiStockMailDetails.subject, fujiStockMailDetails.html)
      }
      sendLarkTextMessage('有货了！')
    }

    const response = await kv.set(key, {
      fetchedAt: Date.now(),
      stock,
      productName: '富士 香港官网 xs-20',
    })

    console.log('[rosetta-debug]->response', response);

    return response
  } catch (error) {
    console.log('[rosetta-debug]->error', error);
    return new Response('Failed to fetch Fuji camera stock', { status: 500 })
  }
}

