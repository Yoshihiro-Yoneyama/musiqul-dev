import {AriaTextFieldProps} from "react-aria"
import {FC} from "react"
import {Label, TextArea, TextField as AriaTextField} from 'react-aria-components'
import * as styles from './TextField.css'
import Box from "@/shared/ui/atoms/box/Box";
import TextBox from "@/shared/ui/atoms/textbox/TextBox";
import namedMemo from "@/shared/hooks/namedMemo";

type Props = {
  readonly label?: string
  readonly description?: string
  readonly orientation?: 'horizontal' | 'vertical'
  readonly unit?: string
  readonly placeHolder?: string
  readonly isMultiLine?: boolean
  readonly autoComplete?: string
} & AriaTextFieldProps

const TextField: FC<Props> = ({
  label,
  description,
  orientation = 'vertical',
  unit,
  placeHolder,
  isMultiLine,
  autoComplete,
  ...props
}) => {
  return (
    <AriaTextField
      className={styles.container}
      validationBehavior='aria'
      {...props}
    >
      <div className={styles.orientation[orientation]}>
        {label && <Label className={styles.label}>{label}</Label>}
        <Box display="flex">
          {isMultiLine ? (
            <TextArea
              placeholder={placeHolder}
              rows={10}
              style={styles.textArea}
            />
            // ): (
            // <>
            //   {props.type === 'password' ? (
            //     <PasswordInput>
            //     </PasswordInput>
            //   )}
            // </>
          ): (
            <>
              <TextBox
                placeholder={placeHolder}
                autoComplete={autoComplete}
              />
              {unit && <span>{unit}</span>}
            </>
          )}
        </Box>
      </div>
    </AriaTextField>
  );
}

export default namedMemo(TextField, 'TextField')
