import { allUsersQuery } from "@/api/query";
import { columns } from "@/components/admin/user/columns";
import { DataTable } from "@/components/admin/user/DataTable";
import { useSuspenseQuery } from "@tanstack/react-query";

const UsersPage = () => {
  const { data } = useSuspenseQuery(allUsersQuery());
  const userData = data.users;

  return <DataTable columns={columns} data={userData} />;
};

export default UsersPage;
