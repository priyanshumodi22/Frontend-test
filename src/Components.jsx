import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgInfo } from "react-icons/cg";
import { MdOutlineModeEditOutline } from "react-icons/md";

const Components = () => {
  const [hasChanged, setHasChanged] = useState(false);

  const handleHasChanged = () => {
    setHasChanged(true);
  };

  const resetHasChanged = () => {
    setHasChanged(false);
  };

  const handleSave = () => {
    // Perform saving functionality here
    // After saving, reset the hasChanged state to false
    setHasChanged(false);
    console.log("Saved");
  };

  return (
    <div className=" w-full flex  items-center flex-col">
      <div className=" container mt-20 w-full flex flex-col items-center text-3xl font-semibold">
        Select your Sections
      </div>
      <div className="rowbox my-10  flex flex-col items-stretch text-lg font-semibold space-y-3">
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Profile Summary"
          setHasChanged={handleHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Academic and Cocurricular Achievements"
          setHasChanged={setHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Summer Internship Experience"
          setHasChanged={setHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Work Experience"
          setHasChanged={setHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Projects"
          setHasChanged={setHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Certifications"
          setHasChanged={setHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Leadership Positions"
          setHasChanged={setHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Extracurricular"
          setHasChanged={setHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
        <RowItem
          icon={<GiHamburgerMenu />}
          label="Education"
          setHasChanged={setHasChanged}
          resetHasChanged={resetHasChanged}
        />
        <div className="h-px bg-[#E6E6E6] w-full mt-2" />
      </div>
      {/* add a button with text as "save and next" */}
      <div className="w-full flex justify-center">
        <button
          className="bg-[#8A4893] text-white text-xl rounded-lg px-40 py-4"
          disabled={!hasChanged}
          onClick={handleSave}
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

const RowItem = ({ icon, label, setHasChanged, resetHasChanged }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [sectionLabel, setSectionLabel] = useState(label);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    setHasChanged(true);
  };

  const handleEditLabel = () => {
    const newLabel = prompt("Enter the new section label:", sectionLabel);
    if (newLabel) {
      setSectionLabel(newLabel);
      setHasChanged(true); // Call setHasChanged prop here
      console.log(newLabel);
    }
  };

  return (
    <div className="row flex sm:flex items-center justify-between">
      <div className="flex items-center">
        {icon}
        <div className="w-4" />
        <CgInfo className="mr-4" />
        <div className="mr-96">{sectionLabel}</div>
      </div>
      <div className="flex items-center  gap-x-4">
        <MdOutlineModeEditOutline onClick={handleEditLabel} />
        <label className="relative h-8 w-14  cursor-pointer">
          <input
            type="checkbox"
            className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
            checked={isEnabled}
            onChange={toggleSwitch}
          />
          <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#381E72] text-gray-400 transition-all peer-checked:start-6 peer-checked:text-[#EADDFF]">
            <svg
              data-unchecked-icon
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              data-checked-icon
              xmlns="http://www.w3.org/2000/svg"
              className="hidden h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-[#D0BCFF] "></span>
        </label>
      </div>
    </div>
  );
};

export default Components;
