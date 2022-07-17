import { NextPageWithLayout } from '@/types/layout'
import DefaultLayout from '@/components/DefaulLayout/DefaultLayout'
import { ReactElement } from 'react'
import Head from 'next/head'
import MainForm from '@/components/MainForm/MainForm'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Redux Form</title>
      </Head>

      <MainForm />
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Home
