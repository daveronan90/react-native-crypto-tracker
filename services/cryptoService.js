import axios from "axios";
import moment from "moment";

const formatSparkline = (numbers, current_price_USD) => {
  const sevenDaysAgo = moment().subtract(7, "days").unix();
  let formattedSparkline = numbers.map((number, idx) => ({
    x: sevenDaysAgo + (idx + 1) * 3600,
    y: number * (current_price_USD / numbers[numbers.length - 1]),
  }));
  return formattedSparkline;
};

const formatMarketData = (data) => {
  let formattedData = [];
  data.forEach((item) => {
    const formattedSparkline = formatSparkline(
      item.sparkline_in_7d.price,
      item.current_price
    );

    const formattedItem = {
      ...item,
      sparkline_in_7d: { price: formattedSparkline },
    };
    formattedData.push(formattedItem);
  });
  return formattedData;
};

export const getMarketData = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";

  try {
    const response = await axios.get(url);
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  } catch (error) {
    console.log(error.message);
  }
};
