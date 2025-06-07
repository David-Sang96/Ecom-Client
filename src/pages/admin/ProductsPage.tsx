import { allProductsQuery } from "@/api/query";
import { columns } from "@/components/admin/products/columns";
import { DataTable } from "@/components/admin/products/DataTable";
import { useSuspenseQuery } from "@tanstack/react-query";

const ProductsPage = () => {
  const { data } = useSuspenseQuery(allProductsQuery());
  const productsData = data.products;

  return <DataTable columns={columns} data={productsData} />;
};

export default ProductsPage;
