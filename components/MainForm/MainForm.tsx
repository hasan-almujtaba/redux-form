import { Button, TextInput } from '@mantine/core'
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
import DynamicForm from '../DynamicForm/DynamicForm'

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

    try {
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
        await storeEducation(educations)

        const experiences = values.experiences.map((experience) => ({
          company: experience.company,
          title: experience.title,
          start_date: experience.startDate,
          end_date: experience.endDate,
          user_id: userResponse.id as number,
        }))
        await storeExperience(experiences).unwrap()

        setLoading(false)
        form.reset()
        showNotification({
          title: 'Success',
          message: 'Data submitted',
        })
      }
    } catch (error) {
      setLoading(false)
      showNotification({
        title: 'Failed',
        message: 'something wrong happened please try again later',
      })
    }
  }

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
            required
          />
          <TextInput
            label="Email"
            {...form.getInputProps('email')}
            required
          />
          <TextInput
            label="Phone"
            {...form.getInputProps('phone')}
            required
          />
        </div>
      </div>

      <DynamicForm
        form={form}
        onRemoveButtonClick={onRemoveButtonClick}
        onAddButtonClick={onAddButtonClick}
        groupType="educations"
      />

      <DynamicForm
        form={form}
        onRemoveButtonClick={onRemoveButtonClick}
        onAddButtonClick={onAddButtonClick}
        groupType="experiences"
      />

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
