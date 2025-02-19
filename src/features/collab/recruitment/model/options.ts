export type SelectorOption = {
  value: string;
  label: string;
}

export const requiredNumberOfInstrumentOptions: SelectorOption[] = [
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

export const recruitedInstrumentOptions: SelectorOption[] = [
  {value: 'VOCAL', label: 'ボーカル'},
  {value: 'GUITAR', label: 'ギター'},
  {value: 'ELECTRIC_BASE', label: 'エレキベース'},
];

export type CheckboxOption = {
  value: string;
  label: string;
};

export const requiredGenderOptions: SelectorOption[] = [
  {value: 'MALE_ONLY', label: '男性'},
  {value: 'FEMALE_ONLY', label: '女性'},
  {value: 'OTHER', label: 'その他'},
];

export const genreOptions: CheckboxOption[] = [
  {value: 'ROCK', label: 'ロック'},
  {value: 'JAZZ', label: 'ジャズ'},
  {value: 'J_POP', label: 'Jポップ'},
];

export const requiredGenerationOptions: CheckboxOption[] = [
  {value: 'TEEN', label: '10代'},
  {value: 'TWENTIES', label: '20代'},
  {value: 'THIRTIES', label: '30代'},
  {value: 'FORTIES', label: '40代'},
  {value: 'FIFTIES', label: '50代'},
  {value: 'MORE_THAN_SIXTIES', label: '60代以上'},
]