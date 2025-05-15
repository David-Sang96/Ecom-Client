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
  const firstLetters = name
    ?.split(" ")
    .map((item) => item.slice(0, 1).toUpperCase())
    .join("");

  return (
    <section className="mx-auto max-w-xl py-16 md:pt-24">
      <Card>
        <CardHeader>
          <Avatar className="mx-auto size-32 rounded-md md:size-40">
            <AvatarImage
              src={image?.url}
              alt="profile picture"
              className="size-full rounded-full border-2 border-green-300 object-cover"
            />
            <AvatarFallback>{firstLetters}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex w-[80px] items-center justify-center gap-1 rounded-md bg-green-200 p-1 text-xs md:text-sm">
              <p className="flex size-4 items-center justify-center rounded-full bg-green-600 text-white">
                <IoCheckmarkSharp />
              </p>
              <p className="text-xs font-medium text-green-800">
                {isEmailVerified && "Verified"}
              </p>
            </div>
            <div className="flex w-[80px] items-center justify-center gap-1 rounded-md bg-green-200 p-1 text-xs md:text-sm">
              <p className="flex size-4 items-center justify-center rounded-full bg-green-600 text-white">
                <IoCheckmarkSharp />
              </p>
              <p className="text-xs font-medium text-green-800">
                {accountStatus}
              </p>
            </div>
          </div>
          <div className="md:flex md:items-end md:justify-between">
            <div className="max-md:mb-5">
              <div className="mb-2 flex items-center gap-3">
                <h2 className="font-medium md:text-xl">{name}</h2>
                {role === "ADMIN" && (
                  <p className="rounded-md bg-black px-2 py-1 text-xs font-bold text-white dark:bg-white dark:text-black">
                    {role[0] + role.slice(1).toLocaleLowerCase()}
                  </p>
                )}
              </div>
              <p className="text-muted-foreground text-sm">{email}</p>
            </div>
            <div className="flex items-center justify-end">
              <TooltipHover content="send mail">
                <Button
                  className="cursor-pointer"
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
