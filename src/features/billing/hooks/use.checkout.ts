"use client";

import { useState, useCallback } from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export function useCheckout() {
  const trpc = useTRPC();
  const [isLoading, setIsLoading] = useState(false);

  const createCheckout = useMutation(
    trpc.billing.createCheckout.mutationOptions({}),
  );

  const checkout = useCallback(async () => {
    setIsLoading(true);
    try {
      const { url } = await createCheckout.mutateAsync({});
      if (url) window.location.href = url;
    } finally {
      setIsLoading(false);
    }
  }, [createCheckout]);

  return { checkout, isLoading };
}