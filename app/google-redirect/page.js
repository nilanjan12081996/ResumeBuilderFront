'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Spinner } from "flowbite-react";
import { googleSignIn } from "../reducers/AuthSlice";
import GoggleChoiceModal from "./GoggleChoiceModal";
const page=()=>{
   const dispatch = useDispatch();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(true);
    const[choiceModal,setChoiceModal]=useState(false)
      const [chooseResumeTypeGgl,setChooseResumeTypeGgl]=useState()

    useEffect(() => {
        const handleGoogleSignIn = async () => {
            try {
                const videoToken = sessionStorage.getItem("googleAccessToken");
                console.log("videoToken:", videoToken);

                const ggltoken = videoToken ? JSON.parse(videoToken)?.token : null;
                console.log("ggltoken:", ggltoken);

                if (ggltoken) {
                    // Wait for the Google sign-in to complete
                    const response = await dispatch(googleSignIn({ token: ggltoken }))
                    console.log("gglresponse: ", response);
                    
                    const userToken = response?.payload?.access_token;
                    console.log("userToken ggl", userToken);

                    if (userToken) {
                        console.log("Setting new videoToken...");
                        console.log("responseggl",response);
                        if(response?.payload?.data?.signUpType?.length===0){
                            sessionStorage.setItem(
                                "userToken",
                                JSON.stringify({ token: userToken })
                            );
                            setChoiceModal(true)

                        }else{
                              sessionStorage.setItem(
                            "resumeToken",
                            JSON.stringify({ token: userToken })
                        );
                          sessionStorage.setItem(
                    'signup_type_id',
                    JSON.stringify({ signup_type_id:response?.payload?.signUpType?.[0]?.UserSignUpTypeMap?.sign_up_type_id })
                );
                        console.log("New videoToken set:", sessionStorage.getItem("resumeToken"));
                        
                        // Wait a bit to ensure token is properly set
                       
                            router.push("/dashboard");
                        }
                        
                        // Update the token in sessionStorage
                      
                     
                        
                    
                        
                    } else {
                        // Handle error case
                        console.error("No token received from Google sign-in");
                        setIsProcessing(false);
                        router.push("/");
                    }
                } else {
                    console.log("No Google token found, redirecting to home");
                    setIsProcessing(false);
                    router.push("/");
                }
            } catch (error) {
                console.error("Error during Google sign-in:", error);
                setIsProcessing(false);
                router.push("/");
            }
        };

        handleGoogleSignIn();
    }, [dispatch, router]);

    return (
        <>
            <div className="h-96 flex justify-center items-center">
                {isProcessing ? (
                    <div className="text-center">
                        <Spinner />
                        <p className="mt-4 text-gray-600">Completing sign-in...</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p>Redirecting...</p>
                    </div>
                )}
            </div>
            {
            choiceModal&&(
              <GoggleChoiceModal
              choiceModal={choiceModal}
              setChoiceModal={setChoiceModal}
              setChooseResumeTypeGgl={setChooseResumeTypeGgl}
              
              />
            )
          }
        </>
    );
}
export default page