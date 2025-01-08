// import { useDispatch, useSelector } from "react-redux";
// import { useEffect ,useState} from "react";
// import { Link } from "react-router-dom";
// import {
//   deleteSingleAuctionById,
//   getSellerAuction,
//   reset,
// } from "../store/auction/auctionSlice";
// import { FaEye } from "react-icons/fa";
// import { FaRegEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import { toast } from "react-toastify";
// import Loading from "./Loading"
// import Pagination from "./Pagination";
// const ManageItems = () => {
//   const dispatch = useDispatch();
//   const { sellerAuction, isLoading } = useSelector((state) => state.auction);

//   // componentDidMount and component
//   useEffect(() => {
//     dispatch(getSellerAuction());
//   }, [dispatch]);
//   //console.log(sellerAuction, "sellerAuction....");

//   const handleDeleteAuction = async (id) => {
//     //console.log(id, "delete id....");
//     await dispatch(deleteSingleAuctionById(id)).then(() => {
//       toast.success("item deleted.", {
//         autoClose: 500,
//       });
//     });
//     dispatch(getSellerAuction());
//   };

//    //pagination part
//    const [currentPage, setCurrentPage] = useState(1)
//    const [itemsPerPage, setitemsPerPage] = useState(6)
//    const indexOfLastItem = currentPage * itemsPerPage;
//    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//    const currentItems = sellerAuction?.auctions?.slice(indexOfFirstItem, indexOfLastItem);
//    console.log(currentItems, "currentItems....");
 
//    const paginate = (pageNumber) => {
//      setCurrentPage(pageNumber)
//    }
//    const prevPage = () => {
//      setCurrentPage(currentPage-1)
//    }
//    const nextPage = () => {
//      setCurrentPage(currentPage+1)
//    }


//    const [currentPage2, setCurrentPage2] = useState(1)
//     const [itemsPerPage2, setitemsPerPage2] = useState(6)
//     const indexOfLastItem2 = currentPage2 * itemsPerPage2;
//     const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
//     const currentItems2 = sellerAuction?.auctions?.slice(indexOfFirstItem2, indexOfLastItem2);

//     const paginate2 = (pageNumber) => {
//       setCurrentPage2(pageNumber)
//     }
//     const prevPage2 = () => {
//       setCurrentPage2(currentPage2-1)
//     }
//     const nextPage2 = () => {
//       setCurrentPage2(currentPage2+1)
//     }



//   return (

//     <>
//     <div>
//     <div className=" overflow-auto px-7 py-4 w-full bg-theme-bg text-white rounded-2xl ">
//       <h2 className=" text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">
//         Manage Items
//       </h2>
//       <div className=" overflow-auto px-4 bg-theme-bg2 rounded-2xl  border border-border-info-color">
//         <table className="text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4">
//           <thead className="table-header-group ">
//             <tr className="table-row bg-theme-color [&_th]:table-cell [&_th]:pl-5 [&_th]:pr-3 [&_th]:py-3">
//               <th className="rounded-l-lg ">Product</th>
//               <th>Catagory</th>
//               <th>Bids</th>
//               <th>Status</th>
//               <th>Your Bid</th>
//               <th>Winner</th>

//               <th className="rounded-r-lg">Action</th>
//             </tr>
//           </thead>
          
//           <tbody className="table-row-group">
//             {sellerAuction?.auctions?.length === 0 ? (
//               <tr className="table-row bg-theme-bg ">
//                 <td colSpan="7" className="text-center m-2 w-full p-10 h-[400px]">No Item</td>
//               </tr>
//             ) : (
//               isLoading ? <tr>
//                 <td colSpan="7" className="text-center">
//                   <Loading width="sidebar"/>
//                 </td>
//               </tr> : currentItems?.filter((auction) => auction.startTime && auction.endTime).map((auction) => (
                
