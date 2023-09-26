import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";

// Services
import * as services from "../../services";

jest.mock("../../services");

const Wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Test useQuery", () => {
  it("Render data", async () => {
    jest.spyOn(services, "getPosts").mockResolvedValue([
      {
        id: 1,
        body: "Duong Pham Ne",
        title: "Duong",
        userId: 12,
      },
    ]);

    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ["aaaa"],
          queryFn: services.getPosts,
        }),
      {
        wrapper: Wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([
        {
          id: 1,
          body: "Duong Pham Ne",
          title: "Duong",
          userId: 12,
        },
      ]);
      expect(result.current.isSuccess).toEqual(true);
    });
  });
});
