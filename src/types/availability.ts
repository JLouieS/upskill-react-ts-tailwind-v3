import type { EmployeeId, IsoDate } from './employee';
import type { IsoTime } from './brand';

export type Availability =
  | {
      employeeId: EmployeeId;
      date: IsoDate;
      available: false
    }
  | {
      employeeId: EmployeeId;
      date: IsoDate;
      available: true;
      startTime: IsoTime;
      endTime: IsoTime
    };