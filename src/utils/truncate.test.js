import { truncate } from './truncate';

describe('truncate', () => {
  it('truncates a string > 50 chars', () => {
    const str = 'a'.repeat(51);
    expect(truncate(str)).toEqual('a'.repeat(50) + '...');
  });

  it('does not truncate a string < 50 chars', () => {
    const str = 'a'.repeat(50);
    expect(truncate(str)).toBe(str);
  });
});
