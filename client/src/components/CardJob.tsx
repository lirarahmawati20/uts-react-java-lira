import { Job } from "../App";

export default function CardJob({
  job,
  handleDelete,
  setEditJob,
}: {
  job: Job;
  handleDelete: (id: number) => void;
  setEditJob: (job: Partial<Job>) => void;
}) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">${job.salary.toLocaleString()}</p>
      <p className="text-gray-600">{job.description}</p>
      <div className="flex space-x-2 mt-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => setEditJob(job)}
        >
          Update
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleDelete(job.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
