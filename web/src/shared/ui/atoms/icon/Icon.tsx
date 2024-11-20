import {faCreditCard} from '@fortawesome/free-regular-svg-icons'
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowUpRightFromSquare,
  faCartShopping,
  faCheck,
  faCircleCheck,
  faCircleInfo,
  faCircleUser,
  faDownload,
  faEye,
  faHome,
  faList,
  faMinus,
  faPhone,
  faPlus,
  faQrcode,
  faSchoolFlag, faSquare,
  faTriangleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import type {FC} from 'react'
import namedMemo from "@/shared/hooks/namedMemo";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons/faSquareCheck";

// @note 将来的に 一つのアイコンの種類で solid と regular どちらも利用する事になった際は style プロパティなどの追加が必要
export const IconTypes = {
  arrowDown: faAngleDown,
  arrowLeft: faAngleLeft,
  arrowRight: faAngleRight,
  arrowUp: faAngleUp,
  externalLink: faArrowUpRightFromSquare,
  cart: faCartShopping,
  check: faCheck,
  circleCheck: faCircleCheck,
  circleInfo: faCircleInfo,
  circleUser: faCircleUser,
  creditCard: faCreditCard,
  download: faDownload,
  eye: faEye,
  home: faHome,
  list: faList,
  minus: faMinus,
  phone: faPhone,
  plus: faPlus,
  qrcode: faQrcode,
  schoolFlag: faSchoolFlag,
  squareCheck: faSquareCheck,
  square: faSquare,
  triableExclamation: faTriangleExclamation,
  xmark: faXmark,
}

type Props = {
  /** IconTypes の key を指定する */
  readonly type: keyof typeof IconTypes
  readonly color?: string
  // readonly size?: Theme['fontSize']
  // readonly className?: string
  // readonly bgCircleColor?: Theme['color']
}

const Icon: FC<Props> = ({
  type,
  color = '#FFF000',
  // size = 'm',
  // className,
  // bgCircleColor,
}) => {
  const icon = IconTypes[type]
  // if (bgCircleColor) {
  return (
    <span
      // className={clsx(bgCircle)}
      // style={{ backgroundColor: theme.color[bgCircleColor] }}
    >
      <FontAwesomeIcon
        icon={icon}
        color={color}
        // className={clsx(container, sizes[size], className)}
      />
    </span>
  )
  // }
  
  // return (
  //   <FontAwesomeIcon
  //     icon={icon}
  //     color={theme.color[color]}
  //     className={clsx(container, sizes[size], className)}
  //   />
  // )
}

export default namedMemo(Icon, 'Icon')