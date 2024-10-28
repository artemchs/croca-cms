"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type CreateOneIdInput } from "@/utils/validation/ids/createOneId";
import { type UseFormReturn } from "react-hook-form";

export function GoodsIdFormFields({
  form,
}: {
  form: UseFormReturn<CreateOneIdInput, unknown, undefined>;
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Основное</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Название идентификатора" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  );
}
