import { BiEnvelope } from "react-icons/bi";
import { IoCheckmarkSharp } from "react-icons/io5";

import LogoutBtn from "@/components/auth/LogoutBtn";
import PageHeader from "@/components/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProfileDialog from "@/components/user/ProfileDialog";
import { TooltipHover } from "@/components/user/Tooltip";
import { useRouteContext } from "@/context/RouteContext";
import useAuthStore from "@/store/authStore";
import { Home, LayoutDashboard } from "lucide-react";

const ProfilePage = () => {
  const {
    email,
    name,
    role,
    accStatus,
    isEmailVerified,
    image,
    isDeactivated,
  } = useAuthStore();
  const firstLetters = name
    ?.split(" ")
    .map((item) => item.slice(0, 1).toUpperCase())
    .join("");
  const previouUrl = useRouteContext();

  // console.log(
  //   email,
  //   name,
  //   role,
  //   accountStatus,
  //   isEmailVerified,
  //   image,
  //   isDeactivated,
  // );

  return (
    <section>
      <PageHeader
        title="Profile"
        description="Manage your personal info, update your preferences, and control your account settings here."
        links={[
          {
            title: previouUrl?.startsWith("/admin") ? "Dashboard" : "Home",
            href: previouUrl?.startsWith("/admin") ? previouUrl : "/",
            icon: previouUrl?.startsWith("/admin") ? LayoutDashboard : Home,
          },
          { title: "Profile", href: "#" },
        ]}
      />
      <div className="mx-auto max-w-2xl">
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
              <div className="flex items-center justify-center gap-1 rounded-md bg-green-200 p-1 text-xs md:text-sm">
                <p className="flex size-4 items-center justify-center rounded-full bg-green-600 text-white">
                  <IoCheckmarkSharp />
                </p>
                <p className="text-xs font-medium text-green-800">
                  {isEmailVerified && "Verified"}
                </p>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-md bg-green-200 p-1 text-xs md:text-sm">
                <p className="flex size-4 items-center justify-center rounded-full bg-green-600 text-white">
                  <IoCheckmarkSharp />
                </p>
                <p className="text-xs font-medium text-green-800">
                  {accStatus!.slice(0, 1) + accStatus!.slice(1).toLowerCase()}
                </p>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-md bg-green-200 p-1 text-xs md:text-sm">
                <p className="flex size-4 items-center justify-center rounded-full bg-green-600 text-white">
                  <IoCheckmarkSharp />
                </p>
                <p className="text-xs font-medium text-green-800">
                  {isDeactivated
                    ? "Account is Deactivated"
                    : "Account is Active"}
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
      </div>
    </section>
  );
};

export default ProfilePage;
