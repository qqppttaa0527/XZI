import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'tv-1',
    name: '85吋 8K 超高清智慧電視',
    brand: 'SONY',
    category: 'TV',
    price: 89900,
    description: '極致觀影體驗，搭載 AI 影像處理晶片與杜比全景聲。',
    image: 'https://picsum.photos/seed/tv1/800/600',
    specs: ['8K 解析度', 'OLED 面板', '120Hz 刷新率', 'HDMI 2.1'],
    badge: 'HOT'
  },
  {
    id: 'tv-2',
    name: '65吋 4K QLED 遊戲電視',
    brand: 'SAMSUNG',
    category: 'TV',
    price: 32900,
    description: '專為玩家設計，低延遲模式與極高對比度。',
    image: 'https://picsum.photos/seed/tv2/800/600',
    specs: ['4K 解析度', 'QLED 技術', 'VRR 支援', '智慧系統'],
    badge: 'SALE'
  },
  {
    id: 'pc-1',
    name: '旗艦級 電競桌機',
    brand: 'ASUS',
    category: 'Computer',
    price: 58000,
    description: '搭載最新一代處理器與頂級顯示卡，流暢運行所有 3A 大作。',
    image: 'https://picsum.photos/seed/pc1/800/600',
    specs: ['RTX 4080', '32GB DDR5', '2TB NVMe SSD', '水冷散熱'],
    badge: 'NEW'
  },
  {
    id: 'pc-2',
    name: '輕薄商務 筆記型電腦',
    brand: 'MSI',
    category: 'Computer',
    price: 42000,
    description: '極致輕便，長效續航，是您出差辦公的最佳夥伴。',
    image: 'https://picsum.photos/seed/laptop1/800/600',
    specs: ['1.2kg 輕量', '15小時續航', '14吋 2K 螢幕', '指紋辨識']
  },
  {
    id: 'monitor-1',
    name: '34吋 21:9 曲面超寬螢幕',
    brand: 'GIGABYTE',
    category: 'Monitor',
    price: 18500,
    description: '提升工作效率，沉浸式遊戲體驗，多視窗作業更輕鬆。',
    image: 'https://picsum.photos/seed/monitor1/800/600',
    specs: ['WQHD 解析度', '144Hz 刷新率', '1500R 曲率', 'HDR400'],
    badge: 'HOT'
  },
  {
    id: 'monitor-2',
    name: '27吋 4K 專業繪圖螢幕',
    brand: 'DELL',
    category: 'Monitor',
    price: 12900,
    description: '精準色彩還原，適合設計師與攝影師使用。',
    image: 'https://picsum.photos/seed/monitor2/800/600',
    specs: ['4K UHD', '99% Adobe RGB', '硬體校色', 'USB-C 供電']
  }
];
