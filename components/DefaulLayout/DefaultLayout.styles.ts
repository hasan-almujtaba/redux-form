import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  spacer: {
    flexGrow: 1,
  },

  actionGroup: {
    display: 'flex',
    columnGap: '10px',
  },
}))

export default useStyles
