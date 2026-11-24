import { Fieldset } from "../fieldset";
import * as styles from "./CheckboxGroup.css";

export type CheckboxOption<V extends string> = { value: V; label: string };

type CheckboxGroupProps<V extends string> = {
  /** フォーム送信時の name。選択した値は FormData.getAll(name) で取り出す */
  name: string;
  legend: string;
  options: readonly CheckboxOption<V>[];
  defaultValues?: readonly V[];
  required?: boolean;
  hint?: string;
  error?: string;
};

/** 複数選択のチェックボックス */
export function CheckboxGroup<V extends string>({
  name,
  options,
  defaultValues = [],
  ...fieldset
}: CheckboxGroupProps<V>) {
  return (
    <Fieldset {...fieldset}>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              defaultChecked={defaultValues.includes(option.value)}
              className={styles.checkbox}
            />
            {option.label}
          </label>
        ))}
      </div>
    </Fieldset>
  );
}
