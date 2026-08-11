import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60 * 60 * 1000, // 1 hours (this is user related data and it will only change when user updates)
    },
  },
});

interface IQueryProviderProps {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: IQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
