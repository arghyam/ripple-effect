

const SkeletonLoader = () => (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="animate-pulse flex gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-8 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );


  export default SkeletonLoader