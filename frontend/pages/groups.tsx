import { Card, Button, Avatar } from 'flowbite-react';
import { HiPlus, HiUserGroup } from 'react-icons/hi';
import Layout from '../components/Layout';

export default function Groups() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
          <Button>
            <HiPlus className="mr-2 h-5 w-5" />
            Create Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <HiUserGroup className="h-12 w-12 text-gray-400" />
              </div>
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                Create New Group
              </h5>
              <p className="mt-2 text-sm text-gray-500">
                Start a new group to share expenses with friends
              </p>
              <Button className="mt-4">
                <HiPlus className="mr-2 h-5 w-5" />
                Create Group
              </Button>
            </div>
          </Card>

          {/* Example group card - will be replaced with dynamic data */}
          <Card>
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar rounded size="lg" />
                <div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900">
                    Roommates
                  </h5>
                  <p className="text-sm text-gray-500">4 members</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Last activity: 2 days ago</p>
                <Button size="sm">View Details</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
} 