import { useState, useEffect } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { styled } from "styled-components";
import { useFetch } from "../hooks/useFetch";

const TableContainer = styled.div`
  display: flex;
  background: linear-gradient(90deg, rgb(91, 89, 89), rgb(154, 150, 150));
  border-radius: 0.5rem;
  margin: 0.5rem;
  padding: 1rem;
  width: 75rem;

  tr {
    display: table; /* Ensures rows behave like table rows */
    width: 100%; /* Ensures rows take up full width */
    table-layout: fixed; /* Prevents columns from resizing unevenly */
    text-align: center;
    height: 1rem;
  }
`;

const TableHead = styled.thead`
  background: transparent;
  border-radius: 0.5rem;
  position: sticky; /* Keeps the header fixed */

  z-index: 1;
`;
const TableHeadRow = styled.th`
  background: linear-gradient(180deg, black, white);
  border-radius: 0.5rem;
  padding: 1rem;
`;

const TableBody = styled.tbody`
  display: block; /* Makes tbody scrollable */
  max-height: 30rem;
  overflow-y: auto;
  width: 100%;
`;
const TableDataRow = styled.tr`
  border-radius: 0.5rem;
  cursor: pointer;
  color: black;
  background: linear-gradient(180deg, white, white);
  height: 1rem;
  margin-bottom: 1rem;
`;

const TableDataCell = styled.td`
  padding: 10px;
  text-align: left;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
  }

  img:hover {
    transform: scale(1.5, 1.5);
  }
`;
const LoaderErrorContainer = styled.p`
  font-size: 1rem;
  margin: 20 auto;
  color: ${($type) => ($type == "error" ? "red" : "black")};
`;

const Loader = styled.div`
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  color: black;
`;
export default function BasicGrid() {
  const [page, setPage] = useState(1); // Track the current page
  const [data, setData] = useState([]); // Store the list of items
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  // Dynamically construct the URL based on the current page
  const url = `https://fakestoreapi.com/products?limit=5&page=${page}`;

  // Use the useFetch hook to fetch data
  const { data: fetchedData, isLoading, error } = useFetch(url);

  // Append new data to the existing list whenever fetchedData changes
  useEffect(() => {
    if (fetchedData.length > 0) {
      setData((prevData) => [...prevData, ...fetchedData]);
    } else {
      setHasMore(false); // Stop fetching if no more data is returned
    }
  }, [fetchedData]);

  // Fetch data and increment the page
  const fetchData = async () => {
    if (isLoading || !hasMore) return; // Prevent overlapping or unnecessary calls

    setPage((prevPage) => prevPage + 1);
  };

  // Use the useInfiniteScroll hook
  const { observerRef } = useInfiniteScroll({
    fetchDataFn: fetchData, // Increment the page when the observer is triggered
  });

  return (
    <TableContainer>
      <table>
        <TableHead>
          <tr>
            <TableHeadRow>Image</TableHeadRow>
            <TableHeadRow>Title</TableHeadRow>
            <TableHeadRow>Price</TableHeadRow>
            <TableHeadRow>Category</TableHeadRow>
            <TableHeadRow>Rating</TableHeadRow>
          </tr>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableDataRow key={item.id}>
              <TableDataCell>
                <img src={item.image} alt={item.title} />
              </TableDataCell>
              <TableDataCell>{item.title}</TableDataCell>
              <TableDataCell>${item.price}</TableDataCell>
              <TableDataCell>{item.category}</TableDataCell>
              <TableDataCell>
                {item.rating.rate} ({item.rating.count} reviews)
              </TableDataCell>
            </TableDataRow>
          ))}
        </TableBody>
      </table>
      {isLoading && <Loader>Loading more items...</Loader>}
      {error && <Loader>Error: {error}</Loader>}
      <div ref={observerRef}></div> {/* Attach observer */}
    </TableContainer>
  );
}
