import { format } from 'date-fns';

const convertToSubmitFormat = (dateString) => {
    if (!dateString) return null;
  const parsedDate = new Date(dateString);
   if (isNaN(parsedDate)) return null;
  const mysqlLikeFormat = format(parsedDate, 'yyyy-MM-dd');
  return mysqlLikeFormat;
};

export { convertToSubmitFormat };
