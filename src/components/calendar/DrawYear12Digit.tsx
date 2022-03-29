import React from 'react';
import styled from 'styled-components';

const yearTemplate: number[] = [0,3,3,6,1,4,6,2,5,0,3,5]
const leapTemplate: number[] = [0,3,4,0,2,5,0,3,6,1,4,6]

const isLeap = (year: number) => {
  let result: boolean = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  return result;
}

const calcJan = (year: number): number => {
  let yearOffset: number = year % 400;
  let centuryYears: number = Math.floor(yearOffset / 100);

  // Need century years, to subtract non-leap years. If the requested year is itself such a year, don't include it.
  // Why? (I'll get back to you on that.)
  if (year % 400 > 0 && year % 100 === 0) centuryYears--;
  let leapYears: number = Math.ceil(yearOffset / 4) - centuryYears;

  // Gregorian calendar.
  // 6 is the magic number. It just happens that 6 is the number for January in a % 400 === 0 year.
  let jan: number = 6 + yearOffset + leapYears;

  // Make sure 0 <= jan < 7.
  jan = jan % 7;

  return jan;
}

const calc12DigitYear = (year: number) => {
  let jan: number = calcJan(year);
  let yearDigits: number[] = [];
  let template: number[] = isLeap(year) ? leapTemplate : yearTemplate;
  yearDigits = template.map((d: number) => (d+jan)%7);
  return yearDigits;
}   

/**
 * styled components
 */
const Year = styled.div`
  position: relative;
  margin: 1px;
  margin-bottom: 3px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
 
  > div {
    cursor: pointer;
    font-size: .6rem;
    text-align: center;
  }

  .year-label {
    grid-column: 1/4;
    font-weight: bold;
    color: #6C84AA;
  }
`;

const Friday13thWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  grid-column: 1/4;
  grid-row: 2/6;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Friday13th = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  font-size: .7rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.circleBg};
  color: ${({ theme }) => theme.circleColor};
`;

/**
 * DrawYear12Digit: The star of the show.
 */
interface IProps {
  year: string;
  handleYearClick: React.MouseEventHandler;
}

const DrawYear12Digit = (props: IProps) => {
  const { handleYearClick } = props;
  let year: number =  parseInt(props.year, 10);
  let digits: number[] = calc12DigitYear(year);
  let isLeap: boolean = digits[1] !== digits[2];
  let janDigit: number = digits[0];
  let friday13Count: number = digits.filter((d: number) => d === 0).length;

  return (
  <>
    <Year className="year-block" data-year={year} data-leap={isLeap} data-jan={janDigit} onClick={handleYearClick}>
      <Friday13thWrapper className="fridays-13th-count"><Friday13th>{friday13Count}</Friday13th></Friday13thWrapper>
        <div className="year-label" >{year}</div>
        { digits.map((d, key) => <div key={key} className={d===0?'friday-13th':''}>{d}</div>) }
    </Year>
  </>
  );
}
export default DrawYear12Digit;