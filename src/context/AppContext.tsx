import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Shareholder {
  id: string;
  idNo: string;
  numberOfShares: number;
  banglaName: string;
  englishName: string;
  joiningDate: string;
  fatherBanglaName: string;
  fatherEnglishName: string;
  motherBanglaName: string;
  motherEnglishName: string;
  mobileNo: string;
  dateOfBirth: string;
  nidNumber: string;
  presentAddress: string;
  permanentAddress: string;
  nomineeBanglaName: string;
  nomineeEnglishName: string;
  nomineeMobileNo: string;
  image?: string;
  signature?: string;
  admissionFee: number;
  admissionScreenshot?: string;
  status: 'pending' | 'approved';
}

export interface Capital {
  id: string;
  idNo: string;
  shareholderName: string;
  numberOfShares: number;
  depositDate: string;
  amount: number;
  screenshot?: string;
  status: 'pending' | 'approved';
}

export interface Investment {
  id: string;
  invoiceNo: string;
  productName: string;
  buyingDate: string;
  perUnitPrice: number;
  amountOfProducts: number;
  unit: string;
  totalCost: number;
  status: 'pending' | 'approved';
}

export interface Selling {
  id: string;
  invoiceNo: string;
  productName: string;
  sellingDate: string;
  perUnitPrice: number;
  amountOfProducts: number;
  unit: string;
  totalSelling: number;
  status: 'pending' | 'approved';
}

export interface AssociationCost {
  id: string;
  invoiceNo: string;
  date: string;
  nameOfCost: string;
  reasonOfCost: string;
  amount: number;
  perUnitCost: number;
  totalTk: number;
  status: 'pending' | 'approved';
}

export interface PettyCash {
  id: string;
  invoiceNo: string;
  source: string;
  date: string;
  amount: number;
  status: 'pending' | 'approved';
}

