const ImageUploader = ({ images, setImages }) => {

  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

    const remainingSlots = 4 - images.length;

    const selectedFiles = files.slice(0, remainingSlots);

    setImages((prev) => [
      ...prev,
      ...selectedFiles
    ]);

    e.target.value = "";
  };

  return (

    <div>

      <label className="block mb-2 font-medium">
        Product Images
      </label>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        disabled={images.length >= 4}
      />

      <p className="text-sm text-gray-500 mt-1">
        {images.length}/4 images
      </p>

    </div>

  );
};

export default ImageUploader;