const add = require('date-fns/add')

const date = {
  name: 'F Cl SO4',
  date: new Date(),
  location: 'HL',
  weight: {
    amount: 2,
    unit: 'g'
  },
  finalWeight: {
    amount: 999.7,
    unit: 'g'
  },
  concentration: {
    amount: 2,
    unit: 'ppb'
  },
  expiration: add(new Date(),{days: 1}),
  balance: 'b13',
  externalParentPath: 'Reagent',
  parent: 1134,
}

console.log(JSON.stringify(date))