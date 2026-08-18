const ImagePreview = ({
  images,
  setImages,
  setRemovedImages,
}) => {

  const removeImage = (index) => {

    const image = images[index];

    // Existing Cloudinary image
    if (!(image instanceof File)) {
      setRemovedImages((prev) => [
        ...prev,
        image.public_id,
      ]);
    }

    setImages(
      images.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">

      {images.map((image, index) => (

        <div
          key={index}
          className="relative"
        >

          <img
            src={
              image instanceof File
                ? URL.createObjectURL(image)
                : image.url
            }
            alt="Product"
            className="h-28 w-full object-cover rounded-lg"
          />

          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6"
          >
            ×
          </button>

        </div>

      ))}

    </div>
  );
};

export default ImagePreview;