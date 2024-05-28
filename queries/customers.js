const getCustomerRolesById =
  'SELECT r.name FROM "Role" r INNER JOIN "CustomerRole" cr ON cr.roleid =r.id WHERE cr.customerid =$1';
module.exports = {
  getCustomerRolesById
};
