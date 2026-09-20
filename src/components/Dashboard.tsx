import React from 'react';
import { Users, DollarSign, TrendingUp, TrendingDown, Wallet, Building, ShoppingCart, Receipt, PiggyBank, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface DashboardProps {
  userRole: 'admin' | 'shareholder';
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const { shareholders, capital, investments, selling, associationCosts, pettyCash } = useAppContext();

  // Calculate approved items only
  const approvedShareholders = shareholders.filter(s => s.status === 'approved');
  const approvedCapital = capital.filter(c => c.status === 'approved');
  const approvedInvestments = investments.filter(i => i.status === 'approved');
  const approvedSelling = selling.filter(s => s.status === 'approved');
  const approvedCosts = associationCosts.filter(c => c.status === 'approved');
  const approvedPettyCash = pettyCash.filter(p => p.status === 'approved');

  // Dashboard calculations
  const totalShareholders = approvedShareholders.length;
  const totalCapital = approvedCapital.reduce((sum, c) => sum + c.amount, 0);
  const totalInvestment = approvedInvestments.reduce((sum, i) => sum + i.totalCost, 0);
  const totalSelling = approvedSelling.reduce((sum, s) => sum + s.totalSelling, 0);
  const totalAssociationCost = approvedCosts.reduce((sum, c) => sum + c.totalTk, 0);
  const totalPettyCashAmount = approvedPettyCash.reduce((sum, p) => sum + p.amount, 0);
  
  // Calculate rest of capital (Total Capital - Total Investment - Total Association Cost)
  const restOfCapital = totalCapital - totalInvestment - totalAssociationCost;
  
  // Calculate products remaining (from investment sheet)
  const totalProductsInvested = approvedInvestments.reduce((sum, i) => sum + i.amountOfProducts, 0);
  const totalProductsSold = approvedSelling.reduce((sum, s) => sum + s.amountOfProducts, 0);
  const restOfProducts = totalProductsInvested - totalProductsSold;
  
  // Calculate profit/loss
  const totalProfit = totalSelling > totalInvestment ? totalSelling - totalInvestment : 0;
  const totalLoss = totalInvestment > totalSelling ? totalInvestment - totalSelling : 0;
  
  // Calculate net capital (Total Selling + Total Petty Cash + Rest of Capital)
  const netCapital = totalSelling + totalPettyCashAmount + restOfCapital;
  
  // Calculate total number of shares
  const totalShares = approvedShareholders.reduce((sum, s) => sum + s.numberOfShares, 0);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    colorClass = "stat-card",
    suffix = ""
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    colorClass?: string;
    suffix?: string;
  }) => (
    <div className={`${colorClass} p-6 rounded-xl shadow-lg hover-lift fade-in`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <p className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}{suffix}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );

  const NavigationButton = ({
    title,
    icon: Icon,
    colorClass,
    onClick
  }: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    colorClass: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`${colorClass} text-white p-4 rounded-xl shadow-lg hover-lift transition-all duration-200 hover:scale-105 w-full`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-6 h-6" />
        <span className="font-medium">{title}</span>
      </div>
    </button>
  );

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Association Dashboard</h2>
        <p className="text-gray-600">Real-time overview of all association activities</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Total Shareholders" 
          value={totalShareholders} 
          icon={Users}
        />
        <StatCard 
          title="Total Capital" 
          value={totalCapital} 
          icon={DollarSign}
          suffix=" Tk"
          colorClass="stat-card green"
        />
        <StatCard 
          title="Rest of Capital" 
          value={restOfCapital} 
          icon={Wallet}
          suffix=" Tk"
          colorClass="stat-card purple"
        />
        <StatCard 
          title="Total Investment" 
          value={totalInvestment} 
          icon={TrendingUp}
          suffix=" Tk"
        />
        <StatCard 
          title="Total Selling" 
          value={totalSelling} 
          icon={ShoppingCart}
          suffix=" Tk"
          colorClass="stat-card green"
        />
        <StatCard 
          title="Association Cost" 
          value={totalAssociationCost} 
          icon={Receipt}
          suffix=" Tk"
          colorClass="stat-card red"
        />
        <StatCard 
          title="Products Remaining" 
          value={restOfProducts} 
          icon={Building}
          colorClass="stat-card purple"
        />
        <StatCard 
          title={totalProfit > 0 ? "Total Profit" : "Total Loss"} 
          value={totalProfit > 0 ? totalProfit : totalLoss} 
          icon={totalProfit > 0 ? TrendingUp : TrendingDown}
          suffix=" Tk"
          colorClass={totalProfit > 0 ? "stat-card green" : "stat-card red"}
        />
        <StatCard 
          title="Net Capital" 
          value={netCapital} 
          icon={DollarSign}
          suffix=" Tk"
          colorClass="stat-card green"
        />
        <StatCard 
          title="Total Shares" 
          value={totalShares} 
          icon={Users}
        />
        <StatCard 
          title="Petty Cash" 
          value={totalPettyCashAmount} 
          icon={PiggyBank}
          suffix=" Tk"
          colorClass="stat-card purple"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Module Navigation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NavigationButton
            title="Shareholders Information"
            icon={Users}
            colorClass="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={() => onViewChange('shareholders')}
          />
          <NavigationButton
            title="Profile View"
            icon={User}
            colorClass="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            onClick={() => onViewChange('profile')}
          />
          <NavigationButton
            title="Capital Management"
            icon={DollarSign}
            colorClass="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            onClick={() => onViewChange('capital')}
          />
          <NavigationButton
            title="Investment Tracking"
            icon={TrendingUp}
            colorClass="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
            onClick={() => onViewChange('investment')}
          />
          <NavigationButton
            title="Selling Products"
            icon={ShoppingCart}
            colorClass="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
            onClick={() => onViewChange('selling')}
          />
          <NavigationButton
            title="Association Costs"
            icon={Receipt}
            colorClass="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            onClick={() => onViewChange('association')}
          />
          <NavigationButton
            title="Petty Cash"
            icon={PiggyBank}
            colorClass="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
            onClick={() => onViewChange('petty-cash')}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;