interface AppContextType {
  shareholders: Shareholder[];
  capital: Capital[];
  investments: Investment[];
  selling: Selling[];
  associationCosts: AssociationCost[];
  pettyCash: PettyCash[];
  addShareholder: (shareholder: Omit<Shareholder, 'id'>) => void;
  addCapital: (capital: Omit<Capital, 'id'>) => void;
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  addSelling: (selling: Omit<Selling, 'id'>) => void;
  addAssociationCost: (cost: Omit<AssociationCost, 'id'>) => void;
  addPettyCash: (petty: Omit<PettyCash, 'id'>) => void;
  updateShareholderStatus: (id: string, status: 'pending' | 'approved') => void;
  updateCapitalStatus: (id: string, status: 'pending' | 'approved') => void;
  updateInvestmentStatus: (id: string, status: 'pending' | 'approved') => void;
  updateSellingStatus: (id: string, status: 'pending' | 'approved') => void;
  updateAssociationCostStatus: (id: string, status: 'pending' | 'approved') => void;
  updatePettyCashStatus: (id: string, status: 'pending' | 'approved') => void;
  deleteShareholder: (id: string) => void;
  deleteCapital: (id: string) => void;
  deleteInvestment: (id: string) => void;
  deleteSelling: (id: string) => void;
  deleteAssociationCost: (id: string) => void;
  deletePettyCash: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [capital, setCapital] = useState<Capital[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [selling, setSelling] = useState<Selling[]>([]);
  const [associationCosts, setAssociationCosts] = useState<AssociationCost[]>([]);
  const [pettyCash, setPettyCash] = useState<PettyCash[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      const savedShareholders = localStorage.getItem('fma-shareholders');
      const savedCapital = localStorage.getItem('fma-capital');
      const savedInvestments = localStorage.getItem('fma-investments');
      const savedSelling = localStorage.getItem('fma-selling');
      const savedCosts = localStorage.getItem('fma-costs');
      const savedPetty = localStorage.getItem('fma-petty');

      if (savedShareholders) setShareholders(JSON.parse(savedShareholders));
      if (savedCapital) setCapital(JSON.parse(savedCapital));
      if (savedInvestments) setInvestments(JSON.parse(savedInvestments));
      if (savedSelling) setSelling(JSON.parse(savedSelling));
      if (savedCosts) setAssociationCosts(JSON.parse(savedCosts));
      if (savedPetty) setPettyCash(JSON.parse(savedPetty));
    };

    loadData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fma-shareholders', JSON.stringify(shareholders));
  }, [shareholders]);

  useEffect(() => {
    localStorage.setItem('fma-capital', JSON.stringify(capital));
  }, [capital]);

  useEffect(() => {
    localStorage.setItem('fma-investments', JSON.stringify(investments));
  }, [investments]);

  useEffect(() => {
    localStorage.setItem('fma-selling', JSON.stringify(selling));
  }, [selling]);

  useEffect(() => {
    localStorage.setItem('fma-costs', JSON.stringify(associationCosts));
  }, [associationCosts]);

  useEffect(() => {
    localStorage.setItem('fma-petty', JSON.stringify(pettyCash));
  }, [pettyCash]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addShareholder = (shareholder: Omit<Shareholder, 'id'>) => {
    const newShareholder = { ...shareholder, id: generateId() };
    setShareholders(prev => [...prev, newShareholder]);
  };

  const addCapital = (capitalEntry: Omit<Capital, 'id'>) => {
    const newCapital = { ...capitalEntry, id: generateId() };
    setCapital(prev => [...prev, newCapital]);
  };

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment = { ...investment, id: generateId() };
    setInvestments(prev => [...prev, newInvestment]);
  };

  const addSelling = (sellingEntry: Omit<Selling, 'id'>) => {
    const newSelling = { ...sellingEntry, id: generateId() };
    setSelling(prev => [...prev, newSelling]);
  };

  const addAssociationCost = (cost: Omit<AssociationCost, 'id'>) => {
    const newCost = { ...cost, id: generateId() };
    setAssociationCosts(prev => [...prev, newCost]);
  };

  const addPettyCash = (petty: Omit<PettyCash, 'id'>) => {
    const newPetty = { ...petty, id: generateId() };
    setPettyCash(prev => [...prev, newPetty]);
  };

  const updateShareholderStatus = (id: string, status: 'pending' | 'approved') => {
    setShareholders(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const updateCapitalStatus = (id: string, status: 'pending' | 'approved') => {
    setCapital(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const updateInvestmentStatus = (id: string, status: 'pending' | 'approved') => {
    setInvestments(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const updateSellingStatus = (id: string, status: 'pending' | 'approved') => {
    setSelling(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const updateAssociationCostStatus = (id: string, status: 'pending' | 'approved') => {
    setAssociationCosts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const updatePettyCashStatus = (id: string, status: 'pending' | 'approved') => {
    setPettyCash(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const deleteShareholder = (id: string) => {
    setShareholders(prev => prev.filter(s => s.id !== id));
  };

  const deleteCapital = (id: string) => {
    setCapital(prev => prev.filter(c => c.id !== id));
  };

  const deleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(i => i.id !== id));
  };

  const deleteSelling = (id: string) => {
    setSelling(prev => prev.filter(s => s.id !== id));
  };

  const deleteAssociationCost = (id: string) => {
    setAssociationCosts(prev => prev.filter(c => c.id !== id));
  };

  const deletePettyCash = (id: string) => {
    setPettyCash(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      shareholders,
      capital,
      investments,
      selling,
      associationCosts,
      pettyCash,
      addShareholder,
      addCapital,
      addInvestment,
      addSelling,
      addAssociationCost,
      addPettyCash,
      updateShareholderStatus,
      updateCapitalStatus,
      updateInvestmentStatus,
      updateSellingStatus,
      updateAssociationCostStatus,
      updatePettyCashStatus,
      deleteShareholder,
      deleteCapital,
      deleteInvestment,
      deleteSelling,
      deleteAssociationCost,
      deletePettyCash
    }}>
      {children}
    </AppContext.Provider>
  );
};