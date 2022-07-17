import { NextPageWithLayout } from '@/types/layout'
import DefaultLayout from '@/components/DefaulLayout/DefaultLayout'
import { ReactElement } from 'react'
import { Affix, Button } from '@mantine/core'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { incrementByAmount } from 'store/slices/counterSlice'
import { useGetPostsQuery } from 'store/slices/api/apiSlice'

const Home: NextPageWithLayout = () => {
  const { isLoading, isSuccess, isError, data, error } = useGetPostsQuery()
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  let content

  if (isLoading) {
    content = <div>loading...</div>
  } else if (isSuccess) {
    content = data.map((post) => <div key={post.id}>{post.title}</div>)
  } else if (isError) {
    content = <div>{error.toString()} wow you fucked up</div>
  }

  return (
    <>
      <Head>
        <title>Redux Form</title>
      </Head>

      {content}

      <Affix position={{ bottom: 25, right: 20 }}>
        <Button
          onClick={() => dispatch(incrementByAmount(100))}
          radius={100}
          sx={() => ({
            height: '60px',
            width: '60px',
          })}
        >
          {count}
        </Button>
      </Affix>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Home
