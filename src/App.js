import { useState } from "react";

const TableGenerator = () => {
  const [columns, setColumns] = useState([
    { name: "", data: "" },
    { name: "", data: "" },
  ]);
  const [tableData, setTableData] = useState([]);

  // 更新指定列的数据
  const handleColumnDataChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index].data = value;
    setColumns(newColumns);
  };

  // 更新指定列的名称
  const handleColumnNameChange = (index, name) => {
    const newColumns = [...columns];
    newColumns[index].name = name;
    setColumns(newColumns);
  };

  // 添加新列
  const handleAddColumn = () => {
    setColumns([...columns, { name: `列 ${columns.length + 1}`, data: "" }]);
  };

  // 删除指定列
  const handleRemoveColumn = (index) => {
    setColumns(columns.filter((_, colIndex) => colIndex !== index));
  };

  // 生成表格数据
  const handleGenerateTable = () => {
    const rowsCount = Math.max(
      ...columns.map(
        (col) => col.data.split("\n").filter((row) => row.trim()).length
      )
    );
    const data = Array.from({ length: rowsCount }, (_, rowIndex) =>
      Object.fromEntries(
        columns.map((col, colIndex) => [
          col.name,
          col.data.split("\n")[rowIndex] || "",
        ])
      )
    );
    setTableData(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 列输入区域 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {columns.map((col, index) => (
          <div key={index}>
            <label className="block text-sm font-medium mb-2">
              列名
              <input
                className="w-full p-2 border rounded-md"
                value={col.name}
                onChange={(e) => handleColumnNameChange(index, e.target.value)}
                placeholder={`列 ${index + 1}`}
              />
            </label>
            <label className="block text-sm font-medium mb-2">
              {col.name} 数据 (每行一个)
            </label>
            <textarea
              className="w-full h-48 p-2 border rounded-md"
              value={col.data}
              onChange={(e) => handleColumnDataChange(index, e.target.value)}
              placeholder="每行一个数据"
            />
            {columns.length > 2 && (
              <button
                onClick={() => handleRemoveColumn(index)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                删除此列
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 添加新列按钮 */}
      <button
        onClick={handleAddColumn}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        添加新列
      </button>

      {/* 生成表格按钮 */}
      <button
        onClick={handleGenerateTable}
        className="mb-6 ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        生成表格
      </button>

      {/* 表格输出 */}
      {tableData.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 font-mono text-sm text-orange-500"
                    >
                      {row[col.name]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableGenerator;
