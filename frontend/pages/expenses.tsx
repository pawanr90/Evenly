import { Card, Button, Table } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import Layout from '../components/Layout';

export default function Expenses() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <Button>
            <HiPlus className="mr-2 h-5 w-5" />
            Add Expense
          </Button>
        </div>

        <Card>
          <Table>
            <Table.Head>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Paid by</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Group</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center text-gray-500">
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