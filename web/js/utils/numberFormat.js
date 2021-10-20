export function formatMoney(value) {
  if (isNaN(value)) { 
    return "R$ 0,00"; 
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}