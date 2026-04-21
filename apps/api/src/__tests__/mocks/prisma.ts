const noop = async () => ({});

const mockUser = {
  findUnique: async () => null,
  findUniqueOrThrow: async () => ({ id: "u1", email: "student@example.com" }),
  findMany: async () => [],
  count: async () => 0,
  create: async () => ({ id: "u-new", email: "new@example.com", role: "STUDENT", name: "New User" }),
  upsert: async () => ({ id: "u-upsert", email: "upsert@example.com", role: "STUDENT", name: "Upsert User" })
};

const mockBooking = {
  findMany: async () => [],
  findUnique: async () => null,
  create: async (args: { data: Record<string, unknown> }) => ({ id: "b1", ...args.data }),
  update: async (args: { data: Record<string, unknown> }) => ({ id: "b1", ...args.data }),
  count: async () => 0,
  aggregate: async () => ({ _count: { id: 0 } })
};

export const prisma = {
  user: mockUser,
  booking: mockBooking,
  course: {
    findMany: async () => [],
    findUnique: async () => null,
    findUniqueOrThrow: async () => ({ id: "c1", title: "Course", priceCents: 10000 }),
    upsert: noop
  },
  instructorReview: {
    create: async () => ({ id: "r1" }),
    aggregate: async () => ({ _avg: { rating: 5 }, _count: { id: 1 } })
  },
  instructorProfile: { update: noop },
  studentProfile: {
    findUnique: async () => null,
    findMany: async () => [],
    update: noop,
    create: noop
  },
  studyMaterial: { findMany: async () => [], createMany: noop },
  practiceQuestion: { findMany: async () => [] },
  document: { create: async () => ({ id: "d1" }) },
  vehicle: { findMany: async () => [], create: async () => ({ id: "v1" }), createMany: noop },
  $disconnect: async () => undefined
};
