import { useEffect, useState, useRef } from "react";
import { debounce } from "../../hooks/Debounce";
import { DUMMY_PRODUCTS } from "../store/dummy-product";
import ProductCard from "./ProductCard";

export default function ProductScreen() {
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 3;
  const totalPages = Math.ceil(DUMMY_PRODUCTS.length / limit);

  // Function to load content
  const loadContent = () => {
    if (page > totalPages) {
      setHasMore(false);
      return;
    }

    setLoading(true);

    timerRef.current = setTimeout(() => {
      const start = page * limit;
      const end = start + limit;
      const newProducts = DUMMY_PRODUCTS.slice(start, end);

      if(newProducts.length == 0) {
        setHasMore(false);
        setLoading(false);
        clearTimeout(timerRef.current);
        return;
      }
      

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  // Handle scroll event
  const handleScroll = debounce(() => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadContent();
    }
  }, 200);

  // Initial content load
  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attach scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className="products-screen"
      ref={containerRef}
    >
      <div className="products">
        {products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more products to load.</div>}
    </div>
  );
}
