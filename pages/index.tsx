import { Layout, Text, Code, Page, Link } from '@vercel/examples-ui'
import Post from '@/components/post'
import Head from 'next/head'
import { CronKeyEnums } from 'utils/const'

const cronJobs = [
  {
    id: CronKeyEnums['XS20-HK'],
    name: 'Fetch Fuji Camera Stock',
    cron: 'fetch every day',
  },
]

// 将cron转成具体文案
const image = 'https://cron-template.vercel.app/thumbnail.png'

export default function Home({ data }: { data: any }) {
  return (
    <Page>
      <Head>
        <meta property="og:image" content={image} />
        <meta name="twitter:image" content={image} />
      </Head>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Cron Jobs</Text>
      </section>
      <section className="grid gap-6 mt-10 pt-10 border-t border-gray-300">
        <div className="flex flex-col gap-12">
          {cronJobs.map((cronJob) => (
            <div key={cronJob.id} className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <Text variant="h2">{cronJob.name}</Text>
                <Code>{(cronJob.cron)}</Code>
              </div>
              <Post interval={cronJob.id} />
            </div>
          ))}
        </div>
      </section>
    </Page>
  )
}

Home.Layout = Layout
