import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderType } from "@/types/order";
import { ProductType } from "@/types/product";
import { User } from "@/types/user";

type GeneralSectionProps = {
  products: ProductType[];
  users: User[];
  orders: OrderType[];
};

const GeneralSection = ({ orders, products, users }: GeneralSectionProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Database Statistics</CardTitle>
          <CardDescription>
            Overview of your database collections
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Card className="gird place-items-center">
            <div className="space-y-1 text-center">
              <div className="text-2xl font-medium text-blue-600">
                {users.length.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-sm">Total Users</div>
            </div>
          </Card>
          <Card className="gird place-items-center">
            <div className="space-y-1 text-center">
              <div className="text-2xl font-medium text-green-600">
                {products.length.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-sm">
                Total Products
              </div>
            </div>
          </Card>
          <Card className="gird place-items-center">
            <div className="space-y-1 text-center">
              <div className="text-2xl font-medium text-purple-600">
                {orders.length.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-sm">Total Orders</div>
            </div>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Information</CardTitle>
          <CardDescription>Current system configuration</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 text-sm md:grid-cols-2">
          <div>
            <div className="font-medium">Database Status</div>
            <div className="text-green-600">Connected</div>
          </div>
          <div>
            <div className="font-medium">Last Backup</div>
            <div className="text-muted-foreground">2 hours ago</div>
          </div>
          <div>
            <div className="font-medium">Server Uptime</div>
            <div className="text-muted-foreground">5 days, 12 hours</div>
          </div>
          <div>
            <div className="font-medium">Version</div>
            <div className="text-muted-foreground">v1.2.3</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSection;
