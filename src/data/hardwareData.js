export const hardwareProducts = [
  {
    id: 'barcode-label-38x25-tsc-dt',
    category: 'Other Accessories',
    name: '38×25 TSC DT Barcode Label',
    spec: 'Direct thermal barcode label roll suitable for retail products, pricing, inventory and shelf labelling.',
    price: 850,
    warranty: 'Consumable item',
    stockStatus: 'In stock',
    inStock: true,
    featured: false,
    image: '/images/hardware/barcode-label-38x25.png',
    compatibilityType: 'labels',
  },
  {
    id: 'cash-drawer-5-bill-4-coin',
    category: 'Other Accessories',
    name: 'Cash Drawer – 5 Bill / 4 Coin',
    spec: 'Durable POS cash drawer with five note compartments, four coin compartments and receipt-printer connection.',
    price: 14500,
    warranty: '6 months warranty',
    stockStatus: 'In stock',
    inStock: true,
    featured: true,
    image: '/images/hardware/cash-drawer-5-bill-4-coin.png',
    compatibilityType: 'cash-drawer',
  },
  {
    id: 'hp-small-form-factor-computer',
    category: 'Computers',
    name: 'HP Small Form Factor Computer',
    spec: 'Intel Core i3 business desktop computer with 8GB RAM, SSD storage, USB connectivity and Windows support.',
    price: 45000,
    warranty: '3 months warranty',
    stockStatus: 'In stock',
    inStock: true,
    featured: true,
    image: '/images/hardware/hp-small-form-factor-computer.png',
    compatibilityType: 'computer',
  },
  {
    id: 'luckydoor-l-500r-barcode-scanner',
    category: 'Barcode Scanners',
    name: 'LUCKYDOOR L-500R Desktop Barcode Scanner',
    spec: 'Omnidirectional desktop barcode scanner with fast hands-free scanning for retail counters and supermarkets.',
    price: 14500,
    warranty: '6 months warranty',
    stockStatus: 'In stock',
    inStock: true,
    featured: false,
    image: '/images/hardware/luckydoor-l-500r-scanner.png',
    compatibilityType: 'scanner',
  },
  {
    id: 'thermal-paper-roll',
    category: 'Other Accessories',
    name: 'Thermal Paper Roll',
    spec: 'High-quality thermal paper roll suitable for POS receipt printers, billing counters and retail use.',
    price: 300,
    warranty: 'Consumable item',
    stockStatus: 'In stock',
    inStock: true,
    featured: false,
    image: '/images/hardware/thermal-paper-roll.png',
    compatibilityType: 'receipt-paper',
  },
  {
    id: 'wired-handheld-barcode-scanner',
    category: 'Barcode Scanners',
    name: 'Wired Handheld Barcode Scanner',
    spec: 'USB wired handheld barcode scanner with fast and accurate scanning for products, inventory and checkout.',
    price: 10500,
    warranty: '6 months warranty',
    stockStatus: 'In stock',
    inStock: true,
    featured: false,
    image: '/images/hardware/wired-handheld-barcode-scanner.png',
    compatibilityType: 'scanner',
  },
  {
    id: 'xprinter-xp-365b-printer',
    category: 'POS Printers',
    name: 'Xprinter XP-365B Dual-mode Label & Receipt Printer',
    spec: 'USB direct-thermal printer supporting barcode labels and receipts, suitable for retail and inventory operations.',
    price: 24999,
    warranty: '1 year warranty',
    stockStatus: 'In stock',
    inStock: true,
    featured: true,
    image: '/images/hardware/xprinter-xp-365b.png',
    compatibilityType: 'label-printer',
  },
  {
    id: 'xprinter-xp-q831l-printer',
    category: 'POS Printers',
    name: 'Xprinter XP-Q831L 80mm Thermal Receipt Printer',
    spec: 'High-speed 80mm thermal POS receipt printer with USB connectivity and automatic paper cutting.',
    price: 18500,
    warranty: '1 year warranty',
    stockStatus: 'In stock',
    inStock: true,
    featured: false,
    image: '/images/hardware/xprinter-xp-q831l.png',
    compatibilityType: 'receipt-printer',
  },
  {
    id: 'xprinter-xp-t80q-printer',
    category: 'POS Printers',
    name: 'Xprinter XP-T80Q 80mm Thermal Receipt Printer',
    spec: 'Reliable 80mm thermal receipt printer designed for POS billing, retail counters, cafés and restaurants.',
    price: 17500,
    warranty: '1 year warranty',
    stockStatus: 'In stock',
    inStock: true,
    featured: false,
    image: '/images/hardware/xprinter-xp-t80q.png',
    compatibilityType: 'receipt-printer',
  },
  {
    id: 'line-interactive-ups-1200va',
    category: 'Other Accessories',
    name: '1200VA Line-interactive UPS',
    spec: 'Reliable backup power and voltage protection for a POS computer, receipt printer and network equipment.',
    price: 27500,
    warranty: '1 year warranty',
    stockStatus: 'In stock',
    inStock: true,
    featured: true,
    image: '/images/hardware/line-interactive-ups-1200va.png',
    compatibilityType: 'ups',
  },
];

export const hardwareCategories = [
  {
    id: 'all',
    name: 'All Products',
  },
  {
    id: 'barcode-scanners',
    name: 'Barcode Scanners',
  },
  {
    id: 'computers',
    name: 'Computers',
  },
  {
    id: 'other-accessories',
    name: 'Other Accessories',
  },
  {
    id: 'pos-printers',
    name: 'POS Printers',
  },
];

export const purchaseOptions = [
  {
    id: 'software',
    title: 'Software Only',
    description:
      'Choose a Starter, Professional or Enterprise POS software package without purchasing hardware.',
    path: '/pos-hardware/builder?type=software',
  },
  {
    id: 'hardware',
    title: 'Hardware Only',
    description:
      'Choose individual POS hardware products for an existing software system.',
    path: '/pos-hardware?type=hardware',
  },
  {
    id: 'complete',
    title: 'Complete POS Setup',
    description:
      'Build a complete POS solution by combining a software package with compatible hardware.',
    path: '/pos-hardware/builder?type=complete',
  },
];

export const minimumPosRequirements = [
  {
    type: 'computer',
    title: 'Computer or POS Terminal',
    required: true,
    message:
      'A compatible computer or POS terminal is required to run the POS software.',
  },
  {
    type: 'scanner',
    title: 'Barcode Scanner',
    required: true,
    message:
      'A barcode scanner is required for faster and more accurate product billing.',
  },
  {
    type: 'receipt-printer',
    title: 'Receipt Printer',
    required: true,
    message:
      'A receipt printer is required to provide printed customer receipts.',
  },
  {
    type: 'ups',
    title: 'UPS Power Backup',
    required: true,
    message:
      'A UPS is required to protect the POS computer, printer and transaction data from power failures and voltage fluctuations.',
  },
  {
    type: 'cash-drawer',
    title: 'Cash Drawer',
    required: false,
    message:
      'A cash drawer is recommended for securely managing cash payments.',
  },
];

export function formatLkr(amount) {
  return `Rs. ${Number(amount).toLocaleString('en-LK')}`;
}