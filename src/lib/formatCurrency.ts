export default function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatPrice(
  price: number | string,
  opts: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: opts.currency ?? "USD",
    notation: opts.notation ?? "compact",
  }).format(Number(price));
}

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);

  const formatted = date.toLocaleString("en-US", {
    month: "short", // Jun
    day: "numeric", // 4
    year: "numeric", // 2025
    hour: "2-digit", // 02
    minute: "2-digit", // 19
    hour12: true, // PM format
  });

  return formatted;
};
