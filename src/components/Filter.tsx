import React from "react";

function Filter() {
  return (
    <div>
      <select name="select" className="mb-6 border border-red-700">
        <option value="value1">Value 1</option>
        <option value="value2" selected>
          Value 2
        </option>
        <option value="value3">Value 3</option>
      </select>
    </div>
  );
}

export default Filter;
