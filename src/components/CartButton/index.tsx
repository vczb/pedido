import { MouseEventHandler, useMemo } from "react";
import Cart from "../../icons/Cart";
import { useCompany } from "@/hooks/use-company";
import { useCart } from "@/hooks/use-cart";

export type CartButtonProps = {
  variant?: "success" | "info" | "black";
};

const CartButton = ({ variant = "black" }: CartButtonProps) => {
  const {
    company: { currency },
  } = useCompany();

  const { quantity, total } = useCart();

  const quantityMessage: string = useMemo(() => {
    if (quantity > 1) {
      return "Items";
    }
    return "Item";
  }, [quantity]);

  const isHidden = useMemo(() => quantity === 0, [quantity]);

  const variantStyles = useMemo(() => {
    switch (variant) {
      case "success":
        return "bg-success text-white hover:text-black";
      case "info":
        return "bg-info text-white hover:text-black";
      case "black":
      default:
        return "bg-black text-white hover:text-primary-500";
    }
  }, [variant]);

  return (
    <button
      className={`flex justify-between items-center fixed bottom-0 left-0 right-0 w-full h-14 cursor-pointer px-3 duration-200 ${variantStyles} 
        ${isHidden ? "hidden" : ""}`}
    >
      <Cart className="w-6 lg:w-8 fill-current" />
      <p className="text-medium lg:text-large font-bold">{`${quantity} ${quantityMessage}`}</p>
      <p className="text-medium lg:text-large font-bold">{`${currency} ${total}`}</p>
    </button>
  );
};

export default CartButton;
