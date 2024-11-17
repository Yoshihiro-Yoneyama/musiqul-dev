export type SelectorOption = {
  value: string;
  label: string;
}

export const requiredNumberOfInstruments: SelectorOption[] = [
  {value: '0', label: '0'},
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '6', label: '6'},
  {value: '7', label: '7'},
  {value: '8', label: '8'},
  {value: '9', label: '9'},
  {value: '10', label: '10'},
]

export const recruitedInstruments: SelectorOption[] = [
  {value: '', label: ''},
  {value: 'VOCAL', label: 'ボーカル'},
  {value: 'GITTER', label: 'ギター'},
  {value: 'ELECTRIC_BASE', label: 'エレキベース'},
];

export const requiredGenders: SelectorOption[] = [
  {value: 'MALE_ONLY', label: '男性'},
  {value: 'MALE_ONLY', label: '女性'},
  {value: 'ALL', label: '不問'},
];

export type CheckboxOption = {
  value: string;
  label: string;
};

export const genres: CheckboxOption[] = [
  {value: '', label: ''},
  {value: 'ROCK', label: 'ロック'},
  {value: 'JAZZ', label: 'ジャズ'},
  {value: 'POP', label: 'ポップ'},
];

export const requiredGenerationOptions: CheckboxOption[] = [
  {value: 'TEEN', label: '10代'},
  {value: 'TWENTIES', label: '20代'},
  {value: 'THIRTIES', label: '30代'},
  {value: 'FORTIES', label: '40代'},
  {value: 'FIFTIES', label: '50代'},
  {value: 'MORE_THAN_SIXTIES', label: '60代以上'},
]