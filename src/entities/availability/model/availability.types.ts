import type { EmployeeId, IsoDate } from '../../employee/model/employee.types';
import type { IsoTime } from '../../../shared/lib/brand';

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