import React from "react";

const PolicyTable = ({ policies }) => {
  if (policies.length === 0) {
    return <div className="text-center text-gray-see"> No Policies Found</div>;
  }
  return (
    <div>
      <table className="w-full border-collapse border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Premium</th>
            <th className="border p-2">Coverage</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((each) => {
            return (
              <tr key={each.id}>
                <td className="border p-2">{each.name}</td>
                <td className="border p-2">{each.policy_type}</td>
                <td className="border p-2">{each.premium}</td>
                <td className="border p-2">{each.coverage_amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable;
