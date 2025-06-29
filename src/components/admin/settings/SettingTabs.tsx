import { allOrdersQuery, allProductsQuery, allUsersQuery } from "@/api/query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Box,
  DatabaseBackup,
  Settings2,
  Shield,
  ShoppingCart,
  Users,
} from "lucide-react";
import GeneralSection from "./GeneralSection";
import OrdersSection from "./OrdersSection";
import ProductsSection from "./ProductsSection";
import SecuritySection from "./SecuritySection";
import SystemSection from "./SystemSection";
import UsersSection from "./UsersSection";

const SettingTabs = () => {
  const { data: productsData } = useSuspenseQuery(allProductsQuery());
  const { data: usersData } = useSuspenseQuery(allUsersQuery());
  const { data: ordersData } = useSuspenseQuery(allOrdersQuery());

  return (
    <section className="pb-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Admin Settings</h2>
        <div className="text-muted-foreground text-sm">
          Manage your ecommerce platform configuration
        </div>
      </div>

      <div className="mx-auto max-w-[75rem]">
        <Tabs defaultValue="products">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="products">
              <Box /> Products
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart /> Orders
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users /> Users
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield /> Security
            </TabsTrigger>
            <TabsTrigger value="system">
              <DatabaseBackup /> System
            </TabsTrigger>
            <TabsTrigger value="general">
              <Settings2 /> General
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductsSection />
          </TabsContent>
          <TabsContent value="orders">
            <OrdersSection />
          </TabsContent>
          <TabsContent value="users">
            <UsersSection />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySection />
          </TabsContent>
          <TabsContent value="system">
            <SystemSection />
          </TabsContent>
          <TabsContent value="general">
            <GeneralSection
              products={productsData.products}
              users={usersData.users}
              orders={ordersData.orders}
            />
          </TabsContent>
        </Tabs>
        <div className="mt-6 flex justify-end">
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SettingTabs;
