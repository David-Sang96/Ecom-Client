import { BiEnvelope } from "react-icons/bi";
import { IoCheckmarkSharp } from "react-icons/io5";

import LogoutBtn from "@/components/auth/LogoutBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProfileDialog from "@/components/user/ProfileDialog";
import { TooltipHover } from "@/components/user/Tooltip";
import useAuthStore from "@/store/authStore";

const ProfilePage = () => {
  const { email, name, role, accountStatus, isEmailVerified, image } =
    useAuthStore();

  return (
    <section className="mx-auto max-w-xl py-16 md:pt-24 ">
      <Card>
        <CardHeader>
          <Avatar className="size-32 md:size-40 rounded-md mx-auto">
            {image ? (
              <AvatarImage src={image} alt="profile picture" />
            ) : (
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            )}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="w-[80px] bg-green-200 flex items-center justify-center rounded-md p-1 gap-1 text-xs md:text-sm">
              <p className="size-4 flex items-center justify-center rounded-full bg-green-600 text-white">
                <IoCheckmarkSharp />
              </p>
              <p className="text-green-800 font-medium text-xs">
                {isEmailVerified && "Verified"}
              </p>
            </div>
            <div className="w-[80px] bg-green-200 flex items-center justify-center rounded-md p-1 gap-1 text-xs md:text-sm">
              <p className="size-4 flex items-center justify-center rounded-full bg-green-600 text-white">
                <IoCheckmarkSharp />
              </p>
              <p className="text-green-800 font-medium text-xs">
                {accountStatus}
              </p>
            </div>
          </div>
          <div className="md:flex md:justify-between md:items-end ">
            <div className="max-md:mb-5">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="md:text-xl font-medium ">{name}</h2>
                {role === "ADMIN" && (
                  <p className="text-xs lowercase bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md font-bold">
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
              <ProfileDialog />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfilePage;
