import React from 'react';

/**
 * Contoh Komponen menggunakan Tailwind CSS
 * Ini menunjukkan cara menggunakan Tailwind bersama Chakra UI
 */

export const TailwindCard = ({ 
  title, 
  value, 
  trend, 
  icon: Icon,
  color = 'brand' 
}) => {
  // Color mapping untuk Tailwind classes
  const colorClasses = {
    brand: 'bg-brand-400 text-white',
    green: 'bg-green-400 text-white',
    blue: 'bg-blue-400 text-white',
    purple: 'bg-purple-400 text-white',
    red: 'bg-red-400 text-white',
  };

  return (
    <div className="card p-6 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-brand-400/10" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colorClasses[color]}`}>
            <Icon />
          </div>
          
          {/* Badge */}
          <span className="badge-brand">
            Live
          </span>
        </div>

        {/* Content */}
        <p className="text-sm font-extrabold text-gray-500 mb-2">
          {title}
        </p>
        
        <h3 className="text-4xl font-black text-gray-900 tracking-tight">
          {value}
        </h3>
        
        {/* Trend */}
        <p className="mt-3 text-sm font-bold text-brand-500">
          {trend}
        </p>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-400/0 to-brand-500/0 group-hover:from-brand-400/5 group-hover:to-brand-500/5 transition-all duration-500" />
    </div>
  );
};

export const TailwindButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-[18px] transition-all',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button 
      className={`${variants[variant]} ${size !== 'md' && variant !== 'primary' ? sizes[size] : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const TailwindInput = ({ 
  label, 
  error, 
  icon: Icon,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-extrabold text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        
        <input 
          className={`input-field ${Icon ? 'pl-12' : ''} ${error ? 'border-red-400 focus:ring-red-400/20' : ''}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-xs font-bold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export const TailwindChartBar = ({ data, maxValue }) => {
  return (
    <div className="flex items-end gap-3 h-60">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2">
          {/* Tooltip on hover */}
          <div className="group relative flex-1 w-full flex items-end">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
              <div className="bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap">
                <p>{item.day}</p>
                <p className="text-brand-300">Rp {(item.revenue / 1000000).toFixed(1)}jt</p>
              </div>
            </div>
            
            {/* Bar */}
            <div 
              className="chart-bar w-full transition-all duration-300"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
          
          {/* Label */}
          <span className="text-xs font-extrabold text-gray-400">
            {item.day}
          </span>
        </div>
      ))}
    </div>
  );
};

export const TailwindPageHeader = ({ title, breadcrumb, children }) => {
  return (
    <div className="page-header mb-7">
      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-3 text-xs font-extrabold uppercase tracking-wider">
          <span className="text-gray-400">Resto Rustaf</span>
          <span className="text-gray-300">/</span>
          <span className="text-brand-400">{breadcrumb}</span>
        </div>
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              {title}
            </h1>
            
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-brand-400" />
              <div className="w-16 h-1 rounded-full bg-brand-400" />
            </div>
          </div>
          
          {children && (
            <div className="w-full md:w-auto">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Example usage component
export const TailwindExampleUsage = () => {
  const salesData = [
    { day: 'Sen', value: 45, revenue: 2100000 },
    { day: 'Sel', value: 72, revenue: 3600000 },
    { day: 'Rab', value: 58, revenue: 2900000 },
    { day: 'Kam', value: 88, revenue: 4600000 },
    { day: 'Jum', value: 76, revenue: 3800000 },
    { day: 'Sab', value: 96, revenue: 5200000 },
    { day: 'Min', value: 82, revenue: 4100000 },
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-page min-h-screen">
      <TailwindPageHeader title="Dashboard Tailwind" breadcrumb="Overview">
        <button className="btn-primary">
          Export Data
        </button>
      </TailwindPageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <TailwindCard 
          title="Pesanan Hari Ini" 
          value="145" 
          trend="+20% dari kemarin"
          icon={() => <span>🍽️</span>}
        />
        <TailwindCard 
          title="Total Pendapatan" 
          value="Rp 12.4jt" 
          trend="+15% minggu ini"
          icon={() => <span>💰</span>}
          color="green"
        />
        <TailwindCard 
          title="Meja Terisi" 
          value="18/25" 
          trend="72% kapasitas"
          icon={() => <span>🪑</span>}
          color="blue"
        />
        <TailwindCard 
          title="Staff Aktif" 
          value="12" 
          trend="Aktif sekarang"
          icon={() => <span>👥</span>}
          color="purple"
        />
      </div>

      {/* Chart */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-black text-gray-900">Penjualan Mingguan</h3>
            <p className="text-sm text-gray-500">Ringkasan transaksi 7 hari terakhir</p>
          </div>
          <span className="badge-brand bg-green-100 text-green-700 border-green-200">
            +18%
          </span>
        </div>
        
        <TailwindChartBar data={salesData} maxValue={100} />
      </div>

      {/* Form Example */}
      <div className="card p-6 max-w-md">
        <h3 className="text-lg font-black text-gray-900 mb-4">Form Example</h3>
        
        <div className="space-y-4">
          <TailwindInput 
            label="Username"
            placeholder="Masukkan username"
          />
          
          <TailwindInput 
            label="Password"
            type="password"
            placeholder="Masukkan password"
            error="Password minimal 8 karakter"
          />
          
          <div className="flex gap-3 pt-2">
            <TailwindButton variant="primary">Submit</TailwindButton>
            <TailwindButton variant="secondary">Cancel</TailwindButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindExampleUsage;
