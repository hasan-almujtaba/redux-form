import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    [theme.fn.largerThan('md')]: {
      width: '800px',
    },
    margin: '0 auto',
  },

  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 800,
    color: theme.colors.blue,
    marginBottom: theme.spacing.sm,
  },

  formGroup: {
    marginBottom: theme.spacing.xl,
  },

  addNewWrapper: {
    textAlign: 'right',
  },

  addNew: {
    marginTop: theme.spacing.sm,
  },

  submit: {
    marginTop: theme.spacing.lg,
  },
}))

export default useStyles
