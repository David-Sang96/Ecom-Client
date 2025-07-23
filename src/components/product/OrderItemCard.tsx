import { useIsMobile } from "@/hooks/useIsmobile";
import { OrderItemType } from "@/types/order";

type OrderItemCardProps = {
  order: OrderItemType;
};

const OrderItemCard = ({ order }: OrderItemCardProps) => {
  const isMobile = useIsMobile();
  const { images, name, description, categories, subCategories, quantity } =
    order;

  return (
    <div className="bg-muted mb-3 p-4">
      <div className="flex items-center gap-5">
        <img
          src={images[0]}
          alt={name}
          className="size-20 rounded-lg object-cover md:size-30"
        />
        <div className="space-y-3.5">
          <div className="font-bold max-md:text-sm">{name}</div>
          <div className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </div>
          {!isMobile && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <div className="rounded-2xl border-2 px-2.5 py-1 text-xs font-bold">
                  {categories[0]}
                </div>
                <div className="text-muted-foreground">
                  Sub: {subCategories.join(", ")}
                </div>
                <div className="text-muted-foreground">Qty: {quantity}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isMobile && (
        <div className="mt-2 flex items-center gap-4 text-sm">
          <div className="rounded-2xl border-2 px-2.5 py-1 text-xs font-bold">
            {categories[0]}
          </div>
          <div className="text-muted-foreground">
            Sub: {subCategories.join(", ")}
          </div>
          <div className="text-muted-foreground">Qty: {quantity}</div>
        </div>
      )}
    </div>
  );
};

export default OrderItemCard;
