import { failures } from '../mocks/handlers';
import { server } from '../mocks/server';
import { getEmployees } from './client';

it("rejects malformed employee responses", async () => {
  server.use(failures.employeesMalformed);

  await expect(getEmployees()).rejects.toThrow();
});
