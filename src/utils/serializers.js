function toSafeUser(user) {
  if (!user) return null;

  const { password, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  toSafeUser,
};
