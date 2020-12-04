/**
 created by rajatdua on 02/12/20
 */
const calendar = (function(){
  /*  Calculates the days in a month doesn't matter what year, even leap year ref:
      DZone Article - Determining Number of Days
      by: Snippet Manager (May 25, 2006)
   */
  /**
   *
   * @param month
   * @param year
   * @returns {number}
   */
  function daysInAMonth (month, year){
    return 32 - new Date(year, month ,32).getDate();
  }
  let curr = new Date(), currMonth = curr.getMonth(), currYear = curr.getFullYear();
  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const DAYS = [
    'Sun', 'Mon', 'Tue',
    'Wed', 'Thu', 'Fri', 'Sat'
  ];
  const rows = [];
  // Creating row for days
  for(const dayIndex in DAYS){
    const curr = DAYS[dayIndex];
    rows.push(`<th data-info=${curr}>${curr}</th>`)
  }
  rows.unshift('<tr>');
  rows.push('</tr>');
  // settings newly created row
  document.getElementById('calendarDays').innerHTML = rows.join('');

  // generator function for calendar to re-render
  function generateCalendar(month, year){
    const initialDay = new Date(year, month).getDay();
    const calendarDates = document.getElementById('calendarDates');
    const monthWithYear = document.getElementById('monthWithYear');
    // clear previous calendar
    calendarDates.innerHTML = '';
    monthWithYear.innerHTML = `${MONTHS[month]} - ${year}`
    let date = 1;
    // rendering dates
    for(let i = 0; i < 6; ++i){
      // loop for date rows
      const singular = document.createElement('tr');
      for(let j = 0; j < 7; ++j){
        // loop for days
        if(i === 0 && j < initialDay){
          // empty dates
          const singularDate = document.createElement('td')
          singularDate.appendChild(document.createTextNode(""));
          singular.appendChild(singularDate);
        }else if (date > daysInAMonth(month, year)){
          break;
        }else{
          //singular date
          const sD = document.createElement('td');
          sD.setAttribute('data-date', String(date));
          sD.setAttribute('data-month', String(month + 1));
          sD.setAttribute('data-year', String(year));
          sD.setAttribute('data-month-name', MONTHS[month]);
          sD.className = 'singularDate';
          sD.innerHTML = `<span>${date}</span>`

          if(date === curr.getDate() && year === curr.getFullYear() && month === curr.getMonth()) sD.className = 'singularDate selected'

          singular.appendChild(sD);
          date++;
        }
      }
      calendarDates.appendChild(singular);
    }
  }

  generateCalendar(currMonth, currYear);

  /**
   * Function for subtracting a month form the current selected
   */
  function calendarPrevious(){
    currYear = currMonth === 0 ? currYear - 1 : currYear;
    currMonth = currMonth === 0 ? 11 : currMonth - 1;
    generateCalendar(currMonth, currYear)
  }
  /**
   * Function for adding a month form the current selected
   */
  function calendarNext(){
    currYear = currMonth === 11 ? currYear + 1 : currYear;
    currMonth = (currMonth + 1) % 12;
    generateCalendar(currMonth, currYear)
  }

  // revealing model
  return {
    prev: calendarPrevious,
    next: calendarNext
  };
})();