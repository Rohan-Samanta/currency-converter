import React from "react";
import "../App.css";

function CurrencyRow({
  currencyOption,
  selectCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) {
  return (
    <div>
      <input
        className="input"
        type="number"
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectCurrency} onChange={onChangeCurrency}>
        {currencyOption.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;
