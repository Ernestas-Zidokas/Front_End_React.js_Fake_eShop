import toggleArrayItem from './toggleArrayItem';

describe('toggleArrayItem', () => {
  it('adds item at the end of array when item is not present in array', () => {
    const result = toggleArrayItem(['a', 'b', 'c'], 'd');
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  it('removes item from array when item is present in array', () => {
    const result = toggleArrayItem(['a', 'b', 'c'], 'b');
    expect(result).toEqual(['a', 'c']);
  });
});
