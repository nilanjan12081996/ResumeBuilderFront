import React from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";

const LinkedInPersonalDetails = ({ register, watch, setValue }) => {

  return (
    <div className='acco_section'>
      <Accordion className='mb-[4px]'>
        <AccordionPanel>
          <AccordionTitle className='font-bold text-xl'>Contact</AccordionTitle>
          <AccordionContent className='pt-0'>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Job Title / Headline */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2 years experience || React.js || Node.js || MERN Developer"
                  className="mt-1 w-full rounded-lg"
                  {...register("job_target")}
                />
              </div>

              {/* First Name */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("first_name")}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("last_name")}
                />
              </div>

              {/* City, State */}
              <div className="md:col-span-2">
                <label className="block !text-sm !font-medium !text-gray-500">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, State, Country"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("city_state")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("email")}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("phone")}
                />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  placeholder="linkedin.com/in/yourprofile"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("linkedin")}
                />
              </div>
              
              {/* Website / Portfolio */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Website / Portfolio
                </label>
                <input
                  type="url"
                  placeholder="yourwebsite.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("website")}
                />
              </div>

            </form>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

export default LinkedInPersonalDetails;