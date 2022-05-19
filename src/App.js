import "./App.css";
import React, { useEffect, useState } from "react";
import { HiSwitchVertical } from "react-icons/hi";
import CurrencyRow from "./components/CurrencyRow";

const myHeaders = new Headers();
myHeaders.append("apikey", "XzmiSPcMyrJKticTyH7VUhqJafpfOitm");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

const BASE_URL =
  "https://api.apilayer.com/exchangerates_data/latest?symbols=%20AED%2C%20%20%20%20%20AFN%2C%20%20%20%20%20ALL%2C%20%20%20%20%20AMD%2C%20%20%20%20%20ANG%2C%20%20%20%20%20AOA%2C%20%20%20%20%20ARS%2C%20%20%20%20%20AUD%2C%20%20%20%20%20AWG%2C%20%20%20%20%20AZN%2C%20%20%20%20%20BAM%2C%20%20%20%20%20BBD%2C%20%20%20%20%20BDT%2C%20%20%20%20%20BGN%2C%20%20%20%20%20BHD%2C%20%20%20%20%20BIF%2C%20%20%20%20%20BMD%2C%20%20%20%20%20BND%2C%20%20%20%20%20BOB%2C%20%20%20%20%20BRL%2C%20%20%20%20%20BSD%2C%20%20%20%20%20BTC%2C%20%20%20%20%20BTN%2C%20%20%20%20%20BWP%2C%20%20%20%20%20BYN%2C%20%20%20%20%20BYR%2C%20%20%20%20%20BZD%2C%20%20%20%20%20CAD%2C%20%20%20%20%20CDF%2C%20%20%20%20%20CHF%2C%20%20%20%20%20CLF%2C%20%20%20%20%20CLP%2C%20%20%20%20%20CNY%2C%20%20%20%20%20COP%2C%20%20%20%20%20CRC%2C%20%20%20%20%20CUC%2C%20%20%20%20%20CUP%2C%20%20%20%20%20CVE%2C%20%20%20%20%20CZK%2C%20%20%20%20%20DJF%2C%20%20%20%20%20DKK%2C%20%20%20%20%20DOP%2C%20%20%20%20%20DZD%2C%20%20%20%20%20EGP%2C%20%20%20%20%20ERN%2C%20%20%20%20%20ETB%2C%20%20%20%20%20EUR%2C%20%20%20%20%20FJD%2C%20%20%20%20%20FKP%2C%20%20%20%20%20GBP%2C%20%20%20%20%20GEL%2C%20%20%20%20%20GGP%2C%20%20%20%20%20GHS%2C%20%20%20%20%20GIP%2C%20%20%20%20%20GMD%2C%20%20%20%20%20GNF%2C%20%20%20%20%20GTQ%2C%20%20%20%20%20GYD%2C%20%20%20%20%20HKD%2C%20%20%20%20%20HNL%2C%20%20%20%20%20HRK%2C%20%20%20%20%20HTG%2C%20%20%20%20%20HUF%2C%20%20%20%20%20IDR%2C%20%20%20%20%20ILS%2C%20%20%20%20%20IMP%2C%20%20%20%20%20INR%2C%20%20%20%20%20IQD%2C%20%20%20%20%20IRR%2C%20%20%20%20%20ISK%2C%20%20%20%20%20JEP%2C%20%20%20%20%20JMD%2C%20%20%20%20%20JOD%2C%20%20%20%20%20JPY%2C%20%20%20%20%20KES%2C%20%20%20%20%20KGS%2C%20%20%20%20%20KHR%2C%20%20%20%20%20KMF%2C%20%20%20%20%20KPW%2C%20%20%20%20%20KRW%2C%20%20%20%20%20KWD%2C%20%20%20%20%20KYD%2C%20%20%20%20%20KZT%2C%20%20%20%20%20LAK%2C%20%20%20%20%20LBP%2C%20%20%20%20%20LKR%2C%20%20%20%20%20LRD%2C%20%20%20%20%20LSL%2C%20%20%20%20%20LTL%2C%20%20%20%20%20LVL%2C%20%20%20%20%20LYD%2C%20%20%20%20%20MAD%2C%20%20%20%20%20MDL%2C%20%20%20%20%20MGA%2C%20%20%20%20%20MKD%2C%20%20%20%20%20MMK%2C%20%20%20%20%20MNT%2C%20%20%20%20%20MOP%2C%20%20%20%20%20MRO%2C%20%20%20%20%20MUR%2C%20%20%20%20%20MVR%2C%20%20%20%20%20MWK%2C%20%20%20%20%20MXN%2C%20%20%20%20%20MYR%2C%20%20%20%20%20MZN%2C%20%20%20%20%20NAD%2C%20%20%20%20%20NGN%2C%20%20%20%20%20NIO%2C%20%20%20%20%20NOK%2C%20%20%20%20%20NPR%2C%20%20%20%20%20NZD%2C%20%20%20%20%20OMR%2C%20%20%20%20%20PAB%2C%20%20%20%20%20PEN%2C%20%20%20%20%20PGK%2C%20%20%20%20%20PHP%2C%20%20%20%20%20PKR%2C%20%20%20%20%20PLN%2C%20%20%20%20%20PYG%2C%20%20%20%20%20QAR%2C%20%20%20%20%20RON%2C%20%20%20%20%20RSD%2C%20%20%20%20%20RUB%2C%20%20%20%20%20RWF%2C%20%20%20%20%20SAR%2C%20%20%20%20%20SBD%2C%20%20%20%20%20SCR%2C%20%20%20%20%20SDG%2C%20%20%20%20%20SEK%2C%20%20%20%20%20SGD%2C%20%20%20%20%20SHP%2C%20%20%20%20%20SLL%2C%20%20%20%20%20SOS%2C%20%20%20%20%20SRD%2C%20%20%20%20%20STD%2C%20%20%20%20%20SVC%2C%20%20%20%20%20SYP%2C%20%20%20%20%20SZL%2C%20%20%20%20%20THB%2C%20%20%20%20%20TJS%2C%20%20%20%20%20TMT%2C%20%20%20%20%20TND%2C%20%20%20%20%20TOP%2C%20%20%20%20%20TRY%2C%20%20%20%20%20TTD%2C%20%20%20%20%20TWD%2C%20%20%20%20%20TZS%2C%20%20%20%20%20UAH%2C%20%20%20%20%20UGX%2C%20%20%20%20%20USD%2C%20%20%20%20%20UYU%2C%20%20%20%20%20UZS%2C%20%20%20%20%20VEF%2C%20%20%20%20%20VND%2C%20%20%20%20%20VUV%2C%20%20%20%20%20WST%2C%20%20%20%20%20XAF%2C%20%20%20%20%20XAG%2C%20%20%20%20%20XAU%2C%20%20%20%20%20XCD%2C%20%20%20%20%20XDR%2C%20%20%20%20%20XOF%2C%20%20%20%20%20XPF%2C%20%20%20%20%20YER%2C%20%20%20%20%20ZAR%2C%20%20%20%20%20ZMK%2C%20%20%20%20%20ZMW%2C%20%20%20%20%20ZWL%2C&base=eur";

function App() {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  // console.log(currencyOption);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOption([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}&base=${fromCurrency}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function flip() {
    var temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOption={currencyOption}
        selectCurrency={fromCurrency}
        amount={fromAmount}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equal">
        <HiSwitchVertical onClick={() => flip()} />
      </div>

      <CurrencyRow
        currencyOption={currencyOption}
        selectCurrency={toCurrency}
        amount={toAmount}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
