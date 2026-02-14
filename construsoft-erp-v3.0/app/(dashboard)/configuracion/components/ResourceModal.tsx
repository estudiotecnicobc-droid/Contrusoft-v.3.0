'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { DatePicker } from '../../../../components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';

interface ResourceModalProps {
  apiUrl?: string; // Optional if using custom submit
  formSchema: any;
  formFields: { 
    name: string; 
    label: string; 
    placeholder?: string; 
    type?: string; 
    options?: { label: string; value: string }[] 
  }[];
  trigger: React.ReactNode;
  initialData?: any;
  title: string;
  description: string;
  onSubmitCustom?: (values: any) => Promise<void>; // Handler for client-side operations
}

export function ResourceModal({ 
  apiUrl, 
  formSchema, 
  formFields, 
  trigger, 
  initialData, 
  title, 
  description,
  onSubmitCustom 
}: ResourceModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isEditMode = !!initialData;

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode 
        ? Object.fromEntries(Object.entries(initialData).map(([key, value]) => 
            formFields.find(f => f.name === key && f.type === 'date') ? [key, new Date(value as string)] : [key, value]
          ))
        : {},
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: any) {
    try {
      if (onSubmitCustom) {
        await onSubmitCustom({ ...initialData, ...values });
      } else if (apiUrl) {
        const url = isEditMode ? `${apiUrl}/${initialData.id}` : apiUrl;
        const method = isEditMode ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ocurrió un error al guardar.');
        }
        router.refresh();
      } else {
        throw new Error("No submit method provided");
      }

      setOpen(false);
      form.reset();
    } catch (error: any) {
        console.error(error);
        alert(error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formFields.map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{f.label}</FormLabel>
                    <FormControl>
                      {f.type === 'date' ? (
                        <DatePicker date={field.value} setDate={field.onChange} />
                      ) : f.type === 'textarea' ? (
                        <Textarea placeholder={f.placeholder} {...field} value={field.value || ''} />
                      ) : f.type === 'select' ? (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={f.placeholder || "Seleccione una opción"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {f.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input placeholder={f.placeholder} type={f.type || 'text'} {...field} value={field.value || ''} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}