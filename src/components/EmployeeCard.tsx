import type { Employee, EmployeeId } from '../types/employee';
import { STATUS_LABELS } from '../types/employee';
import { Button } from './Button';
import { cn } from '../lib/cn';

export type EmployeeCardProps = {
  employee: Employee;
  onSelect: (id: EmployeeId) => void;
};

const STATUS_CLASSES = {
  active: 'text-status-active',
  inactive: 'text-status-inactive',
  'on-leave': 'text-status-on-leave',
} satisfies Record<Employee['status'], string>;

export function EmployeeCard({ employee, onSelect }: EmployeeCardProps) {
  return (
    <div className="rounded-card border p-card m-4">
        <h2>{employee.name}</h2>
        <p>{employee.email}</p>
        <p>{employee.department}</p>
        <p
          className={cn(
            'font-medium',
            STATUS_CLASSES[employee.status]
          )}
        >
          Status: {STATUS_LABELS[employee.status]}
        </p>

        <Button className="mt-4" onClick={() => onSelect(employee.id)}>
          View Employee
        </Button>
    </div>
  )
}