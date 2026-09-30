import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';
import { useState } from 'react';
import { users } from '../lib/api';
import { useAppSelector } from '../store/hooks';
import { ExpenseCreate } from '../types';

interface AddExpenseModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (expense: ExpenseCreate) => Promise<void>;
}

const ME = 'me';

const inputTheme = {
  field: {
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      colors: {
        gray: "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
      }
    }
  }
};

const selectTheme = {
  field: {
    select: {
      base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
      colors: {
        gray: "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
      }
    }
  }
};

// Splits an amount equally in whole cents; leftover cents go to the first people
const splitEvenly = (amount: number, count: number): number[] => {
  const totalCents = Math.round(amount * 100);
  const base = Math.floor(totalCents / count);
  const remainder = totalCents - base * count;
  return Array.from({ length: count }, (_, i) => (base + (i < remainder ? 1 : 0)) / 100);
};

const getErrorMessage = (err: any): string => {
  const detail = err.response?.data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg;
  return err.message || 'Failed to create expense';
};

export default function AddExpenseModal({ show, onClose, onSubmit }: AddExpenseModalProps) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [paidBy, setPaidBy] = useState(ME);
  const [participants, setParticipants] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const participantEmails = Array.from(
    new Set(
      participants
        .split(',')
        .map((p) => p.trim().toLowerCase())
        .filter((p) => p && p !== currentUser?.email.toLowerCase())
    )
  );

  const resetForm = () => {
    setDescription('');
    setAmount(0);
    setPaidBy(ME);
    setParticipants('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentUser) {
      setError('You must be signed in to add an expense');
      return;
    }
    if (!description.trim() || amount <= 0) {
      setError('Enter a description and an amount greater than zero');
      return;
    }
    if (participantEmails.length === 0) {
      setError('Add at least one other participant by email');
      return;
    }

    setSubmitting(true);
    try {
      const others = [];
      for (const email of participantEmails) {
        try {
          others.push(await users.lookupByEmail(email));
        } catch {
          setError(`No user with email ${email}`);
          return;
        }
      }

      const everyone = [currentUser, ...others];
      const payerId = paidBy === ME
        ? currentUser.id
        : others.find((u) => u.email.toLowerCase() === paidBy)?.id ?? currentUser.id;

      await onSubmit({
        description: description.trim(),
        amount,
        participant_ids: everyone.map((u) => u.id),
        amounts_paid: everyone.map((u) => (u.id === payerId ? amount : 0)),
        amounts_owed: splitEvenly(amount, everyone.length),
      });

      handleClose();
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onClose={handleClose} className="bg-gray-900">
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
              theme={inputTheme}
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
              theme={inputTheme}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="participants" value="Split with (comma-separated emails)" className="text-white" />
            <TextInput
              id="participants"
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="alex@example.com, sam@example.com"
              required
              theme={inputTheme}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="paidBy" value="Paid By" className="text-white" />
            <Select
              id="paidBy"
              value={participantEmails.includes(paidBy) ? paidBy : ME}
              onChange={(e) => setPaidBy(e.target.value)}
              theme={selectTheme}
            >
              <option value={ME}>You</option>
              {participantEmails.map((email) => (
                <option key={email} value={email}>{email}</option>
              ))}
            </Select>
          </div>
          <p className="text-sm text-gray-400">The amount is split equally between you and everyone listed.</p>
        </form>
      </Modal.Body>
      <Modal.Footer className="bg-gray-800 border-gray-700 flex justify-center space-x-4">
        <Button onClick={handleSubmit} disabled={submitting} className="bg-blue-600 hover:bg-blue-700 w-32">
          {submitting ? 'Adding…' : 'Add Expense'}
        </Button>
        <Button color="gray" onClick={handleClose} className="bg-gray-600 hover:bg-gray-700 text-white w-32">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
