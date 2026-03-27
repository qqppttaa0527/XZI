import { useState, useMemo } from 'react';
import { ShoppingCart, Search, Monitor, Tv, Laptop, X, Plus, Minus, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'TV' | 'Computer' | 'Monitor'>('All');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [systemUptime, setSystemUptime] = useState(0);

  // Simulate system uptime
  useMemo(() => {
    const interval = setInterval(() => {
      setSystemUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesBrand = activeBrand === 'All' || p.brand === activeBrand;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [activeCategory, activeBrand, searchQuery]);

  const brands = useMemo(() => {
    const b = new Set(PRODUCTS.map(p => p.brand));
    return ['All', ...Array.from(b)];
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen circuit-bg relative overflow-hidden">
      {/* Global Scanline */}
      <div className="scanline pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#02040a]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-accent blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-slate-900 p-2.5 border border-accent/30 rounded-lg">
                  <div className="w-8 h-8 relative">
                    {/* Stylized X Logo SVG - Enhanced */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00f2ff" />
                          <stop offset="100%" stopColor="#bc13fe" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <path d="M15 15 L85 85 M85 15 L15 85" stroke="url(#logo-grad)" strokeWidth="10" strokeLinecap="square" filter="url(#glow)" />
                      <path d="M50 10 L50 25 M50 75 L50 90 M10 50 L25 50 M75 50 L90 50" stroke="#00f2ff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
                      <rect x="45" y="45" width="10" height="10" fill="#bc13fe" className="animate-pulse" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-[0.15em] text-white uppercase italic">
                  XZI <span className="text-accent">TECH</span>
                </span>
                <span className="text-[10px] font-medium tracking-[0.4em] text-slate-400 mt-1">
                  宜智創新科技
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center flex-1 max-w-md mx-12">
              <div className="relative w-full group">
                <div className="absolute inset-0 bg-accent/5 blur-xl group-focus-within:bg-accent/10 transition-all" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent w-4 h-4" />
                <input
                  type="text"
                  placeholder="[ 搜尋核心資料庫 ]"
                  className="relative w-full pl-12 pr-4 py-3 bg-slate-900/80 border border-white/10 rounded-none focus:border-accent/50 focus:ring-0 transition-all text-xs font-mono text-accent placeholder:text-slate-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="hidden xl:flex flex-col items-end font-mono text-[9px] text-slate-500 tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  SYSTEM_UPTIME: {formatUptime(systemUptime)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                  CORE_TEMP: 32.4°C
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-400 hover:text-accent transition-all hover:scale-110"
                id="cart-button"
              >
                <ShoppingCart className="w-7 h-7" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent to-accent-purple text-primary text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-32 overflow-hidden border-b border-white/5">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/4 w-full h-full bg-accent/10 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-accent-purple/10 blur-[120px] rounded-full"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-none text-accent text-[10px] font-mono mb-8 tracking-[0.2em]">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                XZI_PROTOCOL_ACTIVE
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter text-white uppercase italic">
                Innovation <br />
                <span className="neon-text">Redefined</span>
              </h1>
              <p className="text-slate-400 text-xl mb-12 font-medium leading-relaxed max-w-lg border-l-2 border-accent/30 pl-6">
                宜智創新科技：為未來而生。我們提供最尖端的視覺系統與核心處理單元，重塑您的數位邊界。
              </p>
              <div className="flex flex-wrap gap-8">
                <button className="group relative px-12 py-5 bg-transparent overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-purple opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-primary font-black uppercase tracking-[0.3em] text-sm flex items-center gap-3">
                    探索核心 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <div className="flex items-center gap-6 text-slate-500 font-mono text-[10px] tracking-widest">
                  <div className="flex flex-col">
                    <span className="text-white text-lg font-bold">0.1ms</span>
                    <span>LATENCY</span>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-white text-lg font-bold">8K+</span>
                    <span>RESOLUTION</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 p-1 bg-gradient-to-br from-accent/50 to-accent-purple/50 rounded-3xl">
                <div className="bg-slate-950 rounded-[22px] overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/xzi-tech/800/600" 
                    alt="XZI Tech Visual" 
                    className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              {/* Decorative Logo Overlay */}
              <div className="absolute -top-12 -left-12 w-32 h-32 opacity-20 pointer-events-none">
                 <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                    <path d="M20 20 L80 80 M80 20 L20 80" stroke="#00f2ff" strokeWidth="4" />
                 </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { id: 'All', label: 'DATA_ALL', icon: ShoppingBag },
              { id: 'TV', label: 'OPTIC_SYSTEM', icon: Tv },
              { id: 'Computer', label: 'NEURAL_LINK', icon: Laptop },
              { id: 'Monitor', label: 'INTERFACE_UNIT', icon: Monitor },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`group relative flex items-center gap-4 px-10 py-4 rounded-none text-[10px] font-mono tracking-[0.3em] transition-all border ${
                  activeCategory === cat.id 
                    ? 'bg-accent text-primary border-accent shadow-[0_0_25px_rgba(0,242,255,0.3)]' 
                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-accent/40'
                }`}
              >
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-primary' : 'text-accent'}`} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Brand Filter */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em] mr-4">Filter_By_Brand:</span>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-6 py-2 text-[9px] font-mono tracking-widest transition-all border ${
                  activeBrand === brand
                    ? 'bg-white/10 text-accent border-accent/50'
                    : 'bg-transparent text-slate-500 border-white/5 hover:border-white/20'
                }`}
              >
                {brand.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card group relative flex flex-col"
                id={`product-${product.id}`}
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                  
                  {/* Badges */}
                  {product.badge && (
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 text-[9px] font-black tracking-widest ${
                        product.badge === 'HOT' ? 'bg-red-500 text-white' :
                        product.badge === 'NEW' ? 'bg-accent text-primary' :
                        'bg-accent-purple text-white'
                      }`}>
                        {product.badge}
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2">
                       <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                       <span className="text-[9px] font-mono text-accent tracking-widest uppercase">{product.brand} // {product.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-10 flex-1 flex flex-col">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="text-left group/title"
                  >
                    <h3 className="text-2xl font-black text-white group-hover/title:neon-text transition-all italic uppercase tracking-tighter mb-4">
                      {product.name}
                    </h3>
                  </button>
                  
                  <div className="space-y-3 mb-10 flex-1">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-500 text-[10px] font-mono tracking-wider">
                        <ChevronRight className="w-3 h-3 text-accent/50" />
                        {spec}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em] mb-1">Unit_Value</span>
                      <span className="text-2xl font-mono font-bold text-white">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="relative w-14 h-14 bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300"
                    >
                      <Plus className="w-6 h-6" />
                      <div className="absolute -inset-2 border border-accent/0 group-hover:border-accent/30 transition-all" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-primary/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl bg-slate-950 border border-white/10 overflow-hidden relative"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent-purple to-accent" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-transparent opacity-20" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-square lg:aspect-auto bg-slate-900 border-r border-white/5">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute top-8 left-8">
                      <div className="px-4 py-1 bg-accent text-primary text-[10px] font-mono font-black tracking-[0.3em] uppercase">
                        {selectedProduct.category}_UNIT
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-12 flex flex-col">
                    <div className="flex justify-between items-start mb-12">
                      <div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2">
                          {selectedProduct.name}
                        </h2>
                        <p className="text-accent font-mono text-xs tracking-[0.4em]">SERIAL_ID: {selectedProduct.id.toUpperCase()}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(null)}
                        className="p-2 hover:bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="flex-1 space-y-12">
                      <div>
                        <h4 className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">SPECIFICATIONS</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {selectedProduct.specs.map((spec, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-none">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              <span className="text-slate-300 text-xs font-mono tracking-wider">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">CORE_DESCRIPTION</h4>
                        <p className="text-slate-400 leading-relaxed text-sm font-medium">
                          {selectedProduct.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-12 pt-12 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em] mb-2">TRANSFER_VALUE</span>
                        <span className="text-4xl font-mono font-bold text-white neon-text">${selectedProduct.price.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="group relative px-12 py-6 bg-transparent overflow-hidden glitch-hover"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-purple" />
                        <span className="relative text-primary font-black uppercase tracking-[0.3em] text-sm flex items-center gap-3">
                          <Plus className="w-5 h-5" /> ADD_TO_BUFFER
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-primary/90 backdrop-blur-xl z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 35, stiffness: 350 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#02040a] border-l border-white/5 shadow-2xl z-50 flex flex-col"
              id="cart-drawer"
            >
              <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/2">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-accent/10 border border-accent/30 rounded">
                    <ShoppingCart className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">DATA<span className="text-accent">_STREAM</span></h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-3 hover:bg-white/5 transition-colors border border-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                    <ShoppingBag className="w-20 h-20 mb-8 text-slate-700" />
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.5em]">EMPTY_BUFFER</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-8 group relative">
                      <div className="w-28 h-28 bg-slate-900 border border-white/5 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white italic uppercase tracking-tighter truncate text-lg mb-1">{item.name}</h4>
                        <p className="text-accent font-mono text-sm mb-6">${item.price.toLocaleString()}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-slate-900 border border-white/10">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2.5 hover:text-accent transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-5 text-sm font-mono font-bold text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2.5 hover:text-accent transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-600 hover:text-red-500 font-mono text-[9px] uppercase tracking-[0.3em] transition-colors"
                          >
                            [ PURGE ]
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-10 bg-white/2 border-t border-white/5">
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">TOTAL_ACCUMULATION</span>
                    <span className="text-3xl font-mono font-bold text-accent neon-text">${cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="group relative w-full py-6 bg-transparent overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-purple" />
                    <span className="relative text-primary font-black uppercase tracking-[0.4em] text-sm">
                      INITIATE_TRANSFER
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Neural Configurator Section (PC Builder) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8">
              Neural <span className="neon-text">Configurator</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 font-medium leading-relaxed">
              需要量身定制的運算單元？使用我們的神經配置器，打造專屬於您的旗艦工作站。從核心處理器到視覺渲染單元，一切由您主宰。
            </p>
            <div className="space-y-6 mb-12">
              {[
                '自定義硬體規格組合',
                '即時相容性檢測系統',
                '專業工程師組裝與測試',
                '全球節點快速部署'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-300 font-mono text-xs tracking-widest">
                  <div className="w-2 h-2 bg-accent-purple rotate-45" />
                  {item}
                </div>
              ))}
            </div>
            <button className="px-12 py-5 border border-accent text-accent font-black uppercase tracking-[0.3em] text-sm hover:bg-accent hover:text-primary transition-all">
              啟動配置程序
            </button>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-900/50 border border-white/5 p-12 relative overflow-hidden group">
              <div className="absolute inset-0 data-grid opacity-20" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 mb-8 relative">
                  <Monitor className="w-full h-full text-accent/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Plus className="w-12 h-12 text-accent animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest italic">Custom_Build_v2.0</h3>
                <p className="text-slate-500 font-mono text-[10px] tracking-[0.4em]">AWAITING_USER_INPUT...</p>
              </div>
              {/* Decorative Lines */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#02040a] border-t border-white/5 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-accent p-2 rounded">
                  <ShoppingBag className="text-primary w-6 h-6" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-2xl font-black italic uppercase tracking-tighter text-white">
                    XZI <span className="text-accent">TECH</span>
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.4em] text-slate-500 mt-1">
                    宜智創新科技
                  </span>
                </div>
              </div>
              <p className="text-slate-500 max-w-sm font-medium leading-relaxed text-sm">
                宜智創新科技：引領未來的數位架構。我們致力於研發最先進的硬體解決方案，為全球企業與個人提供無與倫比的運算與視覺體驗。
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[10px] text-white uppercase tracking-[0.5em] mb-10">DIRECTORY</h4>
              <ul className="space-y-5 text-slate-500 text-[11px] font-mono tracking-widest">
                <li><button onClick={() => setActiveCategory('TV')} className="hover:text-accent transition-colors">OPTIC_SYSTEM</button></li>
                <li><button onClick={() => setActiveCategory('Computer')} className="hover:text-accent transition-colors">NEURAL_LINK</button></li>
                <li><button onClick={() => setActiveCategory('Monitor')} className="hover:text-accent transition-colors">INTERFACE_UNIT</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] text-white uppercase tracking-[0.5em] mb-10">CONNECT</h4>
              <ul className="space-y-5 text-slate-500 text-[11px] font-mono tracking-widest">
                <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> LINE_SUPPORT</a></li>
                <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> FACEBOOK_NODE</a></li>
                <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> INSTAGRAM_FEED</a></li>
                <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> CORE_SUPPORT</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-600 font-mono text-[9px] uppercase tracking-[0.4em]">
              © 2026 XZI_TECH_MAINFRAME. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-10 text-slate-600 font-mono text-[9px] uppercase tracking-[0.4em]">
              <span className="text-accent/40">ENCRYPTION: AES-256</span>
              <span className="text-accent-purple/40">NODE: TAIWAN_HQ</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
