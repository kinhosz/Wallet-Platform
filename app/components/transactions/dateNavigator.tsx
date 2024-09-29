import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import DatePicker from "react-datepicker";

const DateNavigator = ({ currentDate, setCurrentDate }) => {
    const handlePrevDay = () => {
      setCurrentDate((prevDate) => new Date(prevDate.getTime() - 24 * 60 * 60 * 1000));
    };
  
    const handleNextDay = () => {
      setCurrentDate((prevDate) => new Date(prevDate.getTime() + 24 * 60 * 60 * 1000));
    };
  
    const handleDoubleClick = () => {
      setCurrentDate(new Date());
    };
  
    return (
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={handlePrevDay}
          className="p-2 bg-orange-500 text-white rounded-full mr-2 active:bg-orange-300"
        >
          <MdArrowBack size={24} />
        </button>
  
        <div onDoubleClick={handleDoubleClick}>
          <DatePicker
            selected={currentDate}
            onChange={(date) => setCurrentDate(date)}
            dateFormat="MMMM, dd, yyyy"
            customInput={
              <div className="px-4 py-2 bg-white border-2 border-orange-500 rounded-full shadow-md text-xl font-bold text-orange-500 cursor-pointer active:bg-orange-300">
                {format(currentDate, "MMMM, dd, yyyy", { locale: enUS })}
              </div>
            }
            locale={enUS}
          />
        </div>
  
        <button
          onClick={handleNextDay}
          className="p-2 bg-orange-500 text-white rounded-full ml-2 active:bg-orange-300 cursor-pointer"
        >
          <MdArrowForward size={24} />
        </button>
      </div>
    );
  };

export default DateNavigator;