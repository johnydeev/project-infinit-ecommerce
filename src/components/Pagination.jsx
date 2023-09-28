export const Pagination = ({ currentPage, vehiclesPerPage, setCurrentPage, totalVehicles }) => {

    const totalPages = Math.ceil(totalVehicles / vehiclesPerPage);

    const maxPagesToShow = 2;

    let startPage = Math.max(currentPage - maxPagesToShow, 1);

    let endPage = Math.min(currentPage + maxPagesToShow, totalPages);

    if (totalPages > maxPagesToShow * 2) {
    
        if (currentPage <= maxPagesToShow) {
        endPage = maxPagesToShow * 2 + 1;
        } 
        else if (currentPage >= totalPages - maxPagesToShow) {
        startPage = totalPages - maxPagesToShow * 2;
        }
    }

    const pageNumber = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumber.push(i);
    }

    function Next() {
        setCurrentPage(currentPage + 1);
    }
    
    function Back() {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg font-[Poppins] flex items-center">
                <button
                onClick={Back}
                className={`h-12 border-2 border-r-0 border-primary px-4 rounded-l-lg hover:bg-primary hover:text-white ${
                    currentPage === 1 ? "cursor-not-allowed opacity-30" : ""
                }`}
                disabled={currentPage === 1}
                >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd">                            
                                </path>
                            </svg>
                </button>
                {
                    pageNumber.map((pg, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(pg)}
                        className={`h-12 border-2 border-r-0 border-primary w-12 ${
                        currentPage === pg && "bg-primary text-white"
                        }`}
                    >
                        {pg} 
                    </button>
                    ))
                    
                }
                
                <button
                onClick={Next}
                className={`h-12 border-2 border-primary px-4 rounded-r-lg hover:bg-primary hover:text-white ${
                    currentPage >= totalPages ? "cursor-not-allowed opacity-30 border-l-0" : ""
                }`}
                disabled={currentPage >= totalPages}
                >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd">                            
                        </path>
                    </svg>
                </button>
                <br />

                
            </div>
            {   
                totalPages > 5 &&
                <p className="h-12 mt-2">Total pages: {totalPages}</p>
            }
        </div>
    );
};
