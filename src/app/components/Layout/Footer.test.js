import React from 'react';
import Footer from './Footer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { advanceTo } from 'jest-date-mock';

beforeAll(() => {
  advanceTo(new Date('2020-01-01'));

  global.fetch = jest.fn();
});

describe('UI Footer', () => {
  it('has text "© Copyright by React Students | 2020"', () => {
    const { getByText } = render(<Footer></Footer>);
    expect(getByText('© Copyright by React Students | 2020')).toBeInTheDocument();
  });
});
