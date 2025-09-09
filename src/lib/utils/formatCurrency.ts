export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSalaryRange(salaryFrom: number | null, salaryTo: number | null): string {
  if (!salaryFrom && !salaryTo) {
    return "Salary not specified";
  }
  
  if (salaryFrom && salaryTo) {
    return `${formatCurrency(salaryFrom)} - ${formatCurrency(salaryTo)}`;
  }
  
  if (salaryFrom) {
    return `From ${formatCurrency(salaryFrom)}`;
  }
  
  if (salaryTo) {
    return `Up to ${formatCurrency(salaryTo)}`;
  }
  
  return "Salary not specified";
}
