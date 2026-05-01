/**
 * Encapsulation for Restaurant Data Models
 */

export class Customer {
  constructor({ id, customerName, email, phone, loyalty }) {
    this.id = id;
    this.customerName = customerName;
    this.email = email;
    this.phone = phone;
    this.loyalty = loyalty;
  }

  get isGoldMember() {
    return this.loyalty === "Gold";
  }

  get displayName() {
    return `${this.customerName} (${this.loyalty})`;
  }

  static fromJSON(json) {
    return new Customer(json);
  }
}

export class Order {
  constructor({ id, customerName, status, totalPrice, orderDate }) {
    this.id = id;
    this.customerName = customerName;
    this.status = status;
    this.totalPriceRaw = typeof totalPrice === 'string' ? parseInt(totalPrice.replace(/[^\d]/g, '')) : totalPrice;
    this.orderDate = orderDate;
  }

  get formattedTotal() {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(this.totalPriceRaw);
  }

  get isCompleted() {
    return this.status === "Completed";
  }

  static fromJSON(json) {
    return new Order(json);
  }
}

export class MenuItem {
  constructor({ id, name, kategori, harga, status, image }) {
    this.id = id;
    this.name = name;
    this.kategori = kategori;
    this.harga = parseInt(harga);
    this.status = status;
    this.image = image;
  }

  get isAvailable() {
    return this.status === "Tersedia";
  }

  get formattedPrice() {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(this.harga);
  }

  static fromJSON(json) {
    return new MenuItem(json);
  }
}

/**
 * Restaurant Service (Encapsulation of Data Operations)
 */
export const RestaurantService = {
  // Simulating fetching data
  getOrders: (rawData) => rawData.map(o => Order.fromJSON(o)),
  getCustomers: (rawData) => rawData.map(c => Customer.fromJSON(c)),
  
  createOrder: (data, currentOrders) => {
    const newOrder = new Order({
        id: `#ORD-${1000 + currentOrders.length}`,
        customerName: data.customerName,
        status: data.status,
        totalPrice: data.totalPrice,
        orderDate: new Date().toISOString().split('T')[0]
    });
    return [newOrder, ...currentOrders];
  },

  deleteItem: (id, list) => list.filter(item => item.id !== id),

  search: (query, list, keys) => {
    return list.filter(item => 
        keys.some(key => String(item[key]).toLowerCase().includes(query.toLowerCase()))
    );
  }
};
