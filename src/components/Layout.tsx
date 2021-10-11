import React from 'react'
import { Sidebar, Content, Header, Main, Footer } from './'
import { Grid } from '@chakra-ui/layout'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Grid templateColumns="250px 1fr">
      <Sidebar />
      <Content>
        <Header></Header>
        <Main>{children}</Main>
        <Footer></Footer>
      </Content>
    </Grid>
  )
}
