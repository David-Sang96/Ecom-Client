import { Button } from "@/components/ui/button";
import { Access, useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";

const SuccessPage = () => {
  const [error, setError] = useState("");
  const { data, err } = useLoaderData();
  const navigate = useNavigate();
  const setAccess = useCartStore((store) => store.setAccess);
  const access = useCartStore((store) => store.access);
  const clear = useCartStore((store) => store.clear);

  useEffect(() => {
    if (access !== Access.success) {
      navigate("/");
    }
    if (data.success) {
      toast.success(data.message);
      setAccess(Access.order);
      clear();
    }
    if (err) {
      setError(err);
    }
  }, []);

  return (
    <div className="mt-24 flex flex-col items-center gap-4">
      {error ? (
        <div className="space-y-4">
          <p className="text-3xl font-medium">Something went wrong</p>
          <p className="font-medium">{error}</p>
        </div>
      ) : (
        <>
          <p className="text-3xl font-medium">
            Your payment accepted by Ecomwithya.com
          </p>
          <p className="font-medium">
            You can view your Orders or continue Shopping with us
          </p>
          <div className="flex items-center gap-x-5">
            <Button
              className="cursor-pointer px-11"
              onClick={() => {
                setAccess(Access.order);
                navigate("/orders", { replace: true });
              }}
            >
              View Orders
            </Button>
            <Button className="cursor-pointer">
              <Link to={"/products"}>Continue Shopping</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SuccessPage;
