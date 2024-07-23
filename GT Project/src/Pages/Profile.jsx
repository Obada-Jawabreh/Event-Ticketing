import { useState, useEffect } from "react";
import axios from "axios";
import { dbURL } from "../FirebaseConfig/Config";
import PurchaseCard from "../Components/PurchaseCard.jsx"; // Updated import
import { useNavigate } from "react-router-dom";
import hero4 from "../images/4.png";

const ProfileSettings = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purchases, setPurchases] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"));
    if (userId) {
      const fetchUserData = async () => {
        try {
          const userResponse = await axios.get(`${dbURL}/users/${userId}.json`);
          if (userResponse.data) {
            const data = userResponse.data;
            setUserData(data);
            setName(data.name || "");
            setEmail(data.email || "");


            if (data.Purchases) {
              const userPurchases = Object.values(data.Purchases).map(purchase => {
                return {
                  event: purchase.event,
                  price: purchase.price,
                  tickets: purchase.tickets
                };
              });
              setPurchases(userPurchases);
            }
          } else {
            console.log("No data available");

          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchUserData();
    } else {
      console.log("User is not logged in");
    }
  }, []);

  const handleSave = async () => {
    if (!name || !email) {
      console.error("All fields must be filled");
      return;
    }
    const userId = JSON.parse(localStorage.getItem("user"));
    if (userId) {
      try {
        await axios.put(`${dbURL}/users/${userId}.json`, {
          name,
          email,
          id: userId,
        });
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-gradient-to-r bg-prim-dark via-indigo-1000 min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto p-6">
        <div className="bg-gray-800 rounded-lg shadow-2xl w-full md:w-2/3 lg:w-1/2 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 bg-custom-red text-white text-center p-8">
            <img
              alt=""
              className="self-center w-32 h-32 mb-4 bg-center bg-cover rounded-full border-4 border-white"
              src={hero4}
            />
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 rounded-lg p-3 mt-2 text-white text-center shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <h2 className="font-bold text-3xl">{name}</h2>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-purple-500 text-white rounded-lg p-3 px-6 hover:bg-purple-600 transition-colors duration-300"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>

          <div className="p-8">
            <h4 className="text-white font-bold mb-5 text-2xl">Your Information:</h4>
            <div className="mb-5">
              <p className="text-white font-medium">Email</p>

              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 rounded-lg p-3 mt-2 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <p className="text-white">{email}</p>
              )}
            </div>
            {isEditing && (
              <div className="flex justify-end">
                <button
                  className="bg-purple-500 text-white rounded-lg px-5 py-3 hover:bg-purple-600 transition-colors duration-300"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="p-8 bg-gray-900">
            <h4 className="text-white font-bold mb-5 text-xl">Your Purchases</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases.map((purchase, index) => (
                <PurchaseCard
                  key={index}
                  event={purchase.event}
                  price={purchase.price}
                  tickets={purchase.tickets}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;


















// import { useState, useEffect } from "react";
// import axios from "axios";
// import { dbURL } from "../FirebaseConfig/Config";
// import TicketCard from "../Components/TicketCard.jsx";
// import { useNavigate } from "react-router-dom";
// import hero4 from "../images/4.png";

// const ProfileSettings = () => {
//   const [userData, setUserData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [Purchases, setPurchases] = useState([]);
//   console.log(Purchases);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = JSON.parse(localStorage.getItem("user"));
//     console.log(userId);
//     if (userId) {
//       const fetchUserData = async () => {
//         try {
//           // Fetch user data
//           const userResponse = await axios.get(`${dbURL}/users/${userId}.json`);
//           if (userResponse.data) {
//             const data = userResponse.data;
//             setUserData(data);
//             setName(data.name || "");
//             setEmail(data.email || "");
//           } else {
//             console.log("No user data available");
//           }

//           // Fetch user purchases
//           const purchasesResponse = await axios.get(
//             `${dbURL}/users/Purchases/${userId}.json`
//           );
//           if (purchasesResponse.data) {
//             const data = purchasesResponse.data;
//             setPurchases(Object.values(data));
//             console.log("Purchases: ", Object.values(data)); // Log purchase data
//           } else {
//             console.log("No purchases available");
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       fetchUserData();
//     } else {
//       console.log("User is not logged in");
//     }
//   }, []);

//   const handleSave = async () => {
//     if (!name || !email) {
//       console.error("All fields must be filled");
//       return;
//     }
//     const userId = JSON.parse(localStorage.getItem("user"));
//     if (userId) {
//       try {
//         await axios.put(`${dbURL}/users/${userId}.json`, {
//           name,
//           email,
//           id: userId,
//         });
//         console.log("Data saved successfully");
//       } catch (error) {
//         console.error("Error saving data:", error);
//       }
//     }
//     setIsEditing(false);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSelectTicket = (ticketId) => {
//     localStorage.setItem("Event id", JSON.stringify(ticketId));
//     navigate("details");
//   };

//   return (
//     <div className="bg-prim-dark min-h-screen flex items-start justify-center py-8">
//       <div className="container mx-auto p-4">
//         <div className="bg-second-dark rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 overflow-hidden">
//           <div className="bg-prim-dark text-white text-center p-6">
//             <img
//               alt=""
//               className="self-center w-24 h-24 mb-4 bg-center bg-cover rounded-full"
//               src={hero4}
//             />
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full bg-[#C141F8] rounded-lg p-2 mt-1 text-slate-950 text-center"
//               />
//             ) : (
//               <h2 className="font-semibold text-2xl">{name}</h2>
//             )}
//           </div>
//           <div className="flex justify-center mt-4">
//             <button
//               className="bg-[#C141F8] text-white rounded-lg p-2 px-4"
//               onClick={handleEditClick}
//             >
//               Edit
//             </button>
//           </div>
//           <div className="p-6">
//             <h4 className="text-white font-semibold mb-4 text-xl">
//               Your Information:
//             </h4>
//             <div className="mb-4">
//               <p className="text-white font-semibold">Email</p>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full bg-[#C141F8] rounded-lg p-2 mt-1"
//                 />
//               ) : (
//                 <p className="text-white">{email}</p>
//               )}
//             </div>
//             {isEditing && (
//               <div className="flex justify-end">
//                 <button
//                   className="bg-[#C141F8] text-white rounded-lg px-4 py-2"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="p-6 bg-prim-dark">
//             <h4 className="text-white font-semibold mb-4">Your Purchases</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {Purchases ? (
//                 Purchases.map((Purchases) => (
//                   <TicketCard
//                     key={Purchases.event.id}
//                     name={Purchases.event.name}
//                     startDate={Purchases.event.startDate}
//                     endDate={Purchases.event.endDate}
//                     price={Purchases.price}
//                     eventId={Purchases.event.id}
//                     img={Purchases.event.image}
//                     handleSelectTicket={handleSelectTicket}
//                   />
//                 ))
//               ) : (
//                 <p className="text-white">No purchases found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileSettings;
