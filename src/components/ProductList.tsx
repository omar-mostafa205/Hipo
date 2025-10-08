/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { wixClientServer } from '@/lib/wixClientServer';
import Image from 'next/image';
import { Button } from './ui/button';
import type { products } from '@wix/stores';
import { Suspense } from 'react';
import Link from 'next/link';


const ProductList = async (  
    {categoryId,
    searchParams,
    limit,
  }: {
    categoryId: string;
    searchParams: any;
    limit: number;
  }) => {
    try {
        const wixServer = await wixClientServer();
        const params = await searchParams;

        let productQuery = wixServer.products.queryProducts();
        
        if (categoryId) {
          productQuery = productQuery.hasSome("collectionIds", [categoryId]);
        }
        
        productQuery = productQuery
          .gt("priceData.price", Number(params?.min) || 0)
          .lt("priceData.price", Number(params?.max) || 999999);
        
        if (params?.sort) {
          const [sortType, sortBy] = params.sort.split(" ");
          if (sortType === "asc") productQuery = productQuery.ascending(sortBy);
          if (sortType === "desc") productQuery = productQuery.descending(sortBy);
        }
        
const { items } = await productQuery.find();

        if (!items) {
            return (
                <div className='max-w-7xl mx-auto px-4'>
                    <p className="text-gray-500">No products found</p>
                </div>
            );
        }
        return (
            <div className='max-w-7xl mx-auto px-4'>
     
                        <Suspense fallback={<p className="text-gray-500">Loading products...</p>}>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                    {items?.map((product : products.Product) => (
                        <div 
                            key={product._id} 
                            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            {/* Image Container */}
                            <Link href={`/${product.slug}`} className='relative h-20 overflow-hidden'>
                            
                                <Image 
                                    src={product.media?.mainMedia?.image?.url || "/shoe.png"}
                                    alt={product.name || "Product"} 
                                    className="w-full h-[340px]  group-hover:scale-105 transition-transform duration-300" 
                                    width={200} 
                                    height={200}
                                />
                            </Link>

                            {/* Content Container */}
                            <div className='p-4 flex flex-col h-55'>
                                {/* Title and Price */}
                                <div className='flex-1 mb-3'>
                                    <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight mb-2 min-h-[2.5rem]">
                                        {product.name}
                                    </h2>
                                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Price and Button */}
                                <div className='mt-auto'>
                                    <div className='flex items-center justify-between mb-3'>
                                        <span className="text-xl font-bold text-black">
                                            ${product.price?.price ? Number(product.price.price).toFixed(2) : '0.00'}
                                        </span>
                                    </div>
                                    
                                    <Button 
                                        className='w-full bg-primary text-white border-0 rounded-lg mb-4 text-sm font-medium transition-colors duration-200' 
                                        variant="default"
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </Suspense>
            </div>
        );

    } catch (error) {
        console.error('Error fetching products:', error);
        
        // Return error UI
        return (
            <div className='max-w-7xl mx-auto px-4 py-8 text-center'>
                <p className='text-red-500 text-lg'>Failed to fetch products</p>
                <p className='text-gray-600'>Please try again later</p>
            </div>
        );
    }
};

export default ProductList;