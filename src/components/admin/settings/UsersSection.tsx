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

const UsersSection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Account Settings</CardTitle>
          <CardDescription>
            Configure user account validation and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <Label>Minimum Password Length</Label>
              <Input value={8} type="number" />
            </div>
            <div className="space-y-4">
              <Label>Minimum Username Length</Label>
              <Input value={5} type="number" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5 text-sm">
              <h3 className="font-medium"> Email Verification Required</h3>
              <div className="text-muted-foreground">
                Require email verification for new accounts
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Security</CardTitle>
          <CardDescription>
            Configure login security and account protection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-4">
              <Label>Max Login Attempts</Label>
              <Input value={5} type="number" />
            </div>
            <div className="space-y-4">
              <Label>Account Freeze Threshold</Label>
              <Input value={3} type="number" />
            </div>
            <div className="space-y-4">
              <Label>Auto-unban after (days)</Label>
              <Input value={30} type="number" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default UsersSection;
