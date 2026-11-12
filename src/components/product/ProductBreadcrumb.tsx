import { useShop } from "../../context/ShopContext";
import type { BackendProduct } from "../../services/productApi";

export interface ProductBreadcrumbProps {
  product?: BackendProduct | { name: string; category?: string };
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps = {}) {
  const { selectedProduct } = useShop();
  const currentProduct = product || selectedProduct;

  return (
    <nav aria-label="Breadcrumb" className="w-full border-b border-[#F0F3EC] bg-white py-3.5">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-[#718073]">
          <li>
            <a
              href="/"
              className="flex items-center gap-1 font-medium transition hover:text-[#06452E]"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5 text-[#8EA091]"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li className="text-[#A2B1A5]" aria-hidden="true">
            /
          </li>
          <li>
            <a
              href="/plants"
              className="font-medium transition hover:text-[#06452E]"
            >
              Plants
            </a>
          </li>
          {currentProduct.category && (
            <>
              <li className="text-[#A2B1A5]" aria-hidden="true">
                /
              </li>
              <li>
                <span className="font-medium text-[#718073]">
                  {currentProduct.category}
                </span>
              </li>
            </>
          )}
          <li className="text-[#A2B1A5]" aria-hidden="true">
            /
          </li>
          <li className="font-semibold text-[#18382B]" aria-current="page">
            {currentProduct.name}
          </li>
        </ol>
      </div>
    </nav>
  );
}
