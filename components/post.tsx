import ms from 'ms'
import useSWR from 'swr'

interface DataProps {
  id: number
  time: number
  stock: number
  fetchedAt: number
}

export default function Post({ interval }: { interval: string }) {
  const { data } = useSWR<DataProps>(`/api/data/${interval}`, (url: string) =>
    fetch(url).then((res) => res.json())
  )

  if (!data)
    return (
      <div className="flex justify-between items-center border border-gray-100 shadow-md rounded-lg p-5">
        <div className="grid gap-3">
          <div className="bg-gray-200 animate-pulse rounded-md w-96 h-6" />
          <div className="bg-gray-200 animate-pulse rounded-md w-60 h-4" />
        </div>
        <div className="bg-gray-200 animate-pulse rounded-md w-28 h-4" />
      </div>
    )

  const { id, stock, fetchedAt } = data || {}
  return ( 
    <div className="flex justify-between items-center border border-gray-100 shadow-md rounded-lg p-5">
      <div className="grid gap-2">
        <div className="flex items-center">
          <a
            href={'https://fujifilmshop.com.hk/zh-hant/products/detail/289'}
            target="_blank"
            rel="noreferrer noopener"
          >
            <h3 className="text-gray-600 hover:text-black font-semibold transition-all">
              Fuji Camera
            </h3>

          </a>
          <button
            className="bg-blue text-white font-bold py-1 px-2 rounded ml-2 text-xs"
            onClick={() => {
              fetch(`/api/cron/fetchFujiCameraStock`)
            }}
          >
            Check now
          </button>
        </div>

        <div className="flex space-x-1 text-gray-500 text-sm">
          <a >stock:</a>
          <span>{stock}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm">fetched {timeAgo(fetchedAt)}</p>
    </div>
  )
}

const timeAgo = (time: number): string => {
  if (!time) return 'Never'
  return `${ms(Date.now() - new Date(time).getTime())} ago`
}
