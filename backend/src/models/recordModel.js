const prisma = require("../config/prisma");

function createRecord(data) {
  return prisma.record.create({ data });
}

function findRecordById(id) {
  return prisma.record.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  });
}

function updateRecord(id, data) {
  return prisma.record.update({ where: { id }, data });
}

module.exports = {
  createRecord,
  findRecordById,
  updateRecord,
};
