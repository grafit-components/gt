export function getPrecision(a: number) {
  if (!isFinite(a)) {
    return 0;
  }
  let e = 1;
  let p = 0;
  while (Math.round(a * e) / e !== a) {
    e *= 10;
    p++;
  }
  return p;
}

export function formatNumber(value: any,
                             decimalLength: number,
                             chunkDelimiter: string,
                             decimalDelimiter: string,
                             chunkLength: number) {
  const precision = Math.min(getPrecision(value), Math.floor(decimalLength));
  const result = '\\d(?=(\\d{' + chunkLength + '})+' + (precision > 0 ? '\\D' : '$') + ')';
  const num = value.toFixed(precision);
  return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num)
    .replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
}

export function prependZero(input: number, length: number) {
  return ('0'.repeat(length) + input).slice(-length);
}
