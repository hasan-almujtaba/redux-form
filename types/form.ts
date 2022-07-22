import { FormList } from '@mantine/form'
import { UseFormReturnType } from '@mantine/form/lib/use-form'

export type fieldGroup = 'educations' | 'experiences'

export interface DynamicFormProps {
  form: UseFormReturnType<{
    fullName: string
    email: string
    phone: string
    educations: FormList<{
      school: string
      major: string
      startDate: string
      endDate: string
      key: string
    }>
    experiences: FormList<{
      company: string
      title: string
      startDate: string
      endDate: string
      key: string
    }>
  }>
  onRemoveButtonClick: (fieldGroup: fieldGroup, key: number) => void
  onAddButtonClick: (fieldGroup: fieldGroup) => void
  groupType: fieldGroup
}
