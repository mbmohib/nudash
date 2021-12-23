import { useColorMode } from '@chakra-ui/react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../assets/css/datapicker.css';

interface DatePickerProps {
  onChange: (date: Date) => void;
}

const DatePicker = ({
  onChange,
  ...props
}: ReactDatePickerProps & DatePickerProps) => {
  const isLight = useColorMode().colorMode === 'light';

  return (
    <div className={isLight ? 'light-theme' : 'dark-theme'}>
      <ReactDatePicker
        onChange={onChange}
        className="react-datapicker__input-text"
        {...props}
      />
    </div>
  );
};

export default DatePicker;
