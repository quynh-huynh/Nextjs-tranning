"use client";
import React, { useActionState, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateOrder, defaultState, State } from "@/app/lib/actions/order-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { formatCurrency } from "@/app/lib/number";
import { Variant } from "@/app/lib/models/product";

interface OrderPopupProps {
  variant: Variant;
  onSave: (value: boolean) => void;
}

export default function OrderPopup({ variant, onSave }: OrderPopupProps) {
  const [formData, setFormData] = React.useState({
    phone: "",
    name: "",
    address: "",
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(CreateOrder, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!state?.message) {
      localStorage.setItem("orderData", JSON.stringify({...formData, variantId: variant.id} ));
      closeButtonRef.current?.click();
      onSave(true);
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Order Information</DialogTitle>
          <DialogDescription>
            Please fill in the required information.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-describedby="phone-error"
                />
              </div>
              <div id="phone-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.phone &&
                  state.errors.phone.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  aria-describedby="name-error"
                />
              </div>
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  aria-describedby="address-error"
                />
              </div>
              <div id="address-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.address &&
                  state.errors?.address.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="relative mt-2 rounded-md">
              <Label>
                {variant.title} - {formatCurrency(variant.price)}
              </Label>
            </div>
          </div>

          <DialogFooter className="flex justify-center flex-row gap-5">
            <DialogClose asChild>
              <Button variant="secondary" ref={closeButtonRef}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
