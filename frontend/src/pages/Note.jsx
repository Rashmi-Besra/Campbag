import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Notes } from "../assets/notes";



const Note = () => {

  const { noteId } = useParams();

  const {  currency } = useContext(ShopContext);

  const [noteData, setNoteData] = useState(null);

  const fetchNoteData = () => {

    const item = Notes.find((note) => note._id === noteId);

    if (item) {
      setNoteData(item);
    }

  };

  useEffect(() => {

    fetchNoteData();

  }, [noteId, Notes]);

  return noteData ? (

    <div className="border-t pt-16">

      {/* Main Section */}

      <div className="flex flex-col lg:flex-row gap-10">

        {/* PDF Preview */}

        <div className="lg:w-2/3">

          <div className="border rounded-lg overflow-hidden">

            {

              noteData.pdfAvailable ? (

                <iframe
                  src={noteData.pdfUrl}
                  title="PDF Preview"
                  className="w-full h-[700px]"
                />

              ) : (

                <div className="h-[700px] flex flex-col items-center justify-center bg-gray-100">

                  <p className="text-6xl">📄</p>

                  <p className="mt-4 text-gray-500">

                    PDF Preview Not Available

                  </p>

                </div>

              )

            }

          </div>

        </div>

        {/* Note Information */}

        <div className="lg:w-1/3">

          <h1 className="text-3xl font-semibold">

            {noteData.title}

          </h1>

          <p className="mt-3 text-gray-500">

            {noteData.description}

          </p>

          {/* Academic Details */}

          <div className="mt-8 space-y-4">

            <div className="flex justify-between">

              <span className="font-medium">Branch</span>

              <span>{noteData.branch}</span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">Semester</span>

              <span>{noteData.semester}</span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">Professor</span>

              <span>{noteData.professor || "Not Mentioned"}</span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">Uploaded By</span>

              <span>{noteData.uploadedby}</span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">Pages</span>

              <span>{noteData.pages}</span>

            </div>

            <div className="flex justify-between">

              <span className="font-medium">Views</span>

              <span>{noteData.views}</span>

            </div>

          </div>

          {/* Price */}

          <div className="mt-8">

            {

              noteData.price === 0 ? (

                <h2 className="text-3xl font-bold text-pink-400">

                  FREE

                </h2>

              ) : (

                <h2 className="text-3xl font-bold">

                  {currency}{noteData.price}

                </h2>

              )

            }

          </div>

          {/* Button */}

          <button

            className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"

          >

            {

              noteData.price=== 0

                ?

                "DOWNLOAD NOTES"

                :

                "BUY NOW"

            }

          </button>

        </div>

      </div>

      {/* Description */}

      <div className="mt-14">

        <div className="border-b">

          <p className="font-medium px-5 py-3">

            Description

          </p>

        </div>

        <div className="border border-t-0 px-6 py-6 text-gray-600">

          <p>

            {noteData.description}

          </p>

        </div>

      </div>

      {/* Related Notes */}

      {/* <RelatedNotes

        branch={noteData.branch}

        semester={noteData.semester}

        subCategory={noteData.subCategory}

      /> */}

    </div>

  ) : (

    <div className="opacity-0"></div>

  );

};

export default Note;