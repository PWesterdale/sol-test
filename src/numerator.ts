function createOfLength(length: number, value: string): string {
  return new Array(length).fill(value).join('');
}

function numeraliseAmount(
  amount: number,
  individual: string,
  half?: string,
  parent?: string
) {
  // Use a basic approach for this, deal with special cases first
  if (amount === 5) {
    return half;
  }
  if (amount === 9) {
    return `${individual}${parent}`;
  }
  if (amount === 4) {
    return `${individual}${half}`;
  }
  // This is now just a case of building up the remaining strings
  return amount > 5
    ? `${half}${createOfLength(amount - 5, individual)}`
    : `${createOfLength(amount, individual)}`;
}

const decimalPlaces = [
  { individual: 'I', half: 'V', value: 1 }, // units
  { individual: 'X', half: 'L', value: 10 }, // tens
  { individual: 'C', half: 'D', value: 100 }, // hundreds
  { individual: 'M', value: 1000 }, // thousands
];

function findNumeric(
  value: number,
  numerals: string
): { value: number; numerals: string } {
  // Get the current number length to allow us to figure out what decimal place we are working on
  const valueArray = value.toString().split('');
  // Get both the current decimal place and the parent, so we have the numerals we need
  const decimalPlace = decimalPlaces[valueArray.length - 1];
  const decimalParent = decimalPlaces[valueArray.length];

  // set the normalised amount for the decimal place, I.E 4 but tens would account for 40.
  const amount = Number(valueArray.splice(0, 1));

  // use our numeralise function
  numerals += numeraliseAmount(
    amount,
    decimalPlace.individual,
    decimalPlace.half,
    decimalParent?.individual
  );

  value = value - amount * decimalPlace.value;
  return { value, numerals };
}

export function numerate(value: number): string {
  if (value > 3999) {
    throw new Error('Value entered must be less than 3999');
  }
  let numerals = '';
  do {
    const result = findNumeric(value, numerals);
    value = result.value;
    numerals = result.numerals;
  } while (value > 0);
  return numerals;
}
