import { truncate } from './truncate';

describe('truncate', () => {
  it('truncates a string > amount of chars', () => {
    const str = 'a'.repeat(51);
    expect(truncate(str, 50)).toEqual('a'.repeat(50) + '...');
  });

  it('does not truncate a string < amount of chars', () => {
    const str = 'a'.repeat(50);
    expect(truncate(str, 50)).toBe(str);
  });
});
