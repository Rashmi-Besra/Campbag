import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";

const defaultFormData = {
  name: "",
  description: "",
  category: "",
  price: "",
  quantity: "",
  branch: "",
  semester: "",
  condition: "",
};

const ProductForm = ({
  initialData = {},
  onSubmit,
  submitButtonText = "Save Product",
}) => {

  const [formData, setFormData] = useState(defaultFormData);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        ...defaultFormData,
        ...initialData,
      });

      // If editing an existing product,
      // show existing image URLs
      if (initialData.image) {
        setImages(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    images.forEach((image) => {
      // Upload only newly selected files
      if (image instanceof File) {
        data.append("images", image);
      }
    });

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-8 space-y-6"
    >
      {/* Product Name */}
      <div>
        <label className="block font-medium mb-2">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Images */}
      <div>
        <ImageUploader
          images={images}
          setImages={setImages}
        />

        <ImagePreview
          images={images}
          setImages={setImages}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-2">
          Description
        </label>

        <textarea
          name="description"
          rows="4"
          placeholder="Write product description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Price & Quantity */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block font-medium mb-2">
            Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            placeholder="Available quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

      </div>

      {/* Category & Condition */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block font-medium mb-2">
            Category
          </label>

          <input
            type="text"
            name="category"
            placeholder="e.g. Notes, Electronics"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Condition
          </label>

          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>

      </div>

      {/* Branch & Semester */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block font-medium mb-2">
            Branch
          </label>

          <input
            type="text"
            name="branch"
            placeholder="e.g. CSE"
            value={formData.branch}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Semester
          </label>

          <input
            type="number"
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default ProductForm;