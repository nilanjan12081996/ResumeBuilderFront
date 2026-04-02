'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, getProfile, updateProfile } from "../reducers/AuthSlice";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { SlEnvolope } from "react-icons/sl";
import { MdOutlinePerson, MdLockOutline, MdOutlineEmail, MdCheckCircle } from "react-icons/md";

const page = () => {
  const { profileData } = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    watch,
    formState: { errors: errors1 },
  } = useForm();

  const password = watch("new_pass");

  useEffect(() => {
    setValue("fullname", profileData?.data?.fullname);
    setValue("phone", profileData?.data?.phone);
    setValue("email", profileData?.data?.email);
  }, [profileData]);

  const onSubmit = (data) => {
    const payload = { fullname: data?.fullname, phone: data?.phone, appId: 1,};
    dispatch(updateProfile(payload)).then((res) => {
      if (res?.payload?.status_code === 200) {
        toast.success(res?.payload?.message);
        dispatch(getProfile());
      }
    });
  };

  const onSubmitPass = (data) => {
       const payload = {
            ...data,
            appId: 1,
        };
    dispatch(changePassword(payload)).then((res) => {
      if (res?.payload?.status_code === 200) {
        toast.success(res?.payload?.message);
      } else if (res?.payload?.response?.data?.status_code === 422) {
        toast.error(res?.payload?.response?.data?.message);
      }
    });
  };

  const initials = profileData?.data?.fullname
    ? profileData.data.fullname.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const tabs = [
    { id: "profile", label: "Profile", icon: MdOutlinePerson },
    { id: "security", label: "Security", icon: MdLockOutline },
    { id: "email", label: "Email", icon: MdOutlineEmail },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .acc-root * { box-sizing: border-box; }

        .acc-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f5f3ef;
          padding: 32px 24px;
        }

        .acc-header {
          margin-bottom: 32px;
        }

        .acc-header h1 {
          font-family: 'Instrument Serif', serif;
          font-size: 36px;
          font-weight: 400;
          color: #1a1713;
          line-height: 1.1;
          margin: 0 0 6px;
        }

        .acc-header p {
          font-size: 14px;
          color: #8a8680;
          font-weight: 400;
          margin: 0;
        }

        .acc-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 20px;
          max-width: 960px;
        }

        @media (max-width: 768px) {
          .acc-layout { grid-template-columns: 1fr; }
        }

        /* Sidebar */
        .acc-sidebar {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .acc-profile-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px 20px;
          margin-bottom: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 1px solid #ece9e2;
        }

        .acc-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4a004d 0%, #7f0082 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Instrument Serif', serif;
          font-size: 26px;
          color: #fff;
          margin-bottom: 14px;
          flex-shrink: 0;
        }

        .acc-profile-name {
          font-size: 16px;
          font-weight: 500;
          color: #1a1713;
          margin: 0 0 4px;
        }

        .acc-profile-email {
          font-size: 13px;
          color: #9a9690;
          margin: 0 0 12px;
        }

        .acc-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #f0faf4;
          color: #2d7a4f;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid #c3e8d2;
        }

        .acc-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 400;
          color: #6b6760;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: all 0.18s ease;
        }

        .acc-tab-btn:hover {
          background: #eceae4;
          color: #1a1713;
        }

        .acc-tab-btn.active {
          background: #7f0082;
          color: #fff;
          font-weight: 500;
        }

        .acc-tab-btn svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          opacity: 0.7;
        }

        .acc-tab-btn.active svg { opacity: 1; }

        /* Main content */
        .acc-main {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .acc-card {
          background: #fff;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid #ece9e2;
        }

        .acc-card-title {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          font-weight: 400;
          color: #1a1713;
          margin: 0 0 6px;
        }

        .acc-card-sub {
          font-size: 13px;
          color: #9a9690;
          margin: 0 0 24px;
        }

        .acc-divider {
          height: 1px;
          background: #ece9e2;
          margin: 20px 0;
        }

        /* Form fields */
        .acc-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .acc-field label {
          font-size: 12px;
          font-weight: 500;
          color: #8a8680;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .acc-field input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1a1713;
          background: #faf9f7;
          border: 1.5px solid #ece9e2;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .acc-field input:focus {
          border-color: #7f0082;
          box-shadow: 0 0 0 4px rgba(127, 0, 130, 0.08);
          background: #fff;
        }

        .acc-field input[readonly] {
          background: #f5f3ef;
          color: #b0aca6;
          cursor: not-allowed;
          border-style: dashed;
        }

        .acc-field .acc-error {
          font-size: 12px;
          color: #d9534f;
          margin: 0;
        }

        .acc-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .acc-grid-2 { grid-template-columns: 1fr; }
        }

        /* Buttons */
        .acc-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .acc-btn-primary {
          background: #7f0082;
          color: #fff;
        }

        .acc-btn-primary:hover {
          background: #5a005c;
          transform: translateY(-1px);
        }

        .acc-btn-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }

        /* Password strength */
        .acc-strength-bar {
          height: 4px;
          background: #ece9e2;
          border-radius: 2px;
          margin-top: 8px;
          overflow: hidden;
        }

        .acc-strength-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s, background 0.3s;
        }

        /* Email section */
        .acc-email-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          background: #faf9f7;
          border-radius: 14px;
          border: 1px solid #ece9e2;
        }

        .acc-email-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #f9e6f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7f0082;
          flex-shrink: 0;
          font-size: 20px;
        }

        .acc-email-verified {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #2d7a4f;
          font-weight: 500;
        }

        /* Tab animation */
        .acc-tab-panel { animation: fadeUp 0.22s ease; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="acc-root">
        <ToastContainer position="top-right" />

        <div className="acc-header">
          <h1>My Account</h1>
          <p>Manage and update your account details in one place.</p>
        </div>

        <div className="acc-layout">
          {/* Sidebar */}
          <div className="acc-sidebar">
            <div className="acc-profile-card">
              <div className="acc-avatar">{initials}</div>
              <p className="acc-profile-name">{profileData?.data?.fullname || "Your Name"}</p>
              <p className="acc-profile-email">{profileData?.data?.email || "your@email.com"}</p>
              <span className="acc-badge">
                <MdCheckCircle size={12} />
                Active
              </span>
            </div>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`acc-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main */}
          <div className="acc-main">

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="acc-tab-panel">
                <div className="acc-card">
                  <p className="acc-card-title">Personal information</p>
                  <p className="acc-card-sub">Update your name and contact details.</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="acc-grid-2">
                      <div className="acc-field">
                        <label>Full name</label>
                        <input
                          type="text"
                          {...register("fullname", { required: "Full Name is required" })}
                        />
                        {errors?.fullname && <p className="acc-error">{errors.fullname.message}</p>}
                      </div>
                      <div className="acc-field">
                        <label>Phone</label>
                        <input
                          type="text"
                          {...register("phone", { required: "Phone is required" })}
                        />
                        {errors?.phone && <p className="acc-error">{errors.phone.message}</p>}
                      </div>
                    </div>
                    <div className="acc-btn-row">
                      <button type="submit" className="acc-btn acc-btn-primary">
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="acc-tab-panel">
                <div className="acc-card">
                  <p className="acc-card-title">Change password</p>
                  <p className="acc-card-sub">Keep your account secure with a strong password.</p>

                  {/* Email info row */}
                  <div className="acc-email-row" style={{ marginBottom: 24 }}>
                    <div className="acc-email-icon"><SlEnvolope /></div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1713", margin: "0 0 2px" }}>
                        {profileData?.data?.email}
                      </p>
                      <p style={{ fontSize: 12, color: "#9a9690", margin: 0 }}>Your account email</p>
                    </div>
                    <span className="acc-email-verified">
                      <MdCheckCircle /> Verified
                    </span>
                  </div>

                  <form onSubmit={handleSubmit1(onSubmitPass)}>
                    <div className="acc-field">
                      <label>Current password</label>
                      <input
                        type="password"
                        placeholder="Enter your current password"
                        {...register1("old_pass", { required: "Old Password is required" })}
                      />
                      {errors1?.old_pass && <p className="acc-error">{errors1.old_pass.message}</p>}
                    </div>
                    <div className="acc-field">
                      <label>New password</label>
                      <input
                        type="password"
                        placeholder="Min. 8 characters"
                        {...register1("new_pass", { required: "New Password is required" })}
                      />
                      {errors1?.new_pass && <p className="acc-error">{errors1.new_pass.message}</p>}
                    </div>
                    <div className="acc-field">
                      <label>Confirm new password</label>
                      <input
                        type="password"
                        placeholder="Repeat new password"
                        {...register1("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (value) => value === password || "Passwords do not match",
                        })}
                      />
                      {errors1?.confirmPassword && (
                        <p className="acc-error">{errors1.confirmPassword.message}</p>
                      )}
                    </div>
                    <div className="acc-btn-row">
                      <button type="submit" className="acc-btn acc-btn-primary">
                        Update password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Email Tab */}
            {activeTab === "email" && (
              <div className="acc-tab-panel">
                <div className="acc-card">
                  <p className="acc-card-title">Email address</p>
                  <p className="acc-card-sub">Your verified email linked to this account.</p>
                  <div className="acc-email-row">
                    <div className="acc-email-icon"><SlEnvolope /></div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1713", margin: "0 0 3px" }}>
                        {profileData?.data?.email}
                      </p>
                      <p style={{ fontSize: 12, color: "#9a9690", margin: 0 }}>Primary email address</p>
                    </div>
                    <span className="acc-email-verified">
                      <MdCheckCircle /> Verified
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default page;


// 'use client';
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { changePassword, getProfile, updateProfile } from "../reducers/AuthSlice";
// import { useForm } from "react-hook-form";
// import { toast, ToastContainer } from "react-toastify";
// import userFace from "../assets/imagesource/user_face.png";
// import { FileInput, Label, TextInput } from "flowbite-react";
// import { MdEdit } from "react-icons/md";
// import { SlEnvolope } from "react-icons/sl";
// const page=()=>{
//     const { profileData } = useSelector((state) => state?.profile)
//     const dispatch=useDispatch()
//       useEffect(() => {
//         dispatch(getProfile())
//       }, [])

//       console.log("profileData",profileData);

//         const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm();


//    const {
//       register: register1,
//       handleSubmit: handleSubmit1,
//       reset: reset1,
//       watch,
//       formState: { errors: errors1 },
//     } = useForm();
// const password = watch("new_pass");
//   useEffect(() => {
//     setValue("fullname", profileData?.data?.fullname)
//     setValue("phone", profileData?.data?.phone)
//     setValue("email", profileData?.data?.email)
  
//   }, [profileData])

//   const onSubmit=(data)=>{
//     const payload={
//         fullname:data?.fullname,
//         phone:data?.phone
//     }
//     dispatch(updateProfile(payload)).then((res)=>{
//         console.log("Response",res);
//         if(res?.payload?.status_code===200){
//             toast.success(res?.payload?.message)
//             dispatch(getProfile())
//         }
        
//     })
//   }
//   const onSubmitPass=(data)=>{
//     dispatch(changePassword(data)).then((res)=>{
//         console.log("ResPass",res);
//         if(res?.payload?.status_code===200){
//             toast.success(res?.payload?.message)
//         }
//         else if(res?.payload?.response?.data?.status_code===422){
//             toast.error(res?.payload?.response?.data?.message)
//         }
        
//     })
//   }
//     return(
//         <>
//             <div>
//         <div>
//           <ToastContainer /> 
//           <div className='!m-4'>
//               <h3 className='text-[22px] leading-[22px] text-black font-medium pb-4'>My Account</h3>
//               <p className='text-[13px] leading-[22px] text-[#747577] font-normal pb-0'>Manage and update your account details in one place.</p>
//           </div>
//           <div className="bg-white rounded-2xl">
//             <div className="w-full lg:w-full p-5 lg:p-10 mb-4">
//               <div className="account_setting_section">
//                 <div className="lg:flex justify-between items-center">
//                   <div>
//                     <div className="flex items-center gap-4 mb-3">
//                       {/* <div className="relative">
//                         {
//                           profileData?.res?.avatar ? (
//                             <Image src={profileData?.res?.avatar} width={120}
//                               height={120} alt='profileUser' className='w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-[50px] overflow-hidden' />
//                           ) : (
//                             <Image src={userFace} alt='profileUser' className='w-[120px] h-[120px] rounded-[50px] overflow-hidden' />
//                           )
//                         }

//                         <div className="absolute right-0 top-0">
//                           <button
//                             type="button"
//                             className="bg-white p-2 rounded-full shadow-md text-[#757575] hover:bg-[#00806A] hover:text-white"
//                           >
//                             <FileInput
//                               className="absolute opacity-0 h-3 w-5 border border-black"
//                               id="file"
//                               accept="image/*"
//                               onChange={handleFileChange}
//                             />
//                             <MdEdit className="text-xl" />
//                           </button>
//                         </div>
//                       </div> */}
//                       <div>
//                         <p className="text-[#000000] text-xl pb-2"> {profileData?.data?.fullname}</p>
//                         <p className="text-[#777777] text-base pb-2">{profileData?.data?.email} </p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div>
//                     <button className="bg-[#0E5D4F] hover:bg-black text-white text-base leading-[46px] rounded-[8px] px-8 cursor-pointer">Edit</button>
//                   </div> */}
//                 </div>
//                 <div>
                
//                 <div className="lg:pt-6">
//                     <div className="common-section-box-content">
//                     <div className="lg:flex gap-8 mb-4">
//                         <div className="account_user_section w-8/12 lg:w-4/12 mb-2 lg:mb-0">
                        
                        
//                         &nbsp;
//                         </div>
//                     </div>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="lg:flex gap-6 mb-3">
//                         <div className="w-full lg:w-6/12">
//                         <div className="mb-1 block">
//                             <Label className="">Full Name </Label>
//                         </div>
//                         <TextInput
//                             id="base"
//                             type="text"
//                             sizing="md"
//                             className=""
//                             {...register("fullname",{required:"Full Name is required"})}
                        
//                         />
//                         {errors?.fullname && (
//                             <span className="text-red-500">
//                                 {errors?.fullname?.message}
//                             </span>
//                             )}
//                         </div>
//                         <div className="w-full lg:w-6/12">
//                         <div className="mb-1 block">
//                             <Label className="">Phone </Label>
//                         </div>
//                         <TextInput
//                             id="base"
//                             type="text"
//                             sizing="md"
//                             className=""
//                             {...register("phone",{required:"Phone is Required"})}
                            
//                         />
//                          {errors?.phone && (
//                             <span className="text-red-500">
//                                 {errors?.phone?.message}
//                             </span>
//                             )}
//                         </div>
//                     </div>
//                     <div className="lg:flex gap-6 mb-3">
//                         <div className="w-full lg:w-6/12">
//                         <div className="mb-1 block">
//                             <Label className="">
//                             Email <span className="text-[#ff1a03]"></span>
//                             </Label>
//                         </div>
//                         <TextInput
//                             id="base"
//                             type="text"
//                             sizing="md"
//                             required
//                             {...register("email")}
//                             readOnly
//                         />
//                         </div>
//                         {/* <div className="w-full lg:w-6/12">
//                         <div className="mb-1 block">
//                             <Label className="">User Name </Label>
//                         </div>
//                         <TextInput
//                             id="base"
//                             type="text"
//                             sizing="md"
//                             {...register("username")}
//                             readOnly
//                         />
//                         </div> */}
//                     </div>
//                     <div>
//                             <button className="bg-[#800080] hover:bg-black text-white text-base leading-[46px] rounded-[8px] px-8 cursor-pointer mt-3">Update</button>
//                     </div>
//                     </form>
//                     <form onSubmit={handleSubmit1(onSubmitPass)}>
//                     <div className="lg:flex justify-between mt-3">
//                         <div className="py-10 w-full mt-5">
//                         <p className="text-[#000000] text-[18px] pb-4">My email Address</p>
//                         <div className="flex items-center gap-2">
//                             <div>
//                             <div className="bg-[#eee6ed] w-[56px] h-[56px] rounded-full flex justify-center items-center">
//                                 <SlEnvolope className="text-2xl text-[#600a75]" />
//                             </div>
//                             </div>
//                             <div>
//                             <p className="text-[#000000] text-[16px]">{profileData?.data?.email}</p>
//                             {/* <p className="text-[#808080] text-[16px]">1 month ago</p> */}
//                             </div>
//                         </div>
//                         </div>
                        
//                         <div className="w-full mt-10">
//                         <p className="text-[#000000] text-[18px] pb-4">Change Password</p>

//                         <div className="w-full lg:w-12/12">
//                             <div className="mb-1 block">
//                             <Label className="">Old Password </Label>
//                             </div>
//                             <TextInput
//                             id="base"
//                             type="password"
//                             sizing="md"
//                             {...register1("old_pass", { required: "Old Password is Required" })}
//                             />
//                             {errors1?.old_pass && (
//                             <span className="text-red-500">
//                                 {errors1?.old_pass?.message}
//                             </span>
//                             )}
//                         </div>
//                         <div className="w-full lg:w-12/12">
//                             <div className="mb-1 block">
//                             <Label className="">New Password </Label>
//                             </div>
//                             <TextInput
//                             id="base"
//                             type="password"
//                             sizing="md"
//                             {...register1("new_pass", { required: "New Password is Required" })}
//                             />
//                             {errors1?.new_pass && (
//                             <span className="text-red-500">
//                                 {errors1?.new_pass?.message}
//                             </span>
//                             )}
//                         </div>
//                         <div className="w-full lg:w-12/12">
//                             <div className="mb-1 block">
//                             <Label className="">Confirm Password </Label>
//                             </div>
//                             <TextInput
//                             id="base"
//                             type="password"
//                             sizing="md"
//                             {...register1("confirmPassword", {
//                                 required: "Confirm Password is required",

//                                 validate: (value) =>
//                                 value === password || "Password do not Match",
//                             })}

//                             />
//                             {errors1.confirmPassword && (
//                             <span className="text-red-500">
//                                 {errors1.confirmPassword.message}
//                             </span>
//                             )}
//                         </div>
//                         <div>
//                             <button className="bg-[#800080] hover:bg-black text-white text-base leading-[46px] rounded-[8px] px-8 cursor-pointer mt-3">Change Password</button>
//                         </div>

//                         </div>
                      

//                     </div>
//                     </form>
//                     {/* <div className="lg:flex gap-6 mb-3">
//                             {
//                             currentSubcriptionData?.data?(
//                                 <div className="mt-6 p-5 bg-gray-50 shadow-lg rounded-2xl">
//                                     <h2 className="text-lg font-semibold mb-2 text-black">Plan Details</h2>
//                                     <p><strong className="text-black">Plan Name:</strong> {currentSubcriptionData?.data?.Plan?.plan_name}</p>
//                             <p><strong className="text-black">Price:</strong> {currentSubcriptionData?.data?.Plan?.Price?.[currentSubcriptionData?.data?.Plan?.Price?.length - 1]?.Currency?.currency_symbol} {currentSubcriptionData?.data?.Plan?.Price?.[currentSubcriptionData?.data?.Plan?.Price?.length-1]?.price} {currentSubcriptionData?.data?.Plan?.plan_frequency===1?"/ Month":`/ ${currentSubcriptionData?.data?.Plan?.plan_frequency} Months` } </p>
//                             <p><strong className="text-black">Description:</strong>{currentSubcriptionData?.data?.Plan?.PlanAccess?.[0]?.plan_access_description}</p>
//                                     <p className="text-red-400">
//                                 <strong>
//                                 * Your Subscription will be valid till{" "}
//                                     {
//                                     new Date(currentSubcriptionData?.data?.stripe_subscription_end_date)
//                                     .toISOString()
//                                     .split('T')[0]
//                                 }
//                                 </strong>
//                             </p>
//                             {
//                                 currentSubcriptionData?.data?.subscription_status==="active"?(
//                                     <>
//                                     <Button onClick={() => { handleCancelSubs(currentSubcriptionData?.data?.stripe_subscription_type) }} className="!bg-red-600 mt-2 cursor-pointer">
//                                     Cancel Plan
//                                     </Button>
//                                 </>
//                                 ):(
//                                 <>
//                                 </>
//                                 )
//                             }
//                                     </div>
//                             ):(
//                                 <p className="text-red-600 mt-3">*No Active Plan</p>
//                             )
//                             }
//                             </div> */}
//                     </div>
//                 </div>
                 
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* {
//           openCancelModal && (
//             <SubsCancelModal
//               openCancelModal={openCancelModal}
//               setOpenCandelModal={setOpenCandelModal}
//               subsId={subsId}
//               profileData={profileData}
//             />
//           )
//         } */}
//       </div>
//         </>
//     )
// }
// export default page