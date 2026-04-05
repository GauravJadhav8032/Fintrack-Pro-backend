const prisma = require("../config/prisma");

async function getSummary() {
  const aggregates = await prisma.record.groupBy({
    by: ["type"],
    where: { isDeleted: false },
    _sum: { amount: true },
  });

  const totalIncome =
    aggregates.find((item) => item.type === "income")?._sum.amount || 0;
  const totalExpense =
    aggregates.find((item) => item.type === "expense")?._sum.amount || 0;

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
}

async function getCategories() {
  const rows = await prisma.record.groupBy({
    by: ["category"],
    where: { isDeleted: false },
    _sum: { amount: true },
    _count: { category: true },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  return rows.map((row) => ({
    category: row.category,
    totalAmount: row._sum.amount || 0,
    transactions: row._count.category,
  }));
}

async function getTrends(year) {
  const records = await prisma.record.findMany({
    where: {
      isDeleted: false,
      ...(year
        ? {
            date: {
              gte: new Date(`${year}-01-01T00:00:00.000Z`),
              lte: new Date(`${year}-12-31T23:59:59.999Z`),
            },
          }
        : {}),
    },
    select: {
      amount: true,
      type: true,
      date: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const grouped = records.reduce((acc, record) => {
    const month = `${record.date.getUTCFullYear()}-${String(
      record.date.getUTCMonth() + 1
    ).padStart(2, "0")}`;

    if (!acc[month]) {
      acc[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (record.type === "income") {
      acc[month].income += record.amount;
    } else {
      acc[month].expense += record.amount;
    }

    return acc;
  }, {});

  return Object.values(grouped).map((item) => ({
    ...item,
    net: item.income - item.expense,
  }));
}

async function getRecent(limit = 5) {
  return prisma.record.findMany({
    where: { isDeleted: false },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    take: Math.min(limit, 20),
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
}

module.exports = {
  getSummary,
  getCategories,
  getTrends,
  getRecent,
};
