import { oneUserQuery } from "@/api/query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Ban,
  Calendar,
  Edit,
  Key,
  Mail,
  MailX,
  ShieldCheck,
  Timer,
  UserCheck,
} from "lucide-react";
import { Link, useLoaderData } from "react-router";

const UserDetailsPage = () => {
  const { userId } = useLoaderData();
  const { data } = useSuspenseQuery(oneUserQuery(userId));
  const userData = data.user;
  console.log(userData);

  const firstLetters = userData.name
    ?.split(" ")
    .slice(0, 3)
    .map((item: string) => item.slice(0, 1).toUpperCase())
    .join("");

  return (
    <section className="mx-auto max-w-5xl">
      <Card>
        <CardHeader className="max-sm:px-1">
          <div className="space-y-5 md:flex md:justify-between">
            <div className="flex gap-2">
              {userData.image ? (
                <img
                  src={userData.image.url}
                  alt="profile avatar"
                  className="size-28 rounded-md object-cover"
                />
              ) : (
                <div className="grid size-16 place-items-center rounded-full border border-green-200">
                  {firstLetters}
                </div>
              )}
              <div className="space-y-1">
                <h2 className="font-medium sm:text-xl">{userData.name}</h2>
                <div className="text-muted-foreground text-sm">
                  {userData.email}
                </div>
                <div className="mt-2 space-x-2">
                  <Badge
                    className={cn(
                      userData.role === "ADMIN"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800",
                    )}
                  >
                    {userData.role === "ADMIN" && <ShieldCheck />}
                    {userData.role === "ADMIN" ? "Admin" : "User"}
                  </Badge>

                  <Badge
                    className={cn(
                      userData.ban.isBanned
                        ? "bg-red-500 text-white"
                        : "bg-green-100 text-green-800",
                    )}
                  >
                    {userData.ban.isBanned ? <Ban /> : <UserCheck />}
                    {userData.ban.isBanned ? "BANNED" : "ACTIVE"}
                  </Badge>
                  <Badge
                    className={cn(
                      userData.isEmailVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800",
                    )}
                  >
                    {userData.isEmailVerified ? <Mail /> : <MailX />}
                    {userData.isEmailVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <Button asChild className="w-full">
                <Link to={"edit"}>
                  <Edit />
                  Edit User
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="grid gap-4 py-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="mb-6 text-xl font-medium">Basic Information</h3>
              <div className="text-[15px]">
                <span className="text-muted-foreground">User ID: </span>
                <span>{userData._id}</span>
              </div>
              <div className="text-[15px]">
                <span className="text-muted-foreground">Full Name: </span>
                <span>{userData.name}</span>
              </div>
              <div className="text-[15px]">
                <span className="text-muted-foreground">Email Address: </span>
                <span>{userData.email}</span>
              </div>
              <div className="text-[15px]">
                <span className="text-muted-foreground">Role: </span>
                <span>{userData.role}</span>
              </div>
              <div className="text-[15px]">
                <span className="text-muted-foreground">Status: </span>
                <span>{userData.status}</span>
              </div>
            </div>
            <div className="space-y-2 text-[15px]">
              <h3 className="mb-6 text-xl font-medium">Account Status</h3>
              <div className="flex justify-between">
                <div>Email Verified </div>

                <Badge
                  className={cn(
                    userData.isEmailVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800",
                  )}
                >
                  {userData.isEmailVerified ? <Mail /> : <MailX />}
                  {userData.isEmailVerified ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex justify-between text-[15px]">
                <div>Account Status </div>
                <Badge
                  className={cn(
                    "mt-1",
                    userData.ban.isBanned
                      ? "bg-red-500 text-white"
                      : "bg-green-100 text-green-800",
                  )}
                >
                  {userData.ban.isBanned ? <Ban /> : <UserCheck />}
                  {userData.ban.isBanned ? "BANNED" : "ACTIVE"}
                </Badge>
              </div>
              <div className="flex justify-between text-[15px]">
                <div>Login Errors </div>
                <div className="mt-1 rounded-md border border-slate-200 px-1 text-sm">
                  {userData.errorLoginCount}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="max-sm:flex-wrap max-sm:gap-3">
          <div className="flex w-full items-center gap-2 text-sm">
            <Calendar size={16} />
            <div>
              <div className="font-semibold">Account Created</div>
              <div className="text-muted-foreground">
                {formatDate(userData.createdAt)}
              </div>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 text-sm">
            <Timer size={20} />
            <div>
              <div className="font-semibold">Last Updated</div>
              <div className="text-muted-foreground">
                {formatDate(userData.updatedAt)}
              </div>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 text-sm">
            <Key size={18} />
            <div>
              <div className="font-semibold">Password Changed</div>
              <div className="text-muted-foreground">
                {formatDate(userData.passwordChangedAt)}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default UserDetailsPage;
