const ImageUploader = ({ images, setImages }) => {

  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

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
      />

    </div>

  );

};

export default ImageUploader;