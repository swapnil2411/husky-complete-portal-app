import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // or your existing icon component
import EmptyState from "./EmptyState"; // optional, or import from shared location

const Table = ({ columns, data, onRowSelect, activeFilter }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const toggleRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedRows(newSelected);
    onRowSelect?.(Array.from(newSelected));
  };

  const toggleAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const allIds = new Set(data.map((item) => item.id));
      setSelectedRows(allIds);
      onRowSelect?.(Array.from(allIds));
    }
  };

  return (
    <div className="table-container admin_list_table">
      <table className="table">
        <thead className="table__head">
          <tr>
            <th className="table__th table__th--checkbox">
              <input
                type="checkbox"
                checked={data.length > 0 && selectedRows.size === data.length}
                onChange={toggleAll}
                className="table__checkbox"
              />
            </th>
            {columns.map((col, i) => (
              <th key={i} className="table__th">
                <div className="table__th-content">
                  {col.header}
                  {col.sortable && <ChevronDown className="table__sort-icon" />}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="table__body">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="empty_cell">
                <EmptyState activeFilter={activeFilter} />
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="table__row">
                <td className="table__td">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="table__checkbox"
                  />
                </td>
                {columns.map((col, i) => (
                  <td key={i} className="table__td">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
