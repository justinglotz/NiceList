import Skeleton from '../../ui/skeleton';

export default function SkeletonDashboardCard() {
  return (
    <div>
      <div className="w-[300px] h-[300px] bg-[#1e1e1e] rounded-[12px] transition-all duration-300">
        <div className="flex flex-row h-[136px] w-full">
          <div className="w-[175px] flex items-start">
            <Skeleton className="h-[18px] w-2/3 mx-[22px] mt-[22px] bg-gray-700" />
          </div>
          <div className="w-[125px] flex items-center justify-center">
            <Skeleton className="h-[80px] w-[80px] rounded-full bg-gray-700" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 px-4">
          <Skeleton className="h-[50px] w-full bg-gray-700 rounded-md" />
          <Skeleton className="h-[50px] w-full bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}
