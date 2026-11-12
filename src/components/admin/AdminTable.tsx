import type { ReactNode } from "react";

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

function AdminTable({ columns, data, onRowClick }: AdminTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b-2 border-[#E8F0E5]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-4 text-left text-xs font-semibold text-[#06452E] uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8F0E5]">
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={`hover:bg-[#F8F9F7] transition-colors ${
                onRowClick ? "cursor-pointer" : ""
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-4 text-sm text-[#5A6C60]">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="px-6 py-12 text-center text-[#7A8C80]">No data available</div>
      )}
    </div>
  );
}

export default AdminTable;
