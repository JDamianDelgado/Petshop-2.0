import Image from "next/image";

interface Product {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface CardsProductProps {
  product: Product;
}

export default function CardsProduct({ product }: CardsProductProps) {
  return (
    <div className="border rounded-lg p-4 m-2 shadow-lg">
      <Image
        src={"/images/next.svg"}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-lg mb-4 object-cover"
      />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
    </div>
  );
}
