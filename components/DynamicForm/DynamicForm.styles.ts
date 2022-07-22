import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
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
}))

export default useStyles
