import { useEffect, useState } from 'react';
import { Card, Button } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import Layout from '../components/Layout';
import { expenses, users, auth } from '../lib/api';
import { Expense, Balance } from '../types';
import AddExpenseModal from '../components/AddExpenseModal';
import { useRouter } from 'next/router';
import { useAppSelector } from '../store/hooks';

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await auth.checkAuth();
      if (!isAuth) {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [expensesData, userData] = await Promise.all([
        expenses.getAll(),
        users.getProfile(),
      ]);
      setRecentExpenses(expensesData.slice(0, 5)); // Get last 5 expenses
      // Calculate balances based on expenses
      // This is a simplified version - you'll need to implement proper balance calculation
      setBalances([
        { userId: userData.id, amount: 0, type: 'owed' },
        { userId: userData.id, amount: 0, type: 'owing' },
      ]);
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense: any) => {
    try {
      setError('');
      const response = await expenses.create(expense);
      if (response) {
        await fetchDashboardData();
        setShowAddExpense(false);
      }
    } catch (err: any) {
      console.error('Error creating expense:', err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to add expense');
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <Button onClick={() => setShowAddExpense(true)}>
            <HiPlus className="mr-2 h-5 w-5" />
            Add Expense
          </Button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-400 px-4 py-3 rounded">
            {typeof error === 'string' ? error : 'An error occurred'}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <div className="flex flex-col items-center">
              <h5 className="text-lg font-medium text-gray-300">You owe</h5>
              <p className="text-2xl font-bold text-red-400">
                ${balances.find(b => b.type === 'owing')?.amount.toFixed(2) || '0.00'}
              </p>
            </div>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <div className="flex flex-col items-center">
              <h5 className="text-lg font-medium text-gray-300">You are owed</h5>
              <p className="text-2xl font-bold text-green-400">
                ${balances.find(b => b.type === 'owed')?.amount.toFixed(2) || '0.00'}
              </p>
            </div>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <div className="flex flex-col items-center">
              <h5 className="text-lg font-medium text-gray-300">Total Balance</h5>
              <p className="text-2xl font-bold text-white">
                ${(balances.reduce((acc, b) => acc + (b.type === 'owed' ? b.amount : -b.amount), 0)).toFixed(2)}
              </p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <h5 className="text-lg font-medium text-gray-300 mb-4">Recent Expenses</h5>
            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-400 text-center">Loading...</p>
              ) : recentExpenses.length > 0 ? (
                recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex justify-between items-center">
                    <p className="text-sm text-gray-200">
                      <span className="font-medium">{expense.created_by?.name || 'Unknown'}</span> paid{' '}
                      <span className="text-blue-400">${expense.amount.toFixed(2)}</span> for{' '}
                      <span className="italic">{expense.description}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No expenses yet</p>
              )}
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <h5 className="text-lg font-medium text-gray-300 mb-4">Recent Activity</h5>
            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-400 text-center">Loading...</p>
              ) : recentExpenses.length > 0 ? (
                recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex justify-between items-center">
                    <p className="text-sm text-gray-200">
                      <span className="font-medium">{expense.created_by?.name || 'Unknown'}</span> paid{' '}
                      <span className="font-medium">${expense.amount.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No recent activity</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <AddExpenseModal
        show={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onSubmit={handleAddExpense}
      />
    </Layout>
  );
} 