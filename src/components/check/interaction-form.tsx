
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Search } from 'lucide-react';
import { useEffect } from 'react';

const FormSchema = z.object({
  drugName: z.string().min(1, { message: 'Please enter a medication name.' }),
});

type InteractionFormProps = {
  onCheck: (drugName: string) => Promise<void>;
  isLoading: boolean;
  formPlaceholder: string;
  formButton: string;
  initialValue?: string;
}

export function InteractionForm({ onCheck, isLoading, formPlaceholder, formButton, initialValue = '' }: InteractionFormProps) {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      drugName: initialValue,
    },
  });

  useEffect(() => {
    form.reset({ drugName: initialValue });
  }, [initialValue, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onCheck(data.drugName);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="drugName"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input
                    placeholder={formPlaceholder}
                    {...field}
                    className="w-full pl-10 h-12 text-base"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Checking...' : formButton}
        </Button>
      </form>
    </Form>
  );
}
