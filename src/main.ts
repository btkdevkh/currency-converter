// Type--------------------------------------------
type Currency = {
  nom: string
  code: string
  symbole: string
  taux: number
}

// Dom---------------------------------------------
const numEl = document.querySelector("#num")! as HTMLInputElement
const currencyEl = document.querySelector("#currency")! as HTMLSelectElement
const currencyToConvertEl = document.querySelector(
  "#currency-to-convert"
)! as HTMLSelectElement
const resultEl = document.querySelector("#result")! as HTMLParagraphElement

// Data-------------------------------------------
let num: number = 0
let currency: string
let currencyToConvert: string

const dollar: Currency = {
  nom: "Dollar",
  code: "Dol",
  symbole: "$",
  taux: 0.93,
}

const euro: Currency = {
  nom: "Euro",
  code: "Eur",
  symbole: "€",
  taux: 1.08,
}

const lei: Currency = {
  nom: "Romanian Leu",
  code: "Ron",
  symbole: "lei",
  taux: 0.2014,
}

const riel: Currency = {
  nom: "Riel",
  code: "Rie",
  symbole: "៛",
  taux: 0.00024,
}

const currencies: Currency[] = [dollar, euro, lei, riel]

// Func--------------------------------------------
function generateOptSelect(
  htmlEl: HTMLSelectElement,
  currencies: Currency[],
  code: string
) {
  htmlEl.innerHTML = ""
  currencies.forEach((c) => {
    htmlEl.innerHTML += `
      <option 
        value="${c.code}" 
        ${c.code.toLowerCase() === code.toLowerCase() && "selected"}
      >
        ${c.nom} - (${c.symbole})
      </option>
    `
  })
}

function setValue(value: number): number
function setValue(value: string): string
function setValue(value: string | number): string | number {
  return value
}

function convertCurrency(data: {
  rising: number
  currency1: string
  currency2: string
}) {
  const currency1 = currencies.find((c) => data.currency1 === c.code)
  const currency2 = currencies.find((c) => data.currency2 === c.code)

  if (currency1 && currency2) {
    const result = (data.rising * currency1.taux) / currency2.taux
    logResult(result, currency2.symbole)
  }
}

// Events------------------------------------------
generateOptSelect(currencyEl, currencies, "Eur")
generateOptSelect(currencyToConvertEl, currencies, "Dol")
currency = currencyEl.value
currencyToConvert = currencyToConvertEl.value

numEl.addEventListener("input", () => {
  num = setValue(+numEl.value)

  if (num < 0) return

  convertCurrency({
    rising: num,
    currency1: currency,
    currency2: currencyToConvert,
  })
})

currencyEl.addEventListener("change", () => {
  currency = setValue(currencyEl.value)

  convertCurrency({
    rising: num,
    currency1: currency,
    currency2: currencyToConvert,
  })
})

function logResult(result: number, symbole: string) {
  resultEl.innerHTML = ""
  resultEl.innerHTML = `Resultat: <span class="result">${result.toFixed(
    2
  )} ${symbole}</span>`
}

currencyToConvertEl.addEventListener("change", () => {
  currencyToConvert = setValue(currencyToConvertEl.value)

  convertCurrency({
    rising: num,
    currency1: currency,
    currency2: currencyToConvert,
  })
})
