import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";

import { Notes } from "../assets/notes"; // Change path if your notes file is elsewhere

import Title from "../components/Title";
import NotesCard from "../components/NotesCard";
import NotesFilterSidebar from "../components/NotesFilterSidebar";

const NotesCollection = () => {

  const { search } = useContext(ShopContext);

  const { branch, semester } = useParams();

  const [filteredNotes, setFilteredNotes] = useState([]);

  const [filterVisible, setFilterVisible] = useState(false);

  const [selectedType, setSelectedType] = useState([]);

  const [sortType, setSortType] = useState("Newest");

  /*
  =====================================
  SEARCH
  =====================================
  */

  useEffect(() => {

    let notesCopy = [...Notes];

    // Branch Filter
    if (branch) {

      notesCopy = notesCopy.filter(

        (note) =>

          note.branch.toLowerCase() ===
          branch.toLowerCase()

      );

    }

    // Semester Filter
    if (semester) {

      notesCopy = notesCopy.filter(

        (note) =>

          note.semester.toString() === semester

      );

    }

    // Search
    if (search.trim() !== "") {

      notesCopy = notesCopy.filter(

        (note) =>

          note.title.toLowerCase().includes(search.toLowerCase()) ||

          note.professor.toLowerCase().includes(search.toLowerCase()) ||

          note.branch.toLowerCase().includes(search.toLowerCase()) ||

          note.subCategory.toLowerCase().includes(search.toLowerCase())

      );

    }

    // Free / Paid Filter
    if (selectedType.length > 0) {

      notesCopy = notesCopy.filter(

        (note) =>

          selectedType.includes(note.noteType)

      );

    }

    // Sorting

    switch (sortType) {

      case "Newest":

        notesCopy.sort(

          (a, b) => b.date - a.date

        );

        break;

      case "Oldest":

        notesCopy.sort(

          (a, b) => a.date - b.date

        );

        break;

      case "Low-High":

        notesCopy.sort(

          (a, b) => a.price - b.price

        );

        break;

      case "High-Low":

        notesCopy.sort(

          (a, b) => b.price - a.price

        );

        break;

      case "Most Viewed":

        notesCopy.sort(

          (a, b) => b.views - a.views

        );

        break;

      default:

        break;

    }

    setFilteredNotes(notesCopy);

  }, [

    branch,

    semester,

    search,

    selectedType,

    sortType

  ]);

  /*
  =====================================
  HANDLE FREE / PAID FILTER
  =====================================
  */

  const toggleType = (type) => {

    if (selectedType.includes(type)) {

      setSelectedType(

        prev =>

          prev.filter(item => item !== type)

      );

    }

    else {

      setSelectedType(

        prev => [...prev, type]

      );

    }

  };

  return (

    <div className="border-t pt-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <Title

          text1={branch || "All"}

          text2={semester ? `Semester ${semester}` : "Notes"}

        />

        <button

          onClick={() => setFilterVisible(true)}

          className="border px-4 py-2 text-sm"

        >

          FILTERS

        </button>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {

          filteredNotes.map((note) => (

            <NotesCard

              key={note._id}

              id={note._id}

              title={note.title}

              professor={note.professor}

              branch={note.branch}

              semester={note.semester}

              pages={note.pages}

              price={note.price}

              noteType={note.noteType}

              pdfAvailable={note.pdfAvailable}

            />

          ))

        }

      </div>

      {/* Sidebar */}

      <NotesFilterSidebar

        filterVisible={filterVisible}

        setFilterVisible={setFilterVisible}

        selectedType={selectedType}

        toggleType={toggleType}

        sortType={sortType}

        setSortType={setSortType}

      />

    </div>

  );

};

export default NotesCollection;