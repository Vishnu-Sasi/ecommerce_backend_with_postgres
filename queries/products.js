const getAllProductQuery =
  'SELECT p.id,p.name,p.price,p."offerPrice",p."categoryId",c.name AS category_name,p."brandId",b.name AS brand_name FROM "Products" p JOIN "Categories" c on p."categoryId"=c.id JOIN "Brands" b on p."brandId"=b.id ';

const getOneProductQuery='SELECT p.id,p.name,p.price,p."offerPrice",p."categoryId",c.name AS category_name,p."brandId",b.name AS brand_name FROM "Products" p JOIN "Categories" c on p."categoryId"=c.id JOIN "Brands" b on p."brandId"=b.id where p.id=$1 ';

module.exports={
    getAllProductQuery,
    getOneProductQuery
}