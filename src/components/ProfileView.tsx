import React, { useState } from 'react';
import { ArrowLeft, User, Search, Users } from 'lucide-react';
import { useAppContext, Shareholder } from '../context/AppContext';

interface ProfileViewProps {
  userRole: 'admin' | 'shareholder';
  onBack: () => void;
}

interface ShareholderProfile extends Shareholder {
  financialSummary: {
    totalDeposited: number;
    depositCount: number;
    averagePerShare: number;
    shareholderTotal: number;
  };
}

const ProfileView: React.FC<ProfileViewProps> = ({ onBack }) => {
  const { shareholders, capital } = useAppContext();
  const [searchId, setSearchId] = useState('');
  const [selectedShareholder, setSelectedShareholder] = useState<ShareholderProfile | null>(null);

  const handleSearch = () => {
    const shareholder = shareholders.find(s => s.idNo === searchId && s.status === 'approved');
    if (shareholder) {
      // Calculate financial summary
      const shareholderCapital = capital.filter(c => c.idNo === searchId && c.status === 'approved');
      const totalDeposited = shareholderCapital.reduce((sum, c) => sum + c.amount, 0);
      const depositCount = shareholderCapital.length;
      
      // Calculate net capital average per share (simplified calculation)
      const totalApprovedCapital = capital.filter(c => c.status === 'approved').reduce((sum, c) => sum + c.amount, 0);
      const totalApprovedShares = shareholders.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.numberOfShares, 0);
      const averagePerShare = totalApprovedShares > 0 ? totalApprovedCapital / totalApprovedShares : 0;
      
      const shareholderTotal = averagePerShare * shareholder.numberOfShares;
      
      setSelectedShareholder({
        ...shareholder,
        financialSummary: {
          totalDeposited,
          depositCount,
          averagePerShare,
          shareholderTotal
        }
      });
    } else {
      alert('Shareholder not found or not approved yet.');
      setSelectedShareholder(null);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Shareholder Profile</h2>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Shareholder Profile</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Shareholder ID Number"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Profile Display */}
      {selectedShareholder && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with Photo and Basic Info */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
            <div className="flex items-start space-x-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{selectedShareholder.englishName}</h3>
                <p className="text-blue-100 text-lg mb-1">{selectedShareholder.banglaName}</p>
                <p className="text-blue-200">ID: {selectedShareholder.idNo}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-200 text-sm">Shares Owned</p>
                    <p className="text-xl font-semibold">{selectedShareholder.numberOfShares}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Joining Date</p>
                    <p className="text-xl font-semibold">{new Date(selectedShareholder.joiningDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                {selectedShareholder.image && (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={selectedShareholder.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {selectedShareholder.signature && (
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-gray-700 text-xs text-center mb-1">Signature</p>
                    <img 
                      src={selectedShareholder.signature} 
                      alt="Signature" 
                      className="max-w-24 max-h-12 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mobile Number</p>
                    <p className="text-gray-900">{selectedShareholder.mobileNo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p className="text-gray-900">{new Date(selectedShareholder.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">NID Number</p>
                    <p className="text-gray-900">{selectedShareholder.nidNumber}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Present Address</p>
                  <p className="text-gray-900">{selectedShareholder.presentAddress}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Permanent Address</p>
                  <p className="text-gray-900">{selectedShareholder.permanentAddress}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Family Information</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Father's Name</p>
                    <p className="text-gray-900">{selectedShareholder.fatherEnglishName}</p>
                    <p className="text-gray-600 text-sm">{selectedShareholder.fatherBanglaName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mother's Name</p>
                    <p className="text-gray-900">{selectedShareholder.motherEnglishName}</p>
                    <p className="text-gray-600 text-sm">{selectedShareholder.motherBanglaName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nominee</p>
                    <p className="text-gray-900">{selectedShareholder.nomineeEnglishName}</p>
                    <p className="text-gray-600 text-sm">{selectedShareholder.nomineeBanglaName}</p>
                    <p className="text-gray-600 text-sm">Mobile: {selectedShareholder.nomineeMobileNo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Financial Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedShareholder.financialSummary.totalDeposited.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Deposited (Tk)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedShareholder.financialSummary.depositCount}</p>
                  <p className="text-sm text-gray-600">Deposit Count</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedShareholder.financialSummary.averagePerShare.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Average Per Share (Tk)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{selectedShareholder.financialSummary.shareholderTotal.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Total Value (Tk)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedShareholder && searchId && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Profile Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Enter a valid Shareholder ID to view their profile.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileView;