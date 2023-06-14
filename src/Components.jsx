import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgInfo } from "react-icons/cg";
import { MdOutlineModeEditOutline } from "react-icons/md";

const Components = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const [sections, setSections] = useState([
    {
      id: 1,
      label: "Profile Summary",
      description: "This section provides a summary of your profile.",
      enabled: true,
    },

    {
      id: 2,
      label: "Academic and Cocurricular Achievements",
      description:
        "This section provides a summary of your academic and cocurricular achievements.",
      enabled: true,
    },
    {
      id: 3,
      label: "Summer Internship Experience",
      description:
        "This section provides a summary of your summer internship experience.",
      enabled: true,
    },
    {
      id: 4,
      label: "Work Experience",
      description: "This section provides a summary of your work experience.",
      enabled: true,
    },
    {
      id: 5,
      label: "Projects",
      description: "This section provides a summary of your projects.",
      enabled: true,
    },
    {
      id: 6,
      label: "Certifications",
      description: "This section provides a summary of your certifications.",
      enabled: true,
    },
    {
      id: 7,
      label: "Leadership Positions",
      description:
        "This section provides a summary of your leadership positions.",
      enabled: true,
    },
    {
      id: 8,
      label: "Extracurricular",
      description:
        "This section provides a summary of your extracurricular activities.",
      enabled: true,
    },
    {
      id: 9,
      label: "Education",
      description: "This section provides a summary of your education.",
      enabled: true,
    },
  ]);

  useEffect(() => {
    const storedSections = localStorage.getItem("sections");
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

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

  const handleDragStart = (event, sectionIndex) => {
    if (!isEnabled) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData("text/plain", sectionIndex);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    const sourceIndex = event.dataTransfer.getData("text/plain");
    const updatedSections = [...sections];
    const [draggedSection] = updatedSections.splice(sourceIndex, 1);
    updatedSections.splice(targetIndex, 0, draggedSection);
    setSections(updatedSections);
    setHasChanged(true);
    console.log("Dropped");
  };

  return (
    <div className="w-full flex items-center flex-col">
      <div className="container mt-10 sm:mt-20 w-full flex flex-col items-center text-xl sm:text-3xl font-semibold">
        Select your Sections
      </div>
      <div className="rowbox my-5 sm:my-10 flex flex-col items-stretch text-base sm:text-lg font-semibold space-y-3">
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <RowItem
              section={section}
              index={index}
              setHasChanged={handleHasChanged}
              resetHasChanged={resetHasChanged}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
            <div className="h-px bg-[#E6E6E6] w-full mt-2" />
          </React.Fragment>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button
          className={`text-white text-base sm:text-xl rounded-lg px-12 sm:px-40 py-3 sm:py-4 ${
            hasChanged ? "bg-[#8A4893]" : "bg-[#8a4893ad]"
          }`}
          disabled={!hasChanged}
          onClick={handleSave}
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

const RowItem = ({
  section,
  index,
  setHasChanged,
  resetHasChanged,
  description,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  const [isEnabled, setIsEnabled] = useState(section.enabled);
  const [sectionLabel, setSectionLabel] = useState(section.label);

  const toggleSwitch = () => {
    const newEnabledState = !isEnabled;
    setIsEnabled(newEnabledState);
    setHasChanged(true);

    if (newEnabledState) {
      alert("Row enabled!");
      console.log("Row enabled!");
    } else {
      alert("Row disabled!");
      console.log("Row disabled!");
    }
  };

  const handleEditLabel = () => {
    if (!isEnabled) return; // Prevent editing when row is disabled

    const newLabel = prompt("Enter the new section label:", sectionLabel);
    if (newLabel) {
      setSectionLabel(newLabel);
      setHasChanged(true);
      console.log(newLabel);
    }
  };

  return (
    <div
      className={`row flex sm:flex items-center justify-between ${
        !isEnabled ? "opacity-50" : ""
      }`}
      draggable={isEnabled}
      onDragStart={(event) => isEnabled && handleDragStart(event, index)}
      onDragOver={isEnabled ? handleDragOver : null}
      onDrop={(event) => isEnabled && handleDrop(event, index)}
    >
      <div className="flex items-center text-clip">
        <GiHamburgerMenu className="hover:cursor-move" />
        <div className="w-2 sm:w-4" />
        <CgInfoButton description={section.description} />
        <div className="mr-2 sm:mr-36 lg:mr-96 text-ellipsis">
          {sectionLabel}
        </div>
      </div>
      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <MdOutlineModeEditOutline
          className={`cursor-pointer ${!isEnabled ? "opacity-50" : ""}`}
          onClick={handleEditLabel}
        />
        <label className="relative h-8 w-14 cursor-pointer">
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
      <div
        id="tooltip"
        className="absolute bg-gray-800 text-white px-1 py-0.5 rounded text-xs sm:text-sm hidden"
      ></div>
    </div>
  );
};

const CgInfoButton = ({ description }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});

  const handleMouseEnter = (e) => {
    const targetBounds = e.target.getBoundingClientRect();
    const tooltipTop = targetBounds.top - 10;
    const tooltipLeft = targetBounds.right + 10;
    setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  useEffect(() => {
    const tooltipElement = document.getElementById("tooltip");
    tooltipElement.style.top = `${tooltipPosition.top}px`;
    tooltipElement.style.left = `${tooltipPosition.left}px`;
  }, [tooltipPosition]);

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CgInfo className="mr-4" />
      </div>
      {showTooltip && (
        <div className="absolute bg-[#bd7cc6] text-white px-4 py-3 rounded text-sm z-10">
          {description}
        </div>
      )}
    </div>
  );
};

export default Components;
