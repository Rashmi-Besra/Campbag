import React from "react";

const AcademicInfo = ({ profile, setProfile }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Academic Information
      </h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Registration Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number
          </label>

          <input
            type="text"
            name="registrationNumber"
            value={profile.registrationNumber || ""}
            disabled
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Branch */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch
          </label>

          <select
            name="branch"
            value={profile.branch || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Branch</option>

            <option value="CSE">
              Computer Science and Engineering
            </option>

            <option value="ECE">
              Electronics & Communication
            </option>

            <option value="EE">
              Electrical Engineering
            </option>

            <option value="ME">
              Mechanical Engineering
            </option>

            <option value="CE">
              Civil Engineering
            </option>

            <option value="MME">
              Material and Metallurgical Engineering
            </option>

            <option value="PIE">
              Production and Industrial Engineering
            </option>

            <option value="ECM">
              Electronics and Computer Engineering
            </option>
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Semester
          </label>

          <select
            name="semester"
            value={profile.semester || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Semester</option>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
              <option value={semester} key={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>

        {/* Hostel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hostel
          </label>

          <input
            type="text"
            name="hostel"
            value={profile.hostel || ""}
            onChange={handleChange}
            placeholder="Enter hostel name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

      </div>

    </div>
  );
};

export default AcademicInfo;