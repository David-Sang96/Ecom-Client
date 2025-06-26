import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SecuritySection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Token Management</CardTitle>
        <CardDescription>
          Configure security token expiration times
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 space-y-2 md:grid-cols-2">
          <div className="space-y-4">
            <Label>Refresh Token Expiry (days)</Label>
            <Input value={7} type="number" />
          </div>
          <div className="space-y-4">
            <Label>Reset Token Expiry (hours)</Label>
            <Input value={1} type="number" />
          </div>
          <div className="space-y-4">
            <Label>Email Verify Token Expiry (hours)</Label>
            <Input value={24} type="number" />
          </div>
          <div className="space-y-4">
            <Label>Session Timeout (minutes)</Label>
            <Input value={30} type="number" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
