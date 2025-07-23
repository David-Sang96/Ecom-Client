import { useState } from "react";

const ProductImageLoader = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-square w-full overflow-hidden rounded-tl-xl rounded-tr-xl bg-gray-100">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-contain transition duration-500 ease-in-out group-hover:scale-105 ${loaded ? "blur-0" : "blur-sm"} `}
      />
    </div>
  );
};

export default ProductImageLoader;
