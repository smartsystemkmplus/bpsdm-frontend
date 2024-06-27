import dayjs from 'dayjs';

/**
 * A utility function to format date
 *
 * @param date - ISO String, or instance of Date, or unix timestamp.
 * @param longDate - Format as "12 November 2023" if true, instead of "12 Nov".
 * @param useToday - If date is today, format as "Hari ini" instead of "3:30 PM"
 */

const processMessageDate = (
  date: string | Date | number,
  longDate: boolean = false,
  useToday: boolean = false
) => {
  const dateNow = dayjs();
  const dateMessage = dayjs(date);
  if (dateNow.diff(dateMessage, 'day') === 0) {
    return useToday ? 'Hari ini' : dateMessage.format('h:mm A');
  }
  return dateMessage.format(longDate ? 'D MMMM YYYY' : 'D MMM');
};

export default processMessageDate;
