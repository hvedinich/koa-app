const controller = require('../../src/api/tables/controller');

const mockCreate = jest.fn();
const mockGetAll = jest.fn();
const mockConfigRead = jest.fn();

jest.mock('../../src/api/tables/model', () => ({
  create: (...args) => mockCreate(...args),
  getAll: (...args) => mockGetAll(...args),
}));

jest.mock('../../src/api/config/model', () => ({
  read: (...args) => mockConfigRead(...args),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Table controller', () => {
  describe('createOne', () => {
    it('should create new table', async () => {
      const tableNumber = 12;
      const ctx = { request: { body: { tableNumber } } };

      await controller.createOne(ctx);

      await expect(mockCreate.mock.calls[0][0].tableNumber).toBe(tableNumber);
    });

    it('should throw error when input is invalid', async () => {
      const ctx = { request: { body: { wrongField: 'wrongField' } } };

      await expect(controller.createOne(ctx)).rejects.toThrow('Validation error: "tableNumber" is required');
    });
  });

  describe('getAll', () => {
    it('should return tables with available time slots', async () => {
      const date = 12;
      const ctx = { query: { date } };
      const existingTables = [{ id: 'id', tableNumber: 1, bookings: [] }];

      mockConfigRead.mockResolvedValue({ openFrom: 2, openTo: 4 });
      mockGetAll.mockResolvedValue(existingTables);

      await controller.getAll(ctx);

      await expect(mockGetAll.mock.calls[0][0]).toStrictEqual({ date });
      expect(ctx.body.length).toBe(existingTables.length);
      expect(ctx.body[0].availableSlots.length).toBe(2);
    });

    it('should return tables without available time slots if they are fully booked', async () => {
      const date = 12;
      const ctx = { query: { date } };
      const existingTables = [{ id: 'id', tableNumber: 1, bookings: [{ timeSlot: 2 }, { timeSlot: 3 }] }];

      mockConfigRead.mockResolvedValue({ openFrom: 2, openTo: 4 });
      mockGetAll.mockResolvedValue(existingTables);

      await controller.getAll(ctx);

      await expect(mockGetAll.mock.calls[0][0]).toStrictEqual({ date });
      expect(ctx.body.length).toBe(existingTables.length);
      expect(ctx.body[0].availableSlots.length).toBe(0);
    });
  });
});
