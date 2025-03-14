import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/imageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    images,
    price,
    name,
    description,
    "slug": slug.current,
    "categoryName": category->name,
    price_id
    
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: fullProduct = await getData(slug);
  
  // Calculate discount percentage
  const originalPrice = 35.00;
  const discountPercentage = Math.round(((originalPrice - data.price) / originalPrice) * 100);
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Gallery Section */}
            <div className="p-4 md:p-8 bg-white">
              <ImageGallery images={data.images} />
            </div>
            
            {/* Product Details Section */}
            <div className="p-6 md:p-10 flex flex-col">
              {/* Category & Title */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3">
                  {data.categoryName}
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                  {data.name}
                </h1>
              </div>
              
              {/* Ratings */}
              <div className="mb-6 flex items-center gap-3">
                <Button variant="outline" size="sm" className="rounded-full gap-x-1 hover:bg-amber-50 hover:text-amber-600 border-amber-200">
                  <span className="font-medium">4.2</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </Button>
                <span className="text-sm text-gray-500 transition duration-100 hover:text-gray-800">
                  1.2k verified reviews
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${data.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    {discountPercentage}% OFF
                  </span>
                </div>
                
                {/* Shipping Info */}
                <div className="mt-4 flex items-center gap-2 text-gray-700">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm">Free shipping • 2-4 day delivery</span>
                </div>
              </div>
              
              {/* Availability */}
              <div className="mb-6 flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium text-green-600">In Stock and ready to ship</span>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-auto grid grid-cols-2 gap-3">
                <AddToBag currency="USD" description={data.description} price={data.price} image={data.images[0]} name={data.name}  price_id={data.price_id} />
                <CheckoutNow currency="USD" description={data.description} price={data.price} image={data.images[0]} name={data.name}  price_id={data.price_id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}