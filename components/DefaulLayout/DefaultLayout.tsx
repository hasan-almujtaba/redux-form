import React, { useState } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  useMantineColorScheme,
  Button,
} from '@mantine/core'
import { DefaultLayout } from '../../types/layout'
import { BsSunFill, BsMoonFill, BsGithub } from 'react-icons/bs'
import Link from 'next/link'
import ActionButton from '../ActionButton/ActionButton'
import useStyles from './DefaultLayout.styles'

const DefaultLayout = ({ children }: DefaultLayout) => {
  /**
   * Component styles
   */
  const { classes } = useStyles()

  /**
   * Use mantine theme and color scheme
   */
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  /**
   * Icon for toggle dark mode button
   */
  const themeIcon =
    colorScheme === 'dark' ? <BsSunFill size="18" /> : <BsMoonFill size="18" />

  return (
    <AppShell
      classNames={{
        main: classes.main,
      }}
      navbarOffsetBreakpoint="xl"
      fixed
      header={
        <Header
          height={70}
          p="md"
        >
          <div className={classes.header}>
            <Link href="/">
              <Text>Redux Form</Text>
            </Link>

            <div className={classes.spacer}></div>

            <div className={classes.actionGroup}>
              <ActionButton
                tooltip="Source Code"
                link="https://github.com/hasan-almujtaba/redux-form"
                target="_blank"
              >
                {<BsGithub size="18" />}
              </ActionButton>

              <ActionButton
                tooltip="Toggle dark mode"
                onClick={() => toggleColorScheme()}
              >
                {themeIcon}
              </ActionButton>
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default DefaultLayout
