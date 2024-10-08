import TableRow from "./TableRow";
import PropTypes from "prop-types";

const HierarchicalTable = ({ data, setData }) => {
  const updateRowValue = (id, newValue) => {
    const updatedData = data.map((row) => updateRow(row, id, newValue));
    setData(updatedData);
  };

  const updateRow = (row, id, newValue) => {
    if (row.id === id) {
      // parent row to update
      const updatedRow = { ...row, value: newValue };
      // uupdate children values
      if (row.children) {
        const totalChildrenValue = row.children.reduce(
          (sum, child) => sum + child.value,
          0
        );
        // distribute the new value to children
        const ratio = newValue / totalChildrenValue;

        // update children rows
        updatedRow.children = row.children.map((child) => ({
          ...child,
          value: child.value * ratio,
        }));
      }
      return updatedRow;
    } else if (row.children) {
      // child row update recursively
      const updatedChildren = row.children.map((child) =>
        updateRow(child, id, newValue)
      );
      const updatedValue = updatedChildren.reduce(
        (total, child) => total + child.value,
        0
      );
      return { ...row, children: updatedChildren, value: updatedValue };
    }
    return row;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <TableRow key={row.id} row={row} updateRowValue={updateRowValue} />
        ))}
      </tbody>
    </table>
  );
};

HierarchicalTable.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default HierarchicalTable;
