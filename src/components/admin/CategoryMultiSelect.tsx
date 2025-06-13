import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  field: {
    value: string[];
    onChange: (value: string[]) => void;
  };
  fieldState?: {
    error?: { message?: string };
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const categories = ["Clothing", "Books", "Electronics", "Kitchen"];

const CategoryMultiSelect = () => {
  const { setValue, getValues } = useFormContext<{ categories: string[] }>();
  const defaultCategories = getValues("categories");
  const [selectedCategories, setSelectedCategories] =
    useState(defaultCategories);

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedCategories: string[];

    if (checked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    }

    setSelectedCategories(updatedCategories);
    setValue("categories", updatedCategories, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const selectAll = () => {
    setSelectedCategories([...categories]);
    setValue("categories", [...categories], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setValue("categories", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardDescription>
            Choose one or more categories you're interested in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Categories</h3>
                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAll}
                    disabled={selectedCategories.length === categories.length}
                  >
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    disabled={selectedCategories.length === 0}
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, Boolean(checked))
                      }
                    />
                    <label
                      htmlFor={category}
                      className="flex-1 cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Categories Display */}
            {selectedCategories.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Selected Categories:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="default">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryMultiSelect;
