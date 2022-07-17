import { Button, Divider, Grid, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm, formList } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import {
  useStoreEducationMutation,
  useStoreExperienceMutation,
  useStoreUserMutation,
} from 'store/slices/api/apiSlice'
import useStyles from './MainForm.styles'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'

const MainForm = () => {
  /**
   * Component styles
   */
  const { classes } = useStyles()

  const [loading, setLoading] = useState(false)

  /**
   * RTK Query Mutation
   */
  const [storeUser] = useStoreUserMutation()
  const [storeEducation] = useStoreEducationMutation()
  const [storeExperience] = useStoreExperienceMutation()

  /**
   * Form handling
   */
  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      educations: formList([
        {
          school: '',
          major: '',
          startDate: '',
          endDate: '',
          key: randomId(),
        },
      ]),
      experiences: formList([
        {
          company: '',
          title: '',
          startDate: '',
          endDate: '',
          key: randomId(),
        },
      ]),
    },
  })

  /**
   * Add dynamic form data
   * @param {string} fieldName - form field name
   */
  const onAddButtonClick = (fieldName: 'educations' | 'experiences') => {
    let initialData

    if (fieldName === 'educations') {
      initialData = {
        school: '',
        major: '',
        startDate: '',
        endDate: '',
        key: randomId(),
      }
    } else {
      initialData = {
        company: '',
        title: '',
        startDate: '',
        endDate: '',
        key: randomId(),
      }
    }

    form.addListItem(fieldName, initialData)
  }

  /**
   * Remove dynamic form data
   */
  const onRemoveButtonClick = (
    fieldName: 'educations' | 'experiences',
    key: number
  ) => {
    form.removeListItem(fieldName, key)
  }

  /**
   * Handle form submit
   */
  const onFormSubmit = async (values: typeof form.values) => {
    setLoading(true)
    const user = {
      fullname: values.fullName,
      email: values.email,
      phone: values.phone,
    }
    const userResponse = await storeUser(user).unwrap()

    if (userResponse) {
      const educations = values.educations.map((education) => ({
        school: education.school,
        major: education.major,
        start_date: education.startDate,
        end_date: education.endDate,
        user_id: userResponse.id as number,
      }))
      await storeEducation(educations).unwrap()

      const experiences = values.experiences.map((experience) => ({
        company: experience.company,
        title: experience.title,
        start_date: experience.startDate,
        end_date: experience.endDate,
        user_id: userResponse.id as number,
      }))
      await storeExperience(experiences).unwrap()
    }

    setLoading(false)
    form.reset()
    showNotification({
      title: 'Success',
      message: 'Data submitted',
    })
  }

  /**
   * Dynamic education form
   */
  const educationForm = form.values.educations.map((item, index) => (
    <Grid key={index}>
      <Grid.Col span={6}>
        <TextInput
          label="School"
          {...form.getListInputProps('educations', index, 'school')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Major"
          {...form.getListInputProps('educations', index, 'major')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <DatePicker
          label="Start Date"
          {...form.getListInputProps('educations', index, 'startDate')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <DatePicker
          label="End Date"
          {...form.getListInputProps('educations', index, 'endDate')}
        />
      </Grid.Col>
      <Grid.Col span={12}>
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

  /**
   * Dynamic experience form
   */
  const experienceForm = form.values.educations.map((item, index) => (
    <Grid key={index}>
      <Grid.Col span={6}>
        <TextInput
          label="Company"
          {...form.getListInputProps('experiences', index, 'company')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Title"
          {...form.getListInputProps('experiences', index, 'title')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <DatePicker
          label="Start Date"
          {...form.getListInputProps('experiences', index, 'startDate')}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <DatePicker
          label="End Date"
          {...form.getListInputProps('experiences', index, 'endDate')}
        />
      </Grid.Col>
      <Grid.Col span={12}>
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

  return (
    <form
      className={classes.container}
      onSubmit={form.onSubmit(onFormSubmit)}
    >
      <div>
        <div className={classes.title}>Basic Information</div>
        <div className={classes.formGroup}>
          <TextInput
            label="Full Name"
            {...form.getInputProps('fullName')}
          />
          <TextInput
            label="Email"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Phone"
            {...form.getInputProps('phone')}
          />
        </div>
      </div>

      <div>
        <div className={classes.title}>Education</div>

        <div className={classes.formGroup}>
          {educationForm}
          <div className={classes.addNewWrapper}>
            <Button
              onClick={() => onAddButtonClick('educations')}
              color="teal"
              className={classes.addNew}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className={classes.title}>Experience</div>

        <div className={classes.formGroup}>
          {experienceForm}
          <div className={classes.addNewWrapper}>
            <Button
              onClick={() => onAddButtonClick('experiences')}
              color="teal"
              className={classes.addNew}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        color="blue"
        fullWidth
        className={classes.submit}
        loading={loading}
      >
        Submit
      </Button>
    </form>
  )
}

export default MainForm
