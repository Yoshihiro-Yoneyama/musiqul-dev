import {styleVariants} from "@vanilla-extract/css";
import spaces from "@/shared/themes/spaces";

export const mt = styleVariants(spaces, (space) => [
  {marginTop: space},
])
export const mr = styleVariants(spaces, (space) => [
  {marginRight: space},
])
export const mb = styleVariants(spaces, (space) => [
  {marginBottom: space},
])
export const ml = styleVariants(spaces, (space) => [
  {marginLeft: space},
])

export const pt = styleVariants(spaces, (space) => [
  {paddingTop: space},
])
export const pr = styleVariants(spaces, (space) => [
  {paddingRight: space},
])
export const pb = styleVariants(spaces, (space) => [
  {paddingBottom: space},
])
export const pl = styleVariants(spaces, (space) => [
  {paddingLeft: space},
])