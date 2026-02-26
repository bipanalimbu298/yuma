import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import {
  allProducts,
  getNewArrivals,
  getOnSale,
  getRelatedProducts,
} from "@/lib/data/products";
import { reviewsData } from "@/lib/data/reviews";

const newArrivalsData = getNewArrivals().length > 0 ? getNewArrivals() : allProducts.slice(0, 4);
const topSellingData = getOnSale().length > 0 ? getOnSale() : allProducts.slice(4, 8);
const relatedProductData = getRelatedProducts(allProducts[0], 4);

export default function Home() {
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop?new=1"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop?sale=1"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
