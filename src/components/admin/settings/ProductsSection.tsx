import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KeyboardEvent, MouseEvent, useRef, useState } from "react";

const categories = ["Books", "Clothing", "Electronics", "Kitchen"];
const ProductsSection = () => {
  const [category, setCategory] = useState<string[]>(categories);
  const inputRef = useRef<HTMLInputElement>(null);

  const removeCategory = (category: string) => {
    setCategory((cat) => cat.filter((cat) => cat !== category));
  };

  const addCategory = (
    e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    // only continue on Enter key or button click
    if ("key" in e && e.key !== "Enter") return;
    const value = inputRef.current?.value.trim();
    if (value) {
      const capitalize = value.slice(0, 1).toUpperCase() + value.slice(1);
      if (category.includes(capitalize)) {
        inputRef.current!.value = "";
        return;
      }
      setCategory((cat) => [...cat, capitalize]);
      inputRef.current!.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Categories</CardTitle>
          <CardDescription>Manage allowed product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-x-2">
            {category.map((item) => (
              <Badge key={item} variant={"secondary"}>
                {item}
                <button
                  onClick={() => removeCategory(item)}
                  className="ml-1 cursor-pointer text-xs hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Add new category"
              onKeyDown={addCategory}
            />
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={addCategory}
            >
              Add Category
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Validation</CardTitle>
          <CardDescription>
            Set validation rules for product creation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="w-full space-y-4">
              <Label>Min Product Name Length</Label>
              <Input type="number" value={10} />
            </div>
            <div className="w-full space-y-4">
              <Label>Max Product Name Length</Label>
              <Input type="number" value={100} />
            </div>
            <div className="w-full space-y-4">
              <Label>Min Stock Threshold</Label>
              <Input type="number" value={5} />
            </div>
          </div>
          <div className="space-y-4">
            <Label htmlFor="defaultProductStatus">Default Product Status</Label>
            <Select value="pending">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Select Status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsSection;
