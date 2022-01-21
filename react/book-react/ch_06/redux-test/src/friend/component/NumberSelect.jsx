import React from 'react';

const NumberSelect = ({ value, options, postfix, onChange }) => {
  return (
    <div>
      <select
        onChange={e => {
          const value = Number(e.currentTarget.value);
          onChange(value);  // 부모 컴포넌트에 이벤트 전달
        }}
        value={value}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {postfix}
    </div>
  );
};

export default NumberSelect;
