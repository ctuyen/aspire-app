let startNumber = 1234123412342020;

const getMyCard = () => {
  return new Promise((resolve, reject) => {
    resolve([
      {
        holderName: "Mark Henry",
        number: "1234123412342020",
        thruDate: "12/2020",
        CVV: "123",
        balance: "3,000",
        status: "active",
        transactions: [
          {
            id: "1",
            name: "Hamley",
            date: "20 May 2020",
            type: "refund",
            amount: 150,
            icon: "file-storage.svg",
          },
          {
            id: "2",
            name: "Hamley",
            date: "20 May 2020",
            type: "charge",
            amount: 150,
            icon: "business-and-finance.svg",
          },
          {
            id: "3",
            name: "Hamley",
            date: "20 May 2020",
            type: "charge",
            amount: 150,
            icon: "file-storage.svg",
          },
          {
            id: "4",
            name: "Hamley",
            date: "20 May 2020",
            type: "charge",
            amount: 150,
            icon: "file-storage.svg",
          },
        ],
      },
    ]);
  });
};
const addMyCard = (holderName) => {
  return new Promise((resolve, reject) => {
    const newCard = {
      holderName,
      number: (++startNumber).toString(),
      thruDate: "12/2020",
      CVV: "123",
      balance: "0",
      status: "active",
      transactions: [],
    };
    // adding new card to DB and return new card
    resolve(newCard);
  });
};
const cancelMyCard = (cardNumber) => {
  return new Promise((resolve, reject) => {
    // remove card in DB and return removed card number
    resolve(cardNumber);
  });
};
const getCompanyCards = () => {
  return new Promise((resolve, reject) => {
    resolve([]);
  });
};

export { getMyCard, addMyCard, getCompanyCards, cancelMyCard };
