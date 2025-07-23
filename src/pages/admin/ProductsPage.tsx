import { allProductsQuery } from "@/api/query";
import { getColumns } from "@/components/admin/products/columns";
import { DataTable } from "@/components/admin/products/DataTable";
import ImageSlider from "@/components/product/ImageSlider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

const ProductsPage = () => {
  const { data } = useSuspenseQuery(allProductsQuery());
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  const columns = getColumns({ setSliderOpen, setSliderImages });
  const productsData = data.products;

  return (
    <>
      <DataTable columns={columns} data={productsData} />
      <Dialog open={sliderOpen} onOpenChange={setSliderOpen}>
        <DialogContent
          className="max-w-2xl max-sm:max-w-sm"
          onMouseLeave={() => setSliderOpen(false)}
          showCloseButton={false}
        >
          <ImageSlider productImages={sliderImages} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsPage;
