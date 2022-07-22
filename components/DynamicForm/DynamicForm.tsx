import { Button, Divider, Grid, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { DynamicFormProps } from '@/types/form'
import useStyles from './DynamicForm.styles'

const DynamicForm = ({
  form,
  onAddButtonClick,
  onRemoveButtonClick,
  groupType,
}: DynamicFormProps) => {
  const { classes } = useStyles()

  const educationForm = form.values.educations.map((item, index) => (
    <Grid key={index}>
      <Grid.Col
        sm={12}
        lg={6}
      >
        <TextInput
          label="School"
          {...form.getListInputProps('educations', index, 'school')}
          required
        />
      </Grid.Col>
      <Grid.Col
        sm={12}
        lg={6}
      >
        <TextInput
          label="Major"
          {...form.getListInputProps('educations', index, 'major')}
          required
        />
      </Grid.Col>
      <Grid.Col
        sm={12}
        lg={6}
      >
        <DatePicker
          label="Start Date"
          {...form.getListInputProps('educations', index, 'startDate')}
          required
        />
      </Grid.Col>
      <Grid.Col
        sm={12}
        lg={6}
      >
        <DatePicker
          label="End Date"
          {...form.getListInputProps('educations', index, 'endDate')}
          required
        />
      </Grid.Col>
      <Grid.Col
        sm={12}
        lg={12}
      >
        {form.values.educations.length > 1 && (
          <Button
            color="red"
            onClick={() => onRemoveButtonClick('educations', index)}
          >
            Remove
          </Button>
        )}
        <Divider my="xs" />
      </Grid.Col>
    </Grid>
  ))

  const experienceForm = form.values.experiences.map((item, index) => (
    <Grid key={index}>
      <Grid.Col
        sm={12}
        lg={6}
      >
        <TextInput
          label="Company"
          {...form.getListInputProps('experiences', index, 'company')}
          required
        />
      </Grid.Col>
      <Grid.Col
        sm={12}
        lg={6}
      >
        <TextInput
          label="Title"
          {...form.getListInputProps('experiences', index, 'title')}
          required
        />
      </Grid.Col>
      <Grid.Col
        sm={12}
        lg={6}
      >
        <DatePicker
          label="Start Date"
          {...form.getListInputProps('experiences', index, 'startDate')}
          required
        />
      </Grid.Col>
      <Grid.Col
        sm={12}
        lg={6}
      >
        <DatePicker
          label="End Date"
          {...form.getListInputProps('experiences', index, 'endDate')}
          required
        />
      </Grid.Col>
      <Grid.Col
        sm={12}
        lg={12}
      >
        {form.values.experiences.length > 1 && (
          <Button
            color="red"
            onClick={() => onRemoveButtonClick('experiences', index)}
          >
            Remove
          </Button>
        )}
        <Divider my="xs" />
      </Grid.Col>
    </Grid>
  ))

  return (
    <div>
      <div className={classes.title}>
        {groupType === 'educations' ? 'Education' : 'Experience'}
      </div>

      <div className={classes.formGroup}>
        {groupType === 'educations' ? educationForm : experienceForm}
        <div className={classes.addNewWrapper}>
          <Button
            onClick={() => onAddButtonClick(groupType)}
            color="teal"
            className={classes.addNew}
          >
            Add New
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DynamicForm
