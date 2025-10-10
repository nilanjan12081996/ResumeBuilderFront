import { Datepicker, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { BiSolidBuilding } from "react-icons/bi";
import { BsFillPersonVcardFill, BsFillPlusCircleFill } from "react-icons/bs";
import { FaCertificate } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CertificatesJd = ({ getUpdateResumeInfoData, certificates, setCertificates }) => {


useEffect(() => {
  console.log('CertificatesJd',getUpdateResumeInfoData?.data?.imp_certification_info)
  if (getUpdateResumeInfoData?.data?.imp_certification_info?.length > 0) {
    console.log('CertificatesJd', getUpdateResumeInfoData.data.imp_certification_info);

    const certs = getUpdateResumeInfoData.data.imp_certification_info.map((cert, index) => ({
      id: cert.id,
      certification_name: cert.certification_name || "",
      issuing_organization: cert.issuing_organization || "",
      obtained_date: cert.date_obtained ? (() => {
        try {
          const date = new Date(cert.date_obtained);
          return isNaN(date.getTime()) ? null : date;
        } catch (e) {
          console.error('Error parsing certificate date:', cert.date_obtained, e);
          return null;
        }
      })() : null,
      certification_id: cert.certification_id || ""
    }));

    setCertificates(certs);
  } else {
    setCertificates([
      {
        id: `cert-default-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        certification_name: "",
        issuing_organization: "",
        obtained_date: null,
        certification_id: ""
      }
    ]);
  }
}, [getUpdateResumeInfoData, setCertificates]);




  const addCertificates = () => {
    setCertificates([...certificates, { id: `cert-new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, certification_name: "", issuing_organization: "", obtained_date: null, certification_id: "" }]);
  };

  const deleteCertificates = (id) => {
    setCertificates(certificates.filter((cer) => cer.id !== id));
  };

  const updateCertificates = (id, field, value) => {
    setCertificates(
      certificates.map((cer) =>
        cer.id === id ? { ...cer, [field]: value } : cer
      )
    );
  };
  return (
    <>
      <div className='tab_wrap'>
        <div className='mb-4'>
          {
            certificates.map((cer, indexCer) => (
              <div key={`certificate-${cer.id}-${indexCer}`}>
                <div className='mb-4 lg:flex items-center justify-between'>
                  <div className='mb-2 lg:mb-0'>
                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Certifications {indexCer + 1}</h4>
                    <p className='text-[14px] text-[#939393] font-normal'>Fill in the details for this section</p>
                  </div>
                  <div className='flex justify-end items-center gap-2'>
                    <button type="button" onClick={addCertificates} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Certification</button>
                    <button type="button" onClick={() => deleteCertificates(cer.id)} className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                  </div>
                </div>
                <div className='resume_form_area'>
                  <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Certification Name</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <FaCertificate className='text-[#928F8F]' />
                        </div>
                        <TextInput
                          value={cer.certification_name}
                          onChange={(e) =>
                            updateCertificates(cer.id, "certification_name", e.target.value)
                          }

                          id="base" type="text" sizing="md" placeholder='Name of th certification' />
                      </div>
                    </div>
                    <div className='lg:w-6/12 resume_form_box'>
                      <div className="mb-1 block">
                        <Label htmlFor="base"> Issuing Organization</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <BiSolidBuilding className='text-[#928F8F]' />
                        </div>
                        <TextInput
                          value={cer.issuing_organization}
                          onChange={(e) =>
                            updateCertificates(cer.id, "issuing_organization", e.target.value)
                          }
                          id="base" type="text" sizing="md" placeholder='E.g. Coursera, Udemy, etc.' />
                      </div>
                    </div>
                  </div>
                  <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Date Obtained</Label>
                      </div>
                      <div className='field_box_date'>
                        <Datepicker
                          value={cer.obtained_date && !isNaN(cer.obtained_date.getTime()) ? cer.obtained_date : null}
                          onChange={(date) =>
                            updateCertificates(cer.id, "obtained_date", date)
                          }
                        />
                      </div>
                    </div>
                    <div className='lg:w-6/12 resume_form_box'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Certification ID</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <BsFillPersonVcardFill className='text-[#928F8F]' />
                        </div>
                        <TextInput
                          value={cer.certification_id}
                          onChange={(e) =>
                            updateCertificates(cer.id, "certification_id", e.target.value)
                          }
                          id="base" type="text" sizing="md" placeholder='Enter certification ID' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </>
  )
}
export default CertificatesJd;