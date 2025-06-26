import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SystemSection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">File Upload Settings</CardTitle>
          <CardDescription>
            Configure file upload and image handling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-0.5 text-sm">
              <h3 className="font-medium">Enable Image Upload</h3>
              <div className="text-muted-foreground">
                Allow users to upload product images
              </div>
            </div>
            <Switch />
          </div>
          <div className="space-y-4">
            <Label>Maximum Image Size (MB)</Label>
            <Input value={5} type="number" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">File Upload Settings</CardTitle>
          <CardDescription>
            Configure file upload and image handling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-0.5 text-sm">
              <h3 className="font-medium">Maintenance Mode</h3>
              <div className="text-muted-foreground">
                Enable maintenance mode to restrict access
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5 text-sm">
              <h3 className="font-medium">Email Notifications</h3>
              <div className="text-muted-foreground">
                Enable system email notifications
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSection;
