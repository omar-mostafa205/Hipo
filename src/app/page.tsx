import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import CategoryList from "@/components/Categories";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import FloatingNavbar from "@/components/NavBar";

export default function HomePage() {
  return (
    <div className="h-auto">
      <FloatingNavbar /> 
      <Hero />

      <main className="min-h-screen w-full bg-[#f5f5f5] px-20 py-10">
      <div className='flex flex-col items-start mb-20'>
                    <h1 className='text-xl md:text-2xl font-bold text-gray-900 mb-1'>
                        Featured Products
                    </h1>
                    <p className='text-sm text-gray-600'>
                    Discover our Featured Products — a handpicked selection of our most popular and trending items, combining style, quality, and innovation to elevate your everyday experience.
                         </p>
                </div>
        <Suspense fallback={<p className="text-gray-500">Loading products...</p>}>
          <ProductList categoryId="00000000-000000-000000-000000000001"   searchParams={{ search: "" }} 
 limit={10}/>
        </Suspense>

        <section className="my-30 h-[80vh]">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Categories
          </h1>
      
          <Suspense fallback={<p className="text-gray-500">Loading categories...</p>}>
            <CategoryList categoryId="00000000-000000-000000-000000000001"/>
          </Suspense>
        </section>
      </main>
    </div>
  );
}
