import { quickAction } from "@/assets/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          {quickAction.map((item, idx) => (
            <Link to={item.to} key={idx} className="w-full">
              <div
                className={cn(
                  "broder-2 flex flex-col items-center justify-center gap-4 rounded-md border p-5",
                  idx === 0 && "dark:bg-white dark:text-black",
                )}
              >
                <item.icon />
                <div className="font-medium">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
