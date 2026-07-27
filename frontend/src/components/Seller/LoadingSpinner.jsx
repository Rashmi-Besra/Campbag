const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-600 text-lg">
        Loading Products...
      </p>
    </div>
  );
};

export default LoadingSpinner;