//                 <tr
//                   key={auction?._id}
//                   className="table-row bg-theme-bg [&_td]:table-cell [&_td]:pl-5 [&_td]:pr-3 [&_td]:py-3"
//                 >
//                   <td className="rounded-l-lg">
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={auction?.image}
//                         alt="auction image"
//                         className="w-[50px] h-[50px] rounded-full"
//                       />
//                       <span className="pr-10">{auction?.name}</span>
//                     </div>
//                   </td>
//                   <td>
//                     <span>{auction?.category?.name || "---"}</span>
//                   </td>
//                   <td>
//                     <span>{auction?.bids?.length}</span>
//                   </td>
//                   <td className="capitalize">
//                     <span className="px-3 py-1 rounded-full text-sm border bg-theme-bg2 border-border-info-color">
//                       {auction?.status}
//                     </span>
//                   </td>
//                   <td>
//                     <span>{auction?.startingPrice}</span>
//                   </td>
//                   <td>
//                     <span>{auction?.winner?.bidder?.fullName || "----"}</span>
//                   </td>
//                   <td className="link:mr-2 capitalize rounded-r-lg">
//                     <Link
//                       className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color  px-2 py-[5px] transition-all"
//                       to={`/single-auction-detail/${auction?._id}`}
//                     >
//                       <FaEye size={16} className="inline mt-[-2px]" />
//                     </Link>
//                     {auction?.status === "upcoming" && (
//                       <>
//                         <Link
//                           className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color  px-2 py-[5px] transition-all"
//                           to={`/edit-auction/${auction?._id}`}
//                         >
//                           <FaRegEdit size={16} className="inline mt-[-3px]" />
//                         </Link>
//                       </>
//                     )}

//                     <button
//                       className="text-color-danger hover:text-white hover:bg-color-danger rounded-lg border-2 border-color-danger  px-[6px] py-[3px] transition-all"
//                       onClick={() => handleDeleteAuction(auction?._id)}
//                     >
//                       <MdDeleteForever
//                         size={20}
//                         className=" inline mt-[-3px]"
//                       />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//         { sellerAuction?.auctions?.length ===0 ? <></> :<Pagination totalPosts={sellerAuction?.auctions?.length} postsPerPage={itemsPerPage} 
//         paginate={paginate}
//         currentPage={currentPage}
//         nextPage={nextPage}
//         prevPage={prevPage}
//         />}
//     </div>
//     </div>


// <div>

//     <div className=" overflow-auto px-7 py-4 w-full bg-theme-bg text-white rounded-2xl ">
//       <h2 className=" text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">
//         Manage Items
//       </h2>
//       <div className=" overflow-auto px-4 bg-theme-bg2 rounded-2xl  border border-border-info-color">
//         <table className="text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4">
//           <thead className="table-header-group ">
//             <tr className="table-row bg-theme-color [&_th]:table-cell [&_th]:pl-5 [&_th]:pr-3 [&_th]:py-3">
//               <th className="rounded-l-lg ">Product</th>
//               <th>Catagory</th>
//               <th>Bids</th>
//               <th>Status</th>
//               <th>Your Bid</th>
//               <th>Winner</th>

//               <th className="rounded-r-lg">Action</th>
//             </tr>
//           </thead>
          
//           <tbody className="table-row-group">
//             {sellerAuction?.auctions?.length === 0 ? (
//               <tr className="table-row bg-theme-bg ">
//                 <td colSpan="7" className="text-center m-2 w-full p-10 h-[400px]">No Item</td>
//               </tr>
//             ) : (
//               isLoading ? <tr>
//                 <td colSpan="7" className="text-center">
//                   <Loading width="sidebar"/>
//                 </td>
//               </tr> : currentItems?.filter((auction) => !auction.startTime && !auction.endTime).map((auction) => (
                
