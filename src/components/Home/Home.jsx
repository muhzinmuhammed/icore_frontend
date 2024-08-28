import React, { useState } from 'react';
import { useGetPostDataQuery } from '../../features/api/postAPI/postApi';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(""); // Add state for status filter
  const limit = 8; // Number of posts per page

  const { data, isLoading, isError } = useGetPostDataQuery({ page, limit, search: searchTerm, status });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  if (isLoading) return <p className="text-center mt-5">Loading...</p>;
  if (isError) return <p className="text-center mt-5">Error loading posts.</p>;

  const totalPages = data?.totalPages || 1;

  return (
    <>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center mt-5 px-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="w-full sm:w-auto px-4 py-2 border rounded-lg mb-2 sm:mb-0"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border rounded-lg mb-2 sm:mb-0 sm:ml-2"
        >
          <option value="">All</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
        <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg sm:ml-2">
          Search
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-4 mt-5 p-4">
        {data?.data?.map((card) => (
          <div key={card.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs rounded overflow-hidden shadow-lg">
            <img className="w-full h-48 object-cover" src='https://www.icore.net.in/wp-content/uploads/2021/02/icore_logo-1a.svg' alt={card.title} />
            <div className="px-4 py-3">
              <div className="font-bold text-lg mb-2 truncate">Title{card?.title}</div>
              <p className="text-gray-700 text-sm truncate">Description{card?.content}</p>
              <p className="text-gray-700 text-sm">Author: {card?.userId?.name}</p>
              <p className="text-gray-700 text-sm flex items-center">
                Status: {card.status ? (
                  <img
                    src='https://imgs.search.brave.com/7N7_rq4deyQF6Ky_xPXNnznSKiRg0WOwWUkHR5h6FmY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzE5Lzk5LzQ1/LzM2MF9GXzUxOTk5/NDU0MV9UQUJQS3Va/MVFGa3hvN3VvMzNr/WWEwQ0JMblE1TVVx/Ni5qcGc'
                    width={20}
                    height={20}
                    alt="Published"
                    className="ml-1"
                  />
                ) : <img
                  src='https://imgs.search.brave.com/IxEHsfbGm7VFT_ukurix54CdGPGaQ3nktC_UPujM2hw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzU5LzA1LzU5/LzM2MF9GXzU1OTA1/NTk3MF9IVVZxV3FZ/V1d2MmFDN1FubEk4/VVZrRTJTbnJVa21i/VC5qcGc'
                  width={20}
                  height={20}
                  alt="Unpublished"
                  className="ml-1"
                />}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border rounded-lg ${page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Home;
