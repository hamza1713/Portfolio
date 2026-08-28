import { trpc } from '@/lib/trpc';

export function useAuth() {
  const utils = trpc.useUtils();
  const meQuery = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  return {
    user: meQuery.data ?? null,
    loading: meQuery.isLoading,
    error: meQuery.error,
    logout: async () => {
      await logoutMutation.mutateAsync();
      window.location.href = '/';
    },
  };
}
