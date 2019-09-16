import React, { useState } from 'react';
import styled from 'styled-components';

const StyledPart = styled('div')`
  background-image: url('https://picsum.photos/300/300');
  width: 100px;
  height: 100px;

  ${({ i }) => {
    const first = i % 3;
    let second = 0;
    if (i > 2) {
      second = parseInt((i / 3).toString(), 10);
    }
    return `background-position: ${first * 50}% ${second * 50}%;`;
  }}
`;

const StyledNullPart = styled('div')`
  width: 100px;
  height: 100px;
`;

const StyledWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0;
  width: 300px;
`;

const Whole = styled(StyledPart)`
  width: 300px;
  height: 300px;
`;

const Wrapper = ({ items, partClick }) => {
  return (
    <StyledWrapper>
      {items.map((item, index) => {
        return (
          (item && <StyledPart key={item} onClick={() => partClick(index)} i={item - 1} />) || (
            <StyledNullPart />
          )
        );
      })}
    </StyledWrapper>
  );
};

const Game = () => {
  const [items, setItems] = useState(
    [1, 2, 3, 4, 5, 6, 7, null, 8].sort(() => 0.5 - Math.random()),
  );
  const [isWin, setWin] = useState(false);

  const testIsWin = newItems => {
    const checkWin = newItems.every((element, index, array) => {
      return element === null || element < array[index + 1] || array[index + 1] === null;
    });
    setWin(checkWin);
  };

  const swap = index => {
    const nullIndex = items.findIndex(item => !item);
    const newItems = items.map(item => item);
    const temp = newItems[nullIndex];
    newItems[nullIndex] = newItems[index];
    newItems[index] = temp;
    setItems(newItems);
    testIsWin(newItems);
  };

  const partClick = index => {
    const width = Math.sqrt(items.length);
    if (
      (index % width !== 0 && (!items[index - 1] && index)) ||
      (index % width < width - 1 && (!items[index + 1] && index + 1 < items.length))
    ) {
      swap(index);
    }

    if (
      (index - width > -1 && !items[index - width]) ||
      (index + width < items.length && !items[index + width])
    ) {
      swap(index);
    }
  };
  return (
    <div>
      {isWin || <Wrapper items={items} partClick={partClick} />}
      {isWin && 'GRATULACJE'}
      <Whole />
    </div>
  );
};

export default Game;
