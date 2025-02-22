import React, { useState } from "react";
import ApplicationStatus from "./ApplicationStatus";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import NewApplicationForm from "./NewApplicationForm";

const ApplicationTracker = () => {
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [applications, setApplications] = useState([
    // Sample initial data - replace or remove as needed
    {
      id: 1,
      title: "Software Engineer",
      status: "applied",
      created_at: new Date().toISOString()
    }
  ]);

  const handleAddApplication = (newApplication) => {
    setApplications(prevApplications => [
      {
        ...newApplication,
        id: prevApplications.length + 1,
        created_at: new Date().toISOString()
      },
      ...prevApplications
    ]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Applications</h2>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowNewApplication(true)}
        >
          <PlusCircle className="w-4 h-4" />
          New Application
        </Button>

        <Dialog open={showNewApplication} onOpenChange={setShowNewApplication}>
          <DialogContent className="max-w-4xl">
            <NewApplicationForm
              onClose={() => setShowNewApplication(false)}
              onSuccess={(newApplication) => {
                handleAddApplication(newApplication);
                setShowNewApplication(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app, index) => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {app.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ApplicationStatus status={app.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTracker;