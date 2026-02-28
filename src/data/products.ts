export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "ProBook Laptop 15",
    category: "Laptops",
    price: 499,
    description:
      "A budget-friendly 15-inch laptop with 8GB RAM, 256GB SSD, and a Full HD display. Great for everyday tasks, browsing, and light productivity.",
    tags: ["budget", "laptop", "work", "student"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "GameForce RTX 4070 Desktop",
    category: "Desktops",
    price: 1299,
    description:
      "High-performance gaming desktop featuring an RTX 4070 GPU, Intel i7, 16GB DDR5 RAM, and 1TB NVMe SSD. Built for AAA gaming at 1440p.",
    tags: ["gaming", "desktop", "high-performance", "rtx"],
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "SlimAir Ultrabook 14",
    category: "Laptops",
    price: 899,
    description:
      "Ultra-thin 14-inch ultrabook weighing just 2.5 lbs with 12-hour battery life, 16GB RAM, and a stunning 2K OLED display. Perfect for professionals on the go.",
    tags: ["ultrabook", "portable", "business", "premium"],
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "BeatWave Pro Headphones",
    category: "Audio",
    price: 149,
    description:
      "Wireless over-ear headphones with active noise cancellation, 30-hour battery, and Hi-Res Audio support. Ideal for music lovers and remote workers.",
    tags: ["headphones", "wireless", "noise-cancelling", "audio"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "SmartTab 11 Tablet",
    category: "Tablets",
    price: 349,
    description:
      "11-inch tablet with a crisp LCD display, stylus support, 6GB RAM, and 128GB storage. Great for note-taking, reading, and casual gaming.",
    tags: ["tablet", "stylus", "portable", "student"],
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "PowerStation 27 Monitor",
    category: "Monitors",
    price: 399,
    description:
      "27-inch 4K IPS monitor with 99% sRGB coverage, USB-C connectivity, and adjustable stand. Built for creative professionals and developers.",
    tags: ["monitor", "4k", "creative", "usb-c"],
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "MechKey RGB Keyboard",
    category: "Accessories",
    price: 89,
    description:
      "Mechanical keyboard with Cherry MX switches, per-key RGB lighting, and a durable aluminum frame. A must-have for gamers and typists.",
    tags: ["keyboard", "mechanical", "gaming", "rgb"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "CloudNAS 4-Bay Storage",
    category: "Storage",
    price: 599,
    description:
      "4-bay network-attached storage with RAID support, 2.5GbE networking, and remote access app. Perfect for home media servers and small business backups.",
    tags: ["storage", "nas", "backup", "network"],
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "ZenBook Pro 16 Creator",
    category: "Laptops",
    price: 1799,
    description:
      "16-inch creator laptop with Intel i9, RTX 4060, 32GB RAM, and a 3.2K OLED touchscreen. Color-accurate display perfect for video editing and 3D rendering.",
    tags: ["creator", "laptop", "premium", "oled"],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "SwiftType Wireless Mouse",
    category: "Accessories",
    price: 59,
    description:
      "Ergonomic wireless mouse with 4000 DPI sensor, silent clicks, and multi-device Bluetooth support. Works seamlessly on any surface with 6-month battery life.",
    tags: ["mouse", "wireless", "ergonomic", "bluetooth"],
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    name: "SonicBuds ANC Earbuds",
    category: "Audio",
    price: 99,
    description:
      "True wireless earbuds with hybrid ANC, transparency mode, and 8-hour playtime. IPX5 water-resistant with spatial audio support for immersive listening.",
    tags: ["earbuds", "wireless", "noise-cancelling", "portable"],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    name: "UltraWide 34 Curved Monitor",
    category: "Monitors",
    price: 649,
    description:
      "34-inch ultrawide curved WQHD monitor with 165Hz refresh rate, 1ms response, and HDR400. Perfect for immersive gaming and multitasking productivity.",
    tags: ["monitor", "ultrawide", "curved", "gaming"],
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
  },
  {
    id: 13,
    name: "TitanPC Ryzen 9 Desktop",
    category: "Desktops",
    price: 1899,
    description:
      "Workstation-grade desktop with AMD Ryzen 9 7950X, 64GB DDR5, RTX 4080, and 2TB NVMe. Handles heavy multitasking, streaming, and content creation effortlessly.",
    tags: ["desktop", "workstation", "high-performance", "amd"],
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=300&fit=crop",
  },
  {
    id: 14,
    name: "PortaCharge 20K Power Bank",
    category: "Accessories",
    price: 39,
    description:
      "20,000mAh portable charger with 65W USB-C PD fast charging, dual ports, and LED display. Charges laptops and phones on the go — perfect for travel.",
    tags: ["power-bank", "portable", "charging", "travel"],
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop",
  },
  {
    id: 15,
    name: "ProTab 12.9 iPad Killer",
    category: "Tablets",
    price: 699,
    description:
      "12.9-inch tablet with M2 chip, 120Hz mini-LED display, 256GB storage, and keyboard case included. A true laptop replacement for creative professionals.",
    tags: ["tablet", "premium", "creative", "portable"],
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop",
  },
  {
    id: 16,
    name: "ThunderDock USB-C Hub",
    category: "Accessories",
    price: 129,
    description:
      "12-in-1 USB-C docking station with dual HDMI, 100W passthrough charging, Ethernet, SD card slots, and 10Gbps USB-A ports. One cable for your entire desk setup.",
    tags: ["dock", "usb-c", "hub", "productivity"],
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop",
  },
  {
    id: 17,
    name: "SoundBar 5.1 Surround",
    category: "Audio",
    price: 249,
    description:
      "5.1 channel soundbar with wireless subwoofer, Dolby Atmos, and HDMI eARC. Transforms your living room into a home theater experience.",
    tags: ["soundbar", "surround", "home-theater", "dolby"],
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop",
  },
  {
    id: 18,
    name: "FlashDrive 2TB External SSD",
    category: "Storage",
    price: 149,
    description:
      "Pocket-sized 2TB external SSD with 1050MB/s read speeds, USB-C 3.2, and IP65 water/dust resistance. Ultra-fast portable storage for photographers and creators.",
    tags: ["ssd", "portable", "storage", "fast"],
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop",
  },
  {
    id: 19,
    name: "PixelCam 4K Webcam",
    category: "Accessories",
    price: 79,
    description:
      "4K webcam with auto-focus, built-in ring light, noise-cancelling dual mics, and privacy shutter. Crystal-clear video for meetings, streaming, and content creation.",
    tags: ["webcam", "4k", "streaming", "work-from-home"],
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop",
  },
  {
    id: 20,
    name: "GamerPad Elite Controller",
    category: "Accessories",
    price: 69,
    description:
      "Wireless gaming controller with Hall effect joysticks, back paddles, RGB lighting, and tri-mode connectivity. Compatible with PC, Switch, and mobile devices.",
    tags: ["controller", "gaming", "wireless", "rgb"],
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=300&fit=crop",
  },
  {
    id: 21,
    name: "NetMesh Wi-Fi 7 Router",
    category: "Accessories",
    price: 299,
    description:
      "Tri-band Wi-Fi 7 mesh router with 10Gbps speeds, covers up to 5,000 sq ft, and supports 200+ devices. Future-proof networking for smart homes and heavy streaming.",
    tags: ["router", "wifi", "networking", "smart-home"],
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop",
  },
  {
    id: 22,
    name: "MiniPC Stick Pro",
    category: "Desktops",
    price: 349,
    description:
      "Palm-sized mini PC with Intel N100, 16GB RAM, 512GB SSD, and dual display support. Silent fanless design ideal for digital signage, kiosks, and light office work.",
    tags: ["mini-pc", "compact", "silent", "budget"],
    image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&h=300&fit=crop",
  },
  {
    id: 23,
    name: "StudioPro Monitor Arm",
    category: "Accessories",
    price: 49,
    description:
      "Heavy-duty single monitor arm supporting up to 32-inch displays. Full motion articulation, cable management, and quick-release VESA mount for a clean desk setup.",
    tags: ["monitor-arm", "ergonomic", "desk", "productivity"],
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop",
  },
  {
    id: 24,
    name: "BassCore Portable Speaker",
    category: "Audio",
    price: 79,
    description:
      "Rugged Bluetooth speaker with 360° sound, 24-hour battery, IP67 waterproof rating, and built-in power bank. Take the party anywhere — pool, beach, or trail.",
    tags: ["speaker", "bluetooth", "portable", "waterproof"],
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
  },
];
