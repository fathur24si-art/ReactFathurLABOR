export const ordersData = Array.from({ length: 30 }, (_, i) => ({
  id: `#ORD-${1000 + i}`,
  customerName: ["Agus", "Siti", "Rahmat", "Budi", "Dewi", "Eko", "Ani", "Joko", "Iwan", "Lestari"][i % 10],
  status: ["Pending", "Completed", "Cancelled"][i % 3],
  totalPrice: `Rp ${(Math.random() * 200 + 50).toFixed(0)}.000`,
  orderDate: `2025-04-${(i % 28) + 1}`,
}));

export const customersData = Array.from({ length: 30 }, (_, i) => ({
  id: `#CUS-${2000 + i}`,
  customerName: ["Andi", "Maya", "Taufik", "Yanti", "Fajar", "Dina", "Hendra", "Rina", "Bambang", "Ratna"][i % 10],
  email: `user${i}@email.com`,
  phone: `0812-3456-${7890 + i}`,
  loyalty: ["Bronze", "Silver", "Gold"][i % 3],
}));
