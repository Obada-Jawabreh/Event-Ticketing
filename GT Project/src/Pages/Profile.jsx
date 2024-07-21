import { useState, useEffect } from 'react';
import { ref, get, set } from 'firebase/database';
import { db } from './../FirebaseConfig/Config.jsx';
import TicketCard from '../Components/TicketCard.jsx'; // Import TicketCard
import { dbURL } from "../FirebaseConfig/Config";
import MainButton from "../Components/Buttons/MainButton";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purchases, setPurchases] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId) {
      const userRef = ref(db, 'users/' + userId);
      const purchasesRef = ref(db, `purchases/${userId}`);

      // Fetch user data
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(data);
            setName(data.name || '');
            setEmail(data.email || '');
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // Fetch purchases data
      get(purchasesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setPurchases(Object.values(data));
          } else {
            console.log('No purchases available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('User is not logged in');
    }
  }, []);

  const handleSave = () => {
    if (!name || !email) {
      console.error('All fields must be filled');
      return;
    }
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId) {
      const userRef = ref(db, 'users/' + userId);
      set(userRef, {
        name,
        email,
        id: userId,
      })
      .then(() => {
        console.log('Data saved successfully');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSelectTicket = (ticketId) => {
    localStorage.setItem("Event id", JSON.stringify(ticketId));
    navigate("details");
  };

  return (
    <div className="bg-prim-dark min-h-screen flex items-start justify-center">
      <div className="container mx-auto p-4">
        <div className="flex justify-start">
          <div className="bg-custom-red rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 overflow-hidden">
            <div className="bg-prim-dark text-white text-center p-4">
              <img
                src="https://img.icons8.com/bubbles/100/000000/user.png"
                alt="User-Profile-Image"
                className="rounded-full mx-auto mb-4"
              />
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg p-2 mt-1 text-center"
                />
              ) : (
                <h6 className="font-semibold text-xl">{name}</h6>
              )}
              <p>Web Designer</p>
              <button
                className="bg-white text-green-500 rounded-full p-2 mt-4"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
            <div className="p-4">
              <h6 className="text-gray-800 font-semibold mb-4">Information</h6>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 rounded-lg p-2 mt-1"
                  />
                ) : (
                  <p className="text-gray-800">{email}</p>
                )}
              </div>
              {isEditing && (
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 text-white rounded-lg px-4 py-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-100">
              <h6 className="text-gray-800 font-semibold mb-4">Your Purchases</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {purchases.map((purchase) => (
                  <TicketCard
                    key={purchase.event}
                    name={purchase.event.name}
                    startDate={purchase.event.startDate}
                    endDate={purchase.event.endDate}
                    price={purchase.price}
                    eventId={purchase.event.id}
                    img={purchase.event.image}
                    handleSelectTicket={handleSelectTicket}
                  />
                ))}
              </div>
              <ul className="flex space-x-4 mt-4">
                <li>
                  <a href="#!" className="text-gray-600" title="facebook">
                    <i className="mdi mdi-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-gray-600" title="twitter">
                    <i className="mdi mdi-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-gray-600" title="instagram">
                    <i className="mdi mdi-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;








// import { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { ref, get } from 'firebase/database';
// import { db } from './../FirebaseConfig/Config.jsx';  // تأكد من أن المسار صحيح

// const ProfileSettings = () => {
//   const [userData, setUserData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setname] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');

//   useEffect(() => {
//     const userId = JSON.parse(localStorage.getItem("user"));
//     if (userId) {
//       const userRef = ref(db, 'users/' + userId);
//       get(userRef).then((snapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           setUserData(data);
//           setname(data.name);
//           setLastName(data.lastName);
//           setEmail(data.email);
//           setPhone(data.phone);
//         } else {
//           console.log('No data available');
//         }
//       }).catch((error) => {
//         console.error(error);
//       });
//     } else {
//       console.log('User is not logged in');
//     }
//   }, []);

//   const handleSave = () => {
//     // هنا يمكنك تنفيذ وظيفة لحفظ البيانات المحدثة في قاعدة البيانات
//     setIsEditing(false);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   return (
//     <div className="bg-[#1a1a1a] flex items-center justify-center p-6 min-h-screen">
//       <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-3xl">
//         <h2 className="text-white text-2xl font-semibold mb-6">Profile Settings</h2>
//         <div className="flex items-center mb-6">
//           <div className="relative w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center">
//             <img src="https://placehold.co/96x96" alt="Profile Picture" className="rounded-full" />
//             <span className="absolute bottom-0 right-0 bg-[#ff0055] text-white text-xs rounded-full px-2 py-1">Edit</span>
//           </div>
//         </div>
//         <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//           <div className="flex space-x-4">
//             <div className="flex-1">
//               <label className="block text-white mb-2" htmlFor="first-name">First Name</label>
//               <input
//                 type="text"
//                 id="first-name"
//                 value={name}
//                 onChange={(e) => setname(e.target.value)}
//                 className={`w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff0055] ${isEditing ? '' : 'disabled:bg-[#1a1a1a] disabled:text-[#555]'}`}
//                 disabled={!isEditing}
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-white mb-2" htmlFor="last-name">Last Name</label>
//               <input
//                 type="text"
//                 id="last-name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className={`w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff0055] ${isEditing ? '' : 'disabled:bg-[#1a1a1a] disabled:text-[#555]'}`}
//                 disabled={!isEditing}
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-white mb-2" htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff0055] ${isEditing ? '' : 'disabled:bg-[#1a1a1a] disabled:text-[#555]'}`}
//               disabled={!isEditing}
//             />
//           </div>
//           <div>
//             <label className="block text-white mb-2" htmlFor="phone">Phone Number</label>
//             <input
//               type="tel"
//               id="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className={`w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff0055] ${isEditing ? '' : 'disabled:bg-[#1a1a1a] disabled:text-[#555]'}`}
//               disabled={!isEditing}
//             />
//           </div>
//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               className="flex items-center bg-transparent border border-[#ff0055] text-[#ff0055] px-4 py-2 rounded-lg hover:bg-[#ff0055] hover:text-white transition"
//             >
//               <img aria-hidden="true" alt="log-out" src="https://openui.fly.dev/openui/24x24.svg?text=🔓" className="mr-2" />
//               Log Out
//             </button>
//             {isEditing ? (
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 className="bg-[#ff0055] text-white px-4 py-2 rounded-lg hover:bg-[#ff0055] transition"
//               >
//                 Save
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleEditClick}
//                 className="bg-[#ff0055] text-white px-4 py-2 rounded-lg hover:bg-[#ff0055] transition"
//               >
//                 Edit Details
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileSettings;