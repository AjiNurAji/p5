import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { id } from 'react-day-picker/locale';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface Props {
  withTime?: boolean;
  keyName: string;
  value: Date;
  setValue: (key: string, date: any) => void;
}

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return '';
  }

  const d = date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });

  const t = date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  });

  return `${d} pukul ${t}`;
};

const isValidDate = (date: Date | undefined) => {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
};

export const DatePicker = ({ withTime, value, setValue, keyName }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>(
    `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}:${value.getSeconds().toString().padStart(2, '0')}`,
  );
  const [month, setMonth] = useState<Date | undefined>(value);
  const [date, setDate] = useState<string>(formatDate(value));

  return (
    <div className="relative flex-col sm:flex-row flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id="date-picker" variant="outline" className={cn('w-full font-normal bg-transparent dark:bg-input/30', !value && 'text-muted-foreground')}>
            {value ? date : <span className="sr-only">Pilih tanggal</span>}
            <CalendarIcon className="ml-auto size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto items-start p-0" align="end" alignOffset={-8} sideOffset={10}>
          <div>
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              locale={id}
              month={month}
              onDayClick={() => setOpen(false)}
              fromYear={new Date().getFullYear()}
              toYear={new Date().getFullYear() + 1}
              onMonthChange={setMonth}
              onSelect={(date) => {
                const [hours, minutes] = time.split(':');
                date?.setHours(parseInt(hours), parseInt(minutes));
                setDate(formatDate(date));
                setValue(keyName, date);
                setOpen(false);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
      {withTime && (
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue={time}
          onChange={(e) => {
            const [hour, minute, second] = e.target.value.split(':');
            const newDate = new Date(value);
            newDate.setHours(parseInt(hour), parseInt(minute), parseInt(second));
            setValue(keyName, newDate);
            setDate(formatDate(newDate));
            setTime(e.target.value);
          }}
          className="w-full sm:w-46 text-sm appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      )}
    </div>
  );
};
