'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, getProfile, updateProfile } from "../reducers/AuthSlice";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import userFace from "../assets/imagesource/user_face.png";
import { FileInput, Label, TextInput } from "flowbite-react";
import { MdEdit } from "react-icons/md";
import { SlEnvolope } from "react-icons/sl";
const page=()=>{
    const { profileData } = useSelector((state) => state?.profile)
    const dispatch=useDispatch()
      useEffect(() => {
        dispatch(getProfile())
      }, [])

      console.log("profileData",profileData);

        const {
    register,
    handleSubmit,
    control,
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
    setValue("fullname", profileData?.data?.fullname)
    setValue("phone", profileData?.data?.phone)
    setValue("email", profileData?.data?.email)
  
  }, [profileData])

  const onSubmit=(data)=>{
    const payload={
        fullname:data?.fullname,
        phone:data?.phone
    }
    dispatch(updateProfile(payload)).then((res)=>{
        console.log("Response",res);
        if(res?.payload?.status_code===200){
            toast.success(res?.payload?.message)
            dispatch(getProfile())
        }
        
    })
  }
  const onSubmitPass=(data)=>{
    dispatch(changePassword(data)).then((res)=>{
        console.log("ResPass",res);
        if(res?.payload?.status_code===200){
            toast.success(res?.payload?.message)
        }
        else if(res?.payload?.response?.data?.status_code===422){
            toast.error(res?.payload?.response?.data?.message)
        }
        
    })
  }
    return(
        <>
            <div>
        <div>
          <ToastContainer /> 
          <div className='!m-4'>
              <h3 className='text-[22px] leading-[22px] text-black font-medium pb-4'>My Account</h3>
              <p className='text-[13px] leading-[22px] text-[#747577] font-normal pb-0'>Manage and update your account details in one place.</p>
          </div>
          <div className="bg-white rounded-2xl">
            <div className="w-full lg:w-full p-5 lg:p-10 mb-4">
              <div className="account_setting_section">
                <div className="lg:flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      {/* <div className="relative">
                        {
                          profileData?.res?.avatar ? (
                            <Image src={profileData?.res?.avatar} width={120}
                              height={120} alt='profileUser' className='w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-[50px] overflow-hidden' />
                          ) : (
                            <Image src={userFace} alt='profileUser' className='w-[120px] h-[120px] rounded-[50px] overflow-hidden' />
                          )
                        }

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="bg-white p-2 rounded-full shadow-md text-[#757575] hover:bg-[#00806A] hover:text-white"
                          >
                            <FileInput
                              className="absolute opacity-0 h-3 w-5 border border-black"
                              id="file"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                            <MdEdit className="text-xl" />
                          </button>
                        </div>
                      </div> */}
                      <div>
                        <p className="text-[#000000] text-xl pb-2"> {profileData?.data?.fullname}</p>
                        <p className="text-[#777777] text-base pb-2">{profileData?.data?.email} </p>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <button className="bg-[#0E5D4F] hover:bg-black text-white text-base leading-[46px] rounded-[8px] px-8 cursor-pointer">Edit</button>
                  </div> */}
                </div>
                <div>
                
                <div className="lg:pt-6">
                    <div className="common-section-box-content">
                    <div className="lg:flex gap-8 mb-4">
                        <div className="account_user_section w-8/12 lg:w-4/12 mb-2 lg:mb-0">
                        
                        
                        &nbsp;
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="lg:flex gap-6 mb-3">
                        <div className="w-full lg:w-6/12">
                        <div className="mb-1 block">
                            <Label className="">Full Name </Label>
                        </div>
                        <TextInput
                            id="base"
                            type="text"
                            sizing="md"
                            className=""
                            {...register("fullname",{required:"Full Name is required"})}
                        
                        />
                        {errors?.fullname && (
                            <span className="text-red-500">
                                {errors?.fullname?.message}
                            </span>
                            )}
                        </div>
                        <div className="w-full lg:w-6/12">
                        <div className="mb-1 block">
                            <Label className="">Phone </Label>
                        </div>
                        <TextInput
                            id="base"
                            type="text"
                            sizing="md"
                            className=""
                            {...register("phone",{required:"Phone is Required"})}
                            
                        />
                         {errors?.phone && (
                            <span className="text-red-500">
                                {errors?.phone?.message}
                            </span>
                            )}
                        </div>
                    </div>
                    <div className="lg:flex gap-6 mb-3">
                        <div className="w-full lg:w-6/12">
                        <div className="mb-1 block">
                            <Label className="">
                            Email <span className="text-[#ff1a03]"></span>
                            </Label>
                        </div>
                        <TextInput
                            id="base"
                            type="text"
                            sizing="md"
                            required
                            {...register("email")}
                            readOnly
                        />
                        </div>
                        {/* <div className="w-full lg:w-6/12">
                        <div className="mb-1 block">
                            <Label className="">User Name </Label>
                        </div>
                        <TextInput
                            id="base"
                            type="text"
                            sizing="md"
                            {...register("username")}
                            readOnly
                        />
                        </div> */}
                    </div>
                    <div>
                            <button className="bg-[#800080] hover:bg-black text-white text-base leading-[46px] rounded-[8px] px-8 cursor-pointer mt-3">Update</button>
                    </div>
                    </form>
                    <form onSubmit={handleSubmit1(onSubmitPass)}>
                    <div className="lg:flex justify-between mt-3">
                        <div className="py-10 w-full mt-5">
                        <p className="text-[#000000] text-[18px] pb-4">My email Address</p>
                        <div className="flex items-center gap-2">
                            <div>
                            <div className="bg-[#eee6ed] w-[56px] h-[56px] rounded-full flex justify-center items-center">
                                <SlEnvolope className="text-2xl text-[#600a75]" />
                            </div>
                            </div>
                            <div>
                            <p className="text-[#000000] text-[16px]">{profileData?.data?.email}</p>
                            {/* <p className="text-[#808080] text-[16px]">1 month ago</p> */}
                            </div>
                        </div>
                        </div>
                        
                        <div className="w-full mt-10">
                        <p className="text-[#000000] text-[18px] pb-4">Change Password</p>

                        <div className="w-full lg:w-12/12">
                            <div className="mb-1 block">
                            <Label className="">Old Password </Label>
                            </div>
                            <TextInput
                            id="base"
                            type="password"
                            sizing="md"
                            {...register1("old_pass", { required: "Old Password is Required" })}
                            />
                            {errors1?.old_pass && (
                            <span className="text-red-500">
                                {errors1?.old_pass?.message}
                            </span>
                            )}
                        </div>
                        <div className="w-full lg:w-12/12">
                            <div className="mb-1 block">
                            <Label className="">New Password </Label>
                            </div>
                            <TextInput
                            id="base"
                            type="password"
                            sizing="md"
                            {...register1("new_pass", { required: "New Password is Required" })}
                            />
                            {errors1?.new_pass && (
                            <span className="text-red-500">
                                {errors1?.new_pass?.message}
                            </span>
                            )}
                        </div>
                        <div className="w-full lg:w-12/12">
                            <div className="mb-1 block">
                            <Label className="">Confirm Password </Label>
                            </div>
                            <TextInput
                            id="base"
                            type="password"
                            sizing="md"
                            {...register1("confirmPassword", {
                                required: "Confirm Password is required",

                                validate: (value) =>
                                value === password || "Password do not Match",
                            })}

                            />
                            {errors1.confirmPassword && (
                            <span className="text-red-500">
                                {errors1.confirmPassword.message}
                            </span>
                            )}
                        </div>
                        <div>
                            <button className="bg-[#800080] hover:bg-black text-white text-base leading-[46px] rounded-[8px] px-8 cursor-pointer mt-3">Change Password</button>
                        </div>

                        </div>
                      

                    </div>
                    </form>
                    {/* <div className="lg:flex gap-6 mb-3">
                            {
                            currentSubcriptionData?.data?(
                                <div className="mt-6 p-5 bg-gray-50 shadow-lg rounded-2xl">
                                    <h2 className="text-lg font-semibold mb-2 text-black">Plan Details</h2>
                                    <p><strong className="text-black">Plan Name:</strong> {currentSubcriptionData?.data?.Plan?.plan_name}</p>
                            <p><strong className="text-black">Price:</strong> {currentSubcriptionData?.data?.Plan?.Price?.[currentSubcriptionData?.data?.Plan?.Price?.length - 1]?.Currency?.currency_symbol} {currentSubcriptionData?.data?.Plan?.Price?.[currentSubcriptionData?.data?.Plan?.Price?.length-1]?.price} {currentSubcriptionData?.data?.Plan?.plan_frequency===1?"/ Month":`/ ${currentSubcriptionData?.data?.Plan?.plan_frequency} Months` } </p>
                            <p><strong className="text-black">Description:</strong>{currentSubcriptionData?.data?.Plan?.PlanAccess?.[0]?.plan_access_description}</p>
                                    <p className="text-red-400">
                                <strong>
                                * Your Subscription will be valid till{" "}
                                    {
                                    new Date(currentSubcriptionData?.data?.stripe_subscription_end_date)
                                    .toISOString()
                                    .split('T')[0]
                                }
                                </strong>
                            </p>
                            {
                                currentSubcriptionData?.data?.subscription_status==="active"?(
                                    <>
                                    <Button onClick={() => { handleCancelSubs(currentSubcriptionData?.data?.stripe_subscription_type) }} className="!bg-red-600 mt-2 cursor-pointer">
                                    Cancel Plan
                                    </Button>
                                </>
                                ):(
                                <>
                                </>
                                )
                            }
                                    </div>
                            ):(
                                <p className="text-red-600 mt-3">*No Active Plan</p>
                            )
                            }
                            </div> */}
                    </div>
                </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {
          openCancelModal && (
            <SubsCancelModal
              openCancelModal={openCancelModal}
              setOpenCandelModal={setOpenCandelModal}
              subsId={subsId}
              profileData={profileData}
            />
          )
        } */}
      </div>
        </>
    )
}
export default page