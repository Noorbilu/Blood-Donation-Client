import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const normalizeRole = (raw) => {
  const r = String(raw || "").toLowerCase();

  if (r === "admin") return { role: "admin", uiRole: "admin", displayRole: "Admin" };
  if (r === "volunteer" || r === "manager")
    return { role: "volunteer", uiRole: "manager", displayRole: "Manager" };
  // default donor/user -> "user"
  return { role: "donor", uiRole: "user", displayRole: "User" };
};

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const enabled = !!user?.email;
  const email = user?.email ? encodeURIComponent(user.email) : "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        // 1) Preferred: dedicated role endpoint
        const res = await axiosSecure.get(`/users/${email}/role`);
        return normalizeRole(res?.data?.role);
      } catch (_) {
        // 2) Fallback: profile endpoint with role in payload
        const res = await axiosSecure.get(`/users/profile/${email}`);
        return normalizeRole(res?.data?.role);
      }
    },
  });

  const normalized = data || normalizeRole("donor");
  const role = normalized.role; // 'donor' | 'volunteer' | 'admin'
  const uiRole = normalized.uiRole; // 'user' | 'manager' | 'admin'
  const displayRole = normalized.displayRole; // 'User' | 'Manager' | 'Admin'

  const isAdmin = uiRole === "admin";
  const isManager = uiRole === "manager";
  const isUser = uiRole === "user";

  const roleLoading = enabled ? isLoading : false;

  return { role, uiRole, displayRole, isAdmin, isManager, isUser, roleLoading, error };
};

export default useRole;
