import { repeat } from '../src/loop'

test('repeat of the char', () => {
    const repeated = repeat('a');
    const expected = 'aaaaa';

    expect(repeated).toBe(expected);
})