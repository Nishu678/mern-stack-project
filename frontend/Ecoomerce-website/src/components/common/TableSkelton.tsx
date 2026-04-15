import * as React from "react";

type TableSkeletonProps = {
  rows?: number;
  cols?: number;
};

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  cols = 4,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <td key={colIndex} className="p-2">
              <div className="h-6 w-full animate-pulse rounded bg-gray-100 dark:bg-muted" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
