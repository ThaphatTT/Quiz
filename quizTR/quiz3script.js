const tableCreate = document.getElementById("table-create");

const array1 = [
  {
    code: "101",
    name: "AAA",
  },
  {
    code: "102",
    name: "BBB",
  },
  {
    code: "103",
    name: "CCC",
  },
];

const array2 = [
  {
    code: "103",
    city: "Singapore",
  },
  {
    code: "102",
    city: "Tokyo",
  },
  {
    code: "101",
    city: "Bangkok",
  },
];

const array3 = array1.map((element1) => {
  let element2 = array2.find((element2) => {
    return element2.code === element1.code;
  });
  return { ...element1, city: element2.city };
});
tableCreate.innerHTML += array3
  .map(
    (element1) => `
    <tr>
    <th>${element1.code}</th>
    <th>${element1.name}</th>
    <th>${element1.city}</th>
    </tr>
  `
  )
  .join("");
