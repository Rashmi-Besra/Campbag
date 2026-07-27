const ImagePreview = ({
  images,
  setImages,
}) => {

  const removeImage = (index) => {

    setImages(
      images.filter((_, i) => i !== index)
    );

  };

  return (

    <div className="grid grid-cols-4 gap-4 mt-4">

      {
        images.map((image, index) => (

          <div
            key={index}
            className="relative"
          >

            <img
              src={  image instanceof File
    ? URL.createObjectURL(image)
    : image}
              alt=""
              className="h-28 w-full object-cover rounded-lg"
            />

            <button

              onClick={() => removeImage(index)}

              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6"

            >

              ×

            </button>

          </div>

        ))
      }

    </div>

  );

};

export default ImagePreview;