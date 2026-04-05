const prisma = require("../config/prisma");

function createUser(data) {
  return prisma.user.create({ data });
}

function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

function updateUser(id, data) {
  return prisma.user.update({ where: { id }, data });
}

function deleteUser(id) {
  return prisma.user.delete({ where: { id } });
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  listUsers,
  updateUser,
  deleteUser,
};
