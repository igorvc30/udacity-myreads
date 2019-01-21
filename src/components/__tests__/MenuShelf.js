import React from 'react';
import MenuShelf from './MenuShelf.js';
import { render, Simulate, wait } from 'react-testing-library'


test('<MenuShelf />', () => {
  it('It has 4 dropdown options', () => {
    const {getByText, getByTestId, container} = render(<MenuShelf />);
    const elem = getByTestId('item');
    expect(elem.innerHTML).toBe('todo1');
  })

});