//                 <tr
//                   key={auction?._id}
//                   className="table-row bg-theme-bg [&_td]:table-cell [&_td]:pl-5 [&_td]:pr-3 [&_td]:py-3"
//                 >
//                   <td className="rounded-l-lg">
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={auction?.image}
//                         alt="auction image"
//                         className="w-[50px] h-[50px] rounded-full"
//                       />
//                       <span className="pr-10">{auction?.name}</span>
//                     </div>
//                   </td>
//                   <td>
//                     <span>{auction?.category?.name || "---"}</span>
//                   </td>
//                   <td>
//                     <span>{auction?.bids?.length}</span>
//                   </td>
//                   <td className="capitalize">
//                     <span className="px-3 py-1 rounded-full text-sm border bg-theme-bg2 border-border-info-color">
//                       {auction?.status}
//                     </span>
//                   </td>
//                   <td>
//                     <span>{auction?.startingPrice}</span>
//                   </td>
//                   <td>
//                     <span>{auction?.winner?.bidder?.fullName || "----"}</span>
//                   </td>
//                   <td className="link:mr-2 capitalize rounded-r-lg">
//                     <Link
//                       className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color  px-2 py-[5px] transition-all"
//                       to={`/single-auction-detail/${auction?._id}`}
//                     >
//                       <FaEye size={16} className="inline mt-[-2px]" />
//                     </Link>
//                     {auction?.status === "upcoming" && (
//                       <>
//                         <Link
//                           className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color  px-2 py-[5px] transition-all"
//                           to={`/edit-auction/${auction?._id}`}
//                         >
//                           <FaRegEdit size={16} className="inline mt-[-3px]" />
//                         </Link>
//                       </>
//                     )}

//                     <button
//                       className="text-color-danger hover:text-white hover:bg-color-danger rounded-lg border-2 border-color-danger  px-[6px] py-[3px] transition-all"
//                       onClick={() => handleDeleteAuction(auction?._id)}
//                     >
//                       <MdDeleteForever
//                         size={20}
//                         className=" inline mt-[-3px]"
//                       />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//         { sellerAuction?.auctions?.length ===0 ? <></> :<Pagination totalPosts={sellerAuction?.auctions?.length} postsPerPage={itemsPerPage} 
//         paginate={paginate2}
//         currentPage={currentPage}
//         nextPage={nextPage2}
//         prevPage={prevPage2}
//         />}
//     </div>

// </div>

    

//     </>


//   );
// };

// export default ManageItems;


import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteSingleAuctionById,
  getSellerAuction,
  reset,
} from "../store/auction/auctionSlice";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "./Loading";
import Pagination from "./Pagination";

