/**
 * Wraps a number around min and max values, similar to modulo but always keeps the output between the specified range
 * @param min The minimum value in the range
 * @param max The maximum value in the range
 * @param v The value to wrap
 * @returns The wrapped value between min and max
 */
export function wrap(min: number, max: number, v: number): number {
    const rangeSize = max - min;

    // Ensure positive range size
    if (rangeSize === 0) return min;

    // Return the value wrapped between min and max
    const remainder = (v - min) % rangeSize;
    return remainder < 0 ? max + remainder : min + remainder;
}
