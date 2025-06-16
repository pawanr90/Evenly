import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { users } from '../lib/api';

interface AddExpenseModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (expense: any) => void;
}

export default function AddExpenseModal({ show, onClose, onSubmit }: AddExpenseModalProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [group, setGroup] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await users.getProfile();
        setCurrentUserId(user.id);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setError('Failed to fetch user information');
      }
    };
    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const participantList = participants.split(',').map(p => p.trim());
      const amountPerPerson = amount / (participantList.length + 1); // +1 for the current user

      // For now, we'll just use the current user's ID for all participants
      // In a real app, you would look up the user IDs for each participant name
      const participantIds = [currentUserId, ...participantList.map(() => currentUserId)];
      
      onSubmit({
        description,
        amount,
        participant_ids: participantIds,
        amounts_paid: [amount, ...Array(participantList.length).fill(0)], // Current user paid the full amount
        amounts_owed: Array(participantList.length + 1).fill(amountPerPerson), // Everyone owes an equal share
      });
      
      setDescription('');
      setAmount(0);
      setGroup('');
      setPaidBy('');
      setParticipants('');
      onClose();
    } catch (err: any) {
      console.error('Error creating expense:', err);
      setError(err.message || 'Failed to create expense');
    }
  };

  return (
    <Modal show={show} onClose={onClose} className="bg-gray-900">
      <Modal.Header className="bg-gray-800 border-gray-700 text-white">Add New Expense</Modal.Header>
      <Modal.Body className="bg-gray-800">
        {error && (
          <div className="mb-4 p-4 text-sm text-red-400 bg-red-900/50 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <Label htmlFor="description" value="Description" className="text-white" />
            <TextInput
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              theme={{
                field: {
                  input: {
                    base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                    colors: {
                      gray: "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="amount" value="Amount" className="text-white" />
            <TextInput
              id="amount"
              type="number"
              value={amount || ''}
              onChange={(e) => {
                const value = e.target.value;
                setAmount(value ? parseFloat(value) : 0);
              }}
              required
              min="0"
              step="0.01"
              theme={{
                field: {
                  input: {
                    base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                    colors: {
                      gray: "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="paidBy" value="Paid By" className="text-white" />
            <TextInput
              id="paidBy"
              type="text"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              required
              theme={{
                field: {
                  input: {
                    base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                    colors: {
                      gray: "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="participants" value="Participants (comma-separated)" className="text-white" />
            <TextInput
              id="participants"
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              required
              theme={{
                field: {
                  input: {
                    base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                    colors: {
                      gray: "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="group" value="Group" className="text-white" />
            <Select
              id="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              required
              theme={{
                field: {
                  select: {
                    base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
                    colors: {
                      gray: "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    }
                  }
                }
              }}
            >
              <option value="">Select a group</option>
              <option value="roommates">Roommates</option>
              <option value="friends">Friends</option>
              <option value="family">Family</option>
            </Select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="bg-gray-800 border-gray-700 flex justify-center space-x-4">
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 w-32">
          Add Expense
        </Button>
        <Button color="gray" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white w-32">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
} 