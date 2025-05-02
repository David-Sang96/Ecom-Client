import LogoutBtn from "@/components/auth/LogoutBtn";
import { TooltipHover } from "@/components/Tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useAuthStore from "@/store/authStore";

import { Ellipsis } from "lucide-react";
import { BiEnvelope } from "react-icons/bi";

const ProfilePage = () => {
  const { email, name, role } = useAuthStore();

  return (
    <section className="mx-auto max-w-xl pt-16 md:pt-24 ">
      <Card>
        <CardHeader>
          <Avatar className="size-32 md:size-40 rounded-md mx-auto">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-[80px] bg-green-200 flex items-center justify-center rounded-md py-1 gap-1 text-xs md:text-sm">
            <p className="size-5  flex items-center justify-center rounded-full bg-green-600 text-white">
              <span>%</span>
            </p>
            <p className="text-green-700 font-medium">LVL 8</p>
          </div>
          <div className="md:flex md:justify-between md:items-end ">
            <div className="max-md:mb-5">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="md:text-xl font-medium ">{name}</h2>
                {role === "ADMIN" && (
                  <p className="text-xs lowercase bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md">
                    {role}
                  </p>
                )}
              </div>
              <p className="text-muted-foreground max-md:text-sm">{email}</p>
            </div>
            <div className="flex items-center justify-end">
              <TooltipHover content="send mail">
                <Button
                  className="cursor-pointer "
                  size={"sm"}
                  aria-label="send mail"
                >
                  <BiEnvelope className="size-4" />
                </Button>
              </TooltipHover>
              <LogoutBtn isNav={false} />
              <TooltipHover content="setting">
                <Button
                  className="cursor-pointer"
                  size={"sm"}
                  aria-label="setting"
                >
                  <Ellipsis className="size-4" />
                </Button>
              </TooltipHover>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfilePage;
