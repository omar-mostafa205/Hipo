import React from 'react';
import { wixClientServer } from '@/lib/wixClientServer';
import Image from 'next/image';
import ProductInfo from '@/components/ProductInfo';
export default async function ProductPage({ params }: { params: { slug: string  } }) {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug" , params.slug)
    .find();

  const product = products.items[0];
  console.log();

  if (!product) {
    return <div>Product not found</div>;

  }

  return (
    <div className='max-w-7xl mx-auto pt-30 py-7'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <div>
          <Image src={product.media?.mainMedia?.image?.url} alt={product.name} width={600} height={600}
          className='rounded-xl' />
        </div>

        <ProductInfo product={product}/>
          
    </div>
    </div>
  );
}
