// import ExchangeRateServices from "../services/ExchangeRateServices"

/** Parse number to CLP currency */
export const parseToCLPCurrency = (number) => {
	return new Intl.NumberFormat('es-CL', {
	  style: 'currency',
	  currency: 'CLP',
	}).format(number);
  };

/** Parse CLP to UF */
export const clpToUf = (clpValue, ufValue) => {
	return (Math.round((clpValue / ufValue) * 100) / 100000).toFixed(2);
  };
