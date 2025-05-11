/* eslint-disable react-refresh/only-export-components */
import { useCallback, useEffect, useRef , useState} from "react";

export function useInfiniteScroll(fetchDataFn) {

    let observerRef = useRef(null);
    const [isDataFetching , setIsDatfetching] = useState(false);
 
    useEffect(() => {
        const interSectionObserver = new IntersectionObserver(
            (entries) =>{
                // Get the first observed entry
                const target = entries[0];
                if(target.isIntersecting && !isDataFetching){
                    // Start fetching data when the target is visible
                    setIsDatfetching(true);
                }
            },  {
                threshold: 0, // Trigger when 50% of the element is visible
                rootMargin: "100px", // Trigger slightly before the element enters the viewport
              }
        );

        const currentRef = observerRef.current;
        if(currentRef) {
            interSectionObserver.observe(currentRef); // Start observing the target element
        }

        return () => {
            if(currentRef) {
                interSectionObserver.unobserve(currentRef); // Cleanup: Stop observing on unmount
            }
        }
    })

    useEffect(() => {
        if(isDataFetching) {
          fetchDataFn().finally(() => setIsDatfetching(false))
        }
    },[fetchDataFn, isDataFetching]) ;

    return {isDataFetching, observerRef}
}



export function InfiniteScrollComponent() {
    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  
    const fetchMoreData = useCallback(async () => {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 20 }, (_, i) => prevItems.length + i + 1),
      ]);
    }, []);
  
    const { observerRef, isDataFetching } = useInfiniteScroll(fetchMoreData);
  
    return (
      <div>
        <ul>
          {items.map((item) => (
            <li key={item}>Item {item}</li>
          ))}
        </ul>
        <div ref={observerRef} style={{ height: "50px", background: "lightgray" }}>
          {isDataFetching && <p>Loading more items...</p>}
        </div>
      </div>
    );
  }

