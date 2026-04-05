const prisma = require("../config/prisma");
const ApiError = require("../utils/apiError");
const recordModel = require("../models/recordModel");

async function createRecord(payload, userId) {
  return recordModel.createRecord({
    ...payload,
    date: new Date(payload.date),
    userId,
  });
}

function buildRecordWhereClause(filters) {
  const where = { isDeleted: false };

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.startDate || filters.endDate) {
    where.date = {};
    if (filters.startDate) {
      where.date.gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      where.date.lte = new Date(filters.endDate);
    }
  }

  return where;
}

async function getRecords(filters) {
  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const limit = filters.limit && filters.limit > 0 ? Math.min(filters.limit, 100) : 10;
  const skip = (page - 1) * limit;

  const where = buildRecordWhereClause(filters);

  const [items, total] = await Promise.all([
    prisma.record.findMany({
      where,
      orderBy: { date: "desc" },
      skip,
      take: limit,
    }),
    prisma.record.count({ where }),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

async function getRecordById(recordId) {
  const record = await recordModel.findRecordById(recordId);
  if (!record || record.isDeleted) {
    throw new ApiError(404, "Record not found");
  }
  return record;
}

async function updateRecord(recordId, payload) {
  await getRecordById(recordId);

  const data = { ...payload };
  if (payload.date) {
    data.date = new Date(payload.date);
  }

  return recordModel.updateRecord(recordId, data);
}

async function deleteRecord(recordId) {
  await getRecordById(recordId);
  return recordModel.updateRecord(recordId, { isDeleted: true });
}

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
