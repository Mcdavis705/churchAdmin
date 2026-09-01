import prisma from "../lib/prisma.js";

async function create(userData) {
  return prisma.user.create({
    data: userData,
  });
}

async function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function findById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function getAll() {
  return prisma.user.findMany();
}

async function update(id, data) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

async function remove(id) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

export default {
  create,
  findByEmail,
  findById,
  getAll,
  update,
  remove,
};