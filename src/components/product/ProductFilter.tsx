import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { useFilterStore } from "@/store/filterStore";
import { useForm } from "react-hook-form";

type ProductFilterProps = {
  handleFilter: (value: string[]) => void;
  previousCategories: string[];
};

const categoryLists = ["Electronics", "Clothing", "Kitchen", "Books"];

export default function ProductFilter({
  handleFilter,
  previousCategories,
}: ProductFilterProps) {
  const [openCategories, setOpenCategories] = useState(true);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { categories: previousCategories },
  });
  const setFilterState = useFilterStore((store) => store.setFilterState);

  const selectedCategories = watch("categories", []);

  const handleCheckBoxChange = (category: string, check: boolean) => {
    const current = watch("categories") || [];

    if (check) {
      setValue("categories", [...current, category]);
    } else {
      setValue(
        "categories",
        current.filter((item: string) => item !== category),
      );
    }
  };

  useEffect(() => {
    setValue("categories", previousCategories);
  }, [previousCategories, setValue]);

  // @ts-expect-error notype-check
  const onSubmit = (value) => {
    handleFilter(value.categories);
    setFilterState(value.categories);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Collapsible open={openCategories} onOpenChange={setOpenCategories}>
          <CollapsibleTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between border-b pb-2">
              <h3 className="font-medium">Categories</h3>
              <ChevronDown className="h-4 w-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-4">
            <input
              type="hidden"
              {...register("categories")}
              value={selectedCategories}
            />
            {categoryLists.map((category, index) => (
              <div className="mb-3 flex items-center space-x-2" key={index}>
                <Checkbox
                  id="index"
                  checked={selectedCategories?.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCheckBoxChange(category, Boolean(checked))
                  }
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Button className="w-full cursor-pointer" type="submit">
          Apply Filters
        </Button>
      </div>
    </form>
  );
}
