import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import DrawYear12Digit from './DrawYear12Digit';
import { generateMonthData } from './calendar-helper';
import { MonthData, YearObj } from './calendar-helper';

const YearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 35px);

  .fridays-13th-count {
    opacity: 0;
    transition-duration: 1s;
  }

  &.show-friday-13th-count {
    .fridays-13th-count {
      opacity: 1;
    }
  }

  &.show-friday-13th {
    .friday-13th {
      color: red;
    }
  }

  .current-year {
    background-color: ${({ theme }) => theme.calendarCurrentBg};
  }
  .matching-year {
    background-color: #ccc;
  }
  .mostly-matching-year {
    background-color: #eee;
  }
`;

function Calendar() {
  const [ yearBlocks, setYearBlocks ] = useState([]);
  const [ showFriday13thCount, setShowFriday13thCount ] = useState(false);
  const [ showFriday13th, setShowFriday13th ] = useState(false);
  const [ monthData, setMonthData ] = useState<any>(null);
  const [ showYearMenu, setShowYearMenu ] = useState(false);
  const [ yearObj, setYearObj ] = useState<YearObj>({ year:0, janDigit:0, isLeap: false });
  const [ yearRect, setYearRect ] = useState();
  const [ lastYearClicked, setLastYearClicked ] = useState();

  const yearGridRef = useRef<HTMLDivElement>();
  const calendarLayoutRef: any = React.createRef();

  useEffect(() => {
      const els: any = Array.from(document.querySelectorAll('.year-block'));

      setYearBlocks(els);

      const today = new Date();
      const currentYear = ''+today.getFullYear();
      let currentYearEl: any;
      els.forEach((el: any) => {
        if (el.dataset.year === currentYear) {
          currentYearEl = el;
          el.classList.add('current-year');
          }
      });
      currentYearEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);


  /*
    Process menu that pops up for selected year.
    Options are:
      Calendar: Display conventional calendar for year.
      Matching: Highlight years that match, or mostly match, selected year.
  */
  const handleYearMenu = (e: any) => {
      let el = e.currentTarget;
console.log(el.dataset);
      let opt = el.dataset.opt;
      let { year, janDigit, isLeap } = yearObj;
      switch (opt) {
        case 'calendar':
            var data = generateMonthData({ year, janDigit, isLeap });
            if (calendarLayoutRef.current) calendarLayoutRef.current.style.display = 'block';
            console.log('handleYearClick', data[0]);
            setMonthData(data);
            break;
        case 'matching':
            // Highlight exactly matching years.
            var matchingYearBlocks = yearBlocks.filter((yb: HTMLElement) => {
              let jan = yb.dataset.jan ? parseInt(yb.dataset.jan, 10) : 0;
              let leap = !!yb.dataset.leap;
              let result: boolean = jan === janDigit && leap === isLeap;
              return result;
            });
            matchingYearBlocks.forEach((yb: HTMLElement) => {
              yb.classList.add('matching-year');
            });

            // Highlight mostly matching years.
            // The "leap" value is passed as a string, not a boolean.
            var notLeapVal = el.dataset.leap === 'true' ? 'false' : 'true';
            // To explain the setting for janVal:
            // If the selected year is a leap year, mostly matching years will be non-leap years, with
            // the number for January one greater than the number for January of the selected year.
            // Example: selected 401 means mostly matching 511.
            // Likewise, if the selected year is a non-leap year, mostly matching years will be leap years,
            // with January one less than the January for the selected year.
            var janVal = (el.dataset.leap === 'true' ? 1*janDigit + 1 : 1*janDigit + 6) % 7;

            // Note yb.dataset.jan == janVal. Using == instead of === because dataset.jan is a string, janVal is a number.
            var mostlyMatchingYearBlocks = yearBlocks.filter((yb: HTMLElement) => {
              let jan = yb.dataset.jan ? parseInt(yb.dataset.jan, 10) : 0;
              let leap = yb.dataset.leap;
              return jan === janVal && leap === notLeapVal;
            });
            mostlyMatchingYearBlocks.forEach((yb: HTMLElement) => yb.classList.add('mostly-matching-year'));
            break;
    }
    setShowYearMenu(false);
}

    /*
      When you click on a year, highlight the years whose configurations exactly match.
      Also, highlight years whose configurations mostly match (March - December).
    */
      const handleYearClick = (e: React.MouseEvent<HTMLElement>) => {
        // First, housekeeping: clear previous matching years.
        yearBlocks.forEach((yb: HTMLElement) => yb.classList.remove('matching-year'));
        yearBlocks.forEach((yb: HTMLElement) => yb.classList.remove('mostly-matching-year'));

        // Get info from clicked year.
        e.preventDefault();
        var el = e.currentTarget;

        var year = el.dataset.year ? parseInt(el.dataset.year, 10) : 0;
        var matchJan = el.dataset.jan ? parseInt(el.dataset.jan, 10) : 0;
        var matchIsLeap = !!el.dataset.leap;
        console.log('handleYearClick', year, typeof year, matchJan, typeof matchJan, matchIsLeap, typeof matchIsLeap);
        /*
        setYearObj({ year, matchJan, matchIsLeap });
        var data = generateMonthData({ year, janDigit: matchJan, isLeap: matchIsLeap });
        var yearElData = el.getBoundingClientRect();
        setYearRect(yearElData);
        if (lastYearClicked === year) {
            setShowYearMenu(!showYearMenu);
        } else {
            setShowYearMenu(true);
        }
        setLastYearClicked(year);
        */
    }

    const toggleFriday13thCount = () => {
      if (yearGridRef.current) {
        if (showFriday13thCount) {
          yearGridRef.current.classList.remove('show-friday-13th-count');
        } else {
            yearGridRef.current.classList.add('show-friday-13th-count');
        }
        setShowFriday13thCount(!showFriday13thCount);
      }
    }

    const toggleFriday13th = () => {
      if (yearGridRef.current) {
        if (showFriday13th) {
            yearGridRef.current.classList.remove('show-friday-13th');
        } else {
            yearGridRef.current.classList.add('show-friday-13th');
        }
        setShowFriday13th(!showFriday13th);
      }
    }


    const closeCalendarLayout = () => {
      calendarLayoutRef.current.style.display = 'none';
  }

  var rangeLength = 800;
  var startingYear = 1600;
  var years = Array.from({length: rangeLength}, (n, offset) => startingYear + offset);
  return (
      <>
        <Container>
          <Row>
            <Col>
              <YearGrid className="year-grid">
              { years.map((y, key) => {
                  return <DrawYear12Digit key={key} year={''+y} handleYearClick={handleYearClick} /> 
                }
              )}
              </YearGrid>

            </Col>
          </Row>
        </Container>
      </>
  );
}

export default Calendar;