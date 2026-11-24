import {styleVariants} from '@vanilla-extract/css';
import {space} from '@/shared/themes/space.css';

export const mt = styleVariants(space, (space) => [
  {marginTop: space},
])
export const mr = styleVariants(space, (space) => [
  {marginRight: space},
])
export const mb = styleVariants(space, (space) => [
  {marginBottom: space},
])
export const ml = styleVariants(space, (space) => [
  {marginLeft: space},
])

export const pt = styleVariants(space, (space) => [
  {paddingTop: space},
])
export const pr = styleVariants(space, (space) => [
  {paddingRight: space},
])
export const pb = styleVariants(space, (space) => [
  {paddingBottom: space},
])
export const pl = styleVariants(space, (space) => [
  {paddingLeft: space},
])