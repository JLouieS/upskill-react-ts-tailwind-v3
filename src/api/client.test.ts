import { failures } from '../mocks/handlers';
import { server } from '../mocks/server';
import { getEmployees } from './client';

it("rejects malformed employee responses", async () => {
  server.use(failures.employeesMalformed);

  await expect(getEmployees()).rejects.toThrow();
});

it("rejects when the server returns an error", async () => {
  server.use(failures.employeesServerError);

  await expect(getEmployees()).rejects.toThrow();
});