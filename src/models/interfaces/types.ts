export type LoginArgs = {
  email: string
  password: string
}

export type FilterArgs = {
  searchField: string
  sortField: FilterSelector
}

export enum FilterSelector {
  UNDEFINED = '',
  DATE_ASC = 'DATE_ASC',
  DATE_DESC = 'DATE_DESC',
  WEIGHT_ASC = 'WEIGHT_ASC',
  WEIGHT_DESC = 'WEIGHT_DESC',
}

export const emptyFilter: FilterArgs = {
  searchField: '',
  sortField: FilterSelector.UNDEFINED,
}

export type BaseVariants = 'primary' | 'secondary'
