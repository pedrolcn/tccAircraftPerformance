/**
 * Generates an array of numbers from start up to but not including stop with a difference of step
 * between neighboring numbers
 * @param start The starting number of the array
 * @param stop The ending number of the array
 * @param step The difference between neighboring numbers
 */
export const range = function (start: number, stop: number, step = 1): number[] {
  const sign = Math.sign(stop - start);

  return Array(Math.ceil(Math.abs(stop - start) / step))
    .fill(start)
    .map((val, idx) => val + sign * idx * step);
};

/**
 * Generates an array of numbers from start up to and including stop with a difference of step
 * between neighboring numbers
 * @param start The starting number of the array
 * @param stop The ending number of the array
 * @param step The difference between neighboring numbers
 */
export const rangeInclusive = function (start: number, stop: number, step = 1) {
  const sign = Math.sign(stop - start);
  const rg = range(start, stop + sign * step, step);

  // truncate at stop
  rg[rg.length - 1] = stop;
  return rg;
};

export const chunk = function (arr: any[], size: number) {
  const out = [];
  
  for (let i = 0; i <= arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}