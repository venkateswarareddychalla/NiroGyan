const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-gray-700 mb-2">Finding doctors for you...</p>
        <p className="text-gray-500">Please wait while we load the best healthcare professionals</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
