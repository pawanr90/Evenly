import { Card, Button, Table } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import Layout from '../components/Layout';

export default function Expenses() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Expenses</h1>
          <Button>
            <HiPlus className="mr-2 h-5 w-5" />
            Add Expense
          </Button>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <Table>
            <Table.Head>
              <Table.HeadCell className="text-gray-300">Description</Table.HeadCell>
              <Table.HeadCell className="text-gray-300">Amount</Table.HeadCell>
              <Table.HeadCell className="text-gray-300">Paid by</Table.HeadCell>
              <Table.HeadCell className="text-gray-300">Date</Table.HeadCell>
              <Table.HeadCell className="text-gray-300">Group</Table.HeadCell>
              <Table.HeadCell className="text-gray-300">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center text-gray-400">
                  No expenses found
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card>
      </div>
    </Layout>
  );
} 