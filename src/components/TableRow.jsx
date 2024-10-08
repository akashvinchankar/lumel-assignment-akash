import { useState } from "react";
import PropTypes from "prop-types";

const TableRow = ({ row, updateRowValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [originalValue] = useState(row.value);

  const handlePercentageUpdate = () => {
    // 800 + 800 * (10 / 100) = 880
    const updatedValue = row.value + row.value * (parseFloat(inputValue) / 100);
    updateRowValue(row.id, updatedValue);
  };

  const handleValueUpdate = () => {
    // 800 + 10 = 810
    const updatedValue = parseFloat(inputValue);
    updateRowValue(row.id, updatedValue);
  };

  // 1000 - 2000 / 1000 * 100 = 100%
  const variancePercentage =
    ((row.value - originalValue) / originalValue) * 100;

  return (
    <>
      <tr>
        <td>{!row.children ? `-- ${row.label}` : row.label}</td>
        <td>{row.value.toFixed(4)}</td>
        <td>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </td>
        <td>
          <button onClick={handlePercentageUpdate}>Allocation %</button>
        </td>
        <td>
          <button onClick={handleValueUpdate}>Allocation Val</button>
        </td>
        <td>{variancePercentage.toFixed(2)}%</td>
      </tr>
      {row.children &&
        row.children.map((child) => (
          <TableRow
            key={child.id}
            row={child}
            updateRowValue={updateRowValue}
          />
        ))}
    </>
  );
};

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  updateRowValue: PropTypes.func.isRequired,
};

export default TableRow;