const ManageItems = () => {
  const dispatch = useDispatch();
  const { sellerAuction, isLoading } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(getSellerAuction());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleDeleteAuction = async (id) => {
    await dispatch(deleteSingleAuctionById(id)).then(() => {
      toast.success("Item deleted.", { autoClose: 500 });
    });
    dispatch(getSellerAuction());
  };

  // Pagination for auctions with start and end times
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sellerAuction?.auctions
    ?.filter((auction) => auction.startTime && auction.endTime)
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  // Pagination for auctions without start and end times
  const [currentPage2, setCurrentPage2] = useState(1);
  const itemsPerPage2 = 6;
  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
  const currentItems2 = sellerAuction?.auctions
    ?.filter((auction) => !auction.startTime && !auction.endTime)
    .slice(indexOfFirstItem2, indexOfLastItem2);

  const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);
  const nextPage2 = () => setCurrentPage2(currentPage2 + 1);
  const prevPage2 = () => setCurrentPage2(currentPage2 - 1);

  return (
    <>
      {/* Section for auctions with start and end times */}
      <div className="overflow-auto px-7 py-4 w-full bg-theme-bg text-white rounded-2xl">
        <h2 className="text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5">
          Manage Auctions
        </h2>
        <div className="overflow-auto px-4 bg-theme-bg2 rounded-2xl border border-border-info-color">
          <table className="text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4">
            <thead className="bg-theme-color">
              <tr>
                <th className="rounded-l-lg pl-5 pr-3 py-3">Product</th>
                <th>Category</th>
                <th>Bids</th>
                <th>Status</th>
                <th>Your Bid</th>
                <th>Winner</th>
                <th className="rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {sellerAuction?.auctions?.length === 0 ? (
                <tr className="bg-theme-bg">
                  <td colSpan="7" className="text-center p-10 h-[400px]">
                    No Item
                  </td>
                </tr>
              ) : isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <Loading width="sidebar" />
                  </td>
                </tr>
              ) : (
                currentItems?.map((auction) => (
                  <tr key={auction?._id} className="bg-theme-bg">
                    <td className="rounded-l-lg pl-5 pr-3 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={auction?.image}
                          alt="auction"
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <span className="pr-10">{auction?.name}</span>
                      </div>
                    </td>
                    <td>{auction?.category?.name || "---"}</td>
                    <td>{auction?.bids?.length}</td>
                    <td className="capitalize">
                      <span className="px-3 py-1 rounded-full text-sm border bg-theme-bg2 border-border-info-color">
                        {auction?.status}
                      </span>
                    </td>
                    <td>{auction?.startingPrice}</td>
                    <td>{auction?.winner?.bidder?.fullName || "----"}</td>
                    <td className="rounded-r-lg flex gap-2">
                      <Link
                        to={`/single-auction-detail/${auction?._id}`}
                        className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color px-2 py-[5px] transition-all flex items-center"
                      >
                        <FaEye size={16} />
                      </Link>
                      {auction?.status === "upcoming" && (
                        <Link
                          to={`/edit-auction/${auction?._id}`}
                          className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color px-2 py-[5px] transition-all flex items-center"
                        >
                          <FaRegEdit size={16} />
                        </Link>
                      )}
                      <button
                        onClick={() => handleDeleteAuction(auction?._id)}
                        className="text-color-danger hover:text-white hover:bg-color-danger rounded-lg border-2 border-color-danger px-[6px] py-[3px] transition-all flex items-center"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {sellerAuction?.auctions?.length > 0 && (
          <Pagination
            totalPosts={sellerAuction?.auctions?.filter(
              (auction) => auction.startTime && auction.endTime
            ).length}
            postsPerPage={itemsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
      </div>

      {/* Section for auctions without start and end times */}
      <div className="overflow-auto px-7 py-4 w-full bg-theme-bg text-white rounded-2xl">
        <h2 className="text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5">
          Manage products
        </h2>
        <div className="overflow-auto px-4 bg-theme-bg2 rounded-2xl border border-border-info-color">
          <table className="text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4">
            <thead className="bg-theme-color">
              <tr>
                <th className="rounded-l-lg pl-5 pr-3 py-3">Product</th>
                <th>Category</th>
                <th>Status</th>
                <th>Price</th>
                <th className="rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {sellerAuction?.auctions?.length === 0 ? (
                <tr className="bg-theme-bg">
                  <td colSpan="7" className="text-center p-10 h-[400px]">
                    No Item
                  </td>
                </tr>
              ) : isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <Loading width="sidebar" />
                  </td>
                </tr>
              ) : (
                currentItems2?.map((auction) => (
                  <tr key={auction?._id} className="bg-theme-bg">
                    <td className="rounded-l-lg pl-5 pr-3 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={auction?.image}
                          alt="auction"
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <span className="pr-10">{auction?.name}</span>
                      </div>
                    </td>
                    <td>{auction?.category?.name || "---"}</td>
                    {/* <td>{auction?.bids?.length}</td> */}
                    <td className="capitalize">
                      <span className="px-3 py-1 rounded-full text-sm border bg-theme-bg2 border-border-info-color">
                        {auction?.status}
                      </span>
                    </td>
                    <td>{auction?.startingPrice}</td>
                    {/* <td>{auction?.winner?.bidder?.fullName || "----"}</td> */}
                    <td className="rounded-r-lg flex gap-2">
                      <Link
                        to={`/single-auction-detail/${auction?._id}`}
                        className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color px-2 py-[5px] transition-all flex items-center"
                      >
                        <FaEye size={16} />
                      </Link>
                      {auction?.status === "upcoming" && (
                        <Link
                          to={`/edit-auction/${auction?._id}`}
                          className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color px-2 py-[5px] transition-all flex items-center"
                        >
                          <FaRegEdit size={16} />
                        </Link>
                      )}
                      <button
                        onClick={() => handleDeleteAuction(auction?._id)}
                        className="text-color-danger hover:text-white hover:bg-color-danger rounded-lg border-2 border-color-danger px-[6px] py-[3px] transition-all flex items-center"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {sellerAuction?.auctions?.length > 0 && (
          <Pagination
            totalPosts={sellerAuction?.auctions?.filter(
              (auction) => !auction.startTime && !auction.endTime
            ).length}
            postsPerPage={itemsPerPage2}
            paginate={paginate2}
            currentPage={currentPage2}
            nextPage={nextPage2}
            prevPage={prevPage2}
          />
        )}
      </div>
    </>
  );
};

export default ManageItems;
