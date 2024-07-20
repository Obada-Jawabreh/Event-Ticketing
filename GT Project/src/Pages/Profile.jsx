import { useState } from "react";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState('alaa');
  const [lastName, setLastName] = useState('ata');
  const [email, setEmail] = useState('alaa.ata25@gmail.com');
  const [phone, setPhone] = useState('0795925867');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Saved profile:', { firstName, lastName, email, phone });
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-[#1a1a1a] flex items-center justify-center p-6 min-h-screen">
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex items-center mb-6">
          <div className="relative w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center">
            <img
              src="https://placehold.co/150x150"
              alt="Profile"
              className="rounded-full"
            />
            {isEditing && (
              <span className="absolute bottom-0 right-0 bg-[#ff0055] text-white text-xs rounded-full px-2 py-1">
                Change Picture
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={isEditing ? () => setIsEditing(false) : handleEditClick}
            className={`ml-4 px-4 py-2 rounded-lg ${isEditing ? 'bg-transparent border border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055] hover:text-white' : 'bg-[#ff0055] text-white hover:bg-[#ff0055]'}`}
          >
            {isEditing ? "Cancel" : "Edit Details"}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="first-name" className="block text-white mb-2">First Name</label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff0055] ${isEditing ? '' : 'disabled:bg-[#1a1a1a] disabled:text-[#555]'}`}
                disabled={!isEditing}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="last-name" className="block text-white mb-2">Last Name</label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff0055] ${isEditing ? '' : 'disabled:bg-[#1a1a1a] disabled:text-[#555]'}`}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff0055] ${isEditing ? '' : 'disabled:bg-[#1a1a1a] disabled:text-[#555]'}`}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-white mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff0055] ${isEditing ? '' : 'disabled:bg-[#1a1a1a] disabled:text-[#555]'}`}
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <button
              type="submit"
              className="bg-[#ff0055] text-white px-4 py-2 rounded-lg hover:bg-[#ff0055] transition"
            >
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;




// import { useState } from "react";

// const ProfileSettings = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
   
//     console.log('Saved profile:', { firstName, lastName, email, phone });
//     setIsEditing(true);
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
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="flex space-x-4">
//             <div className="flex-1">
//               <label className="block text-white mb-2" htmlFor="first-name">First Name</label>
//               <input
//                 type="text"
//                 id="first-name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
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
//                 type="submit"
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