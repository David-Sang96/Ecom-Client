import fetchApi from "@/api";
import { useCartStore } from "@/store/cartStore";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { Button } from "../ui/button";

const StripeCheckOut = () => {
  const products = useCartStore((store) => store.items);
  const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  const handleCheckout = async () => {
    const stripe = await loadStripe(stripePublicKey);
    const { data } = await fetchApi.post("/product/checkout", { products });
    const result = await stripe?.redirectToCheckout({ sessionId: data?.id });
    if (result?.error) {
      toast.error(result.error.message);
    }
  };

  return (
    <Button className="w-full cursor-pointer py-5" onClick={handleCheckout}>
      Proceed to Checkout
    </Button>
  );
};

export default StripeCheckOut;
