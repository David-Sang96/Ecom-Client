import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";

const statuses = [
  "pending",
  "shipped",
  "cancelled",
  "completed",
  "failed",
  "processing",
];

const OrdersSection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Status Management</CardTitle>
          <CardDescription>Configure order processing workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="pb-2 font-medium">Available Order Statuses</h3>
            <div className="space-x-2">
              {statuses.map((status) => (
                <Badge variant={"secondary"} key={status}>
                  {status}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Label htmlFor="defaultProductStatus">Default Product Status</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Select Status"} />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem value={status} key={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Processing Rulest</CardTitle>
          <CardDescription>Automated order processing settings</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Label>Auto-complete orders after (days)</Label>
            <Input value={7} type="number" />
          </div>
          <div className="space-y-4">
            <Label>Cancel unpaid orders after (hours)</Label>
            <Input value={24} type="number" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Integration</CardTitle>
          <CardDescription>
            Configure payment processing settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5 text-sm">
              <h3 className="font-medium"> Stripe payments</h3>
              <div className="text-muted-foreground">
                Enable Stripe payment processing
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersSection;
