import {space} from '@/shared/themes/space.css'

type SpacingValues = '0' | keyof typeof space
type SpacingValueType = {
  all?: SpacingValues
  x?: SpacingValues
  y?: SpacingValues
  top?: SpacingValues
  right?: SpacingValues
  bottom?: SpacingValues
  left?: SpacingValues
}

const optimizeSpacingValue = ({
  all,
  x,
  y,
  top,
  right,
  bottom,
  left
}: SpacingValueType): Record<
  'top' | 'right' | 'bottom' | 'left',
  SpacingValues
> => {
  return {
    top: top ?? y ?? all ?? '0',
    right: right ?? x ?? all ?? '0',
    bottom: bottom ?? y ?? all ?? '0',
    left: left ?? x ?? all ?? '0'
  }
}

export default optimizeSpacingValue