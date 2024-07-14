

import React, { useEffect, useState } from "react";
import CardJob from "./components/CardJob";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
}

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editJob, setEditJob] = useState<Partial<Job>>({
    id: 0,
    title: "",
    company: "",
    location: "",
    salary: 0,
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/jobs")
      .then((response) => response.json())
      .then((jobs) => setJobs(jobs))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  function handleDelete(id: number) {
    fetch(`http://localhost:8080/api/jobs/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setJobs(jobs.filter((job) => job.id !== id));
        } else {
          console.error("Failed to delete job:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting job:", error));
  }

  function handleEdit() {
    fetch("http://localhost:8080/api/jobs", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editJob),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to edit job");
        }
      })
      .then((job) => {
        setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
        setEditJob({
          id: 0,
          title: "",
          company: "",
          location: "",
          salary: 0,
          description: "",
        });
      })
      .catch((error) => console.error("Error editing job:", error));
  }

  function handleAdd() {
    fetch("http://localhost:8080/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editJob),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add job");
        }
      })
      .then((newJob) => {
        setJobs([...jobs, newJob]);
        setEditJob({
          id: 0,
          title: "",
          company: "",
          location: "",
          salary: 0,
          description: "",
        });
      })
      .catch((error) => console.error("Error adding job:", error));
  }

  const filteredJobs = jobs
    .filter((job) =>
      [job.title, job.company, job.location, job.description]
        .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  return (
    <div className="min-h-screen bg-blue-400 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Job Management System
        </h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Search by title, company, location, salary, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mb-4 text-center">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              if (editJob.id) {
                handleEdit();
              } else {
                handleAdd();
              }
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Title
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={editJob.title}
                  onChange={(e) =>
                    setEditJob({ ...editJob, title: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Company
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={editJob.company}
                  onChange={(e) =>
                    setEditJob({ ...editJob, company: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={editJob.location}
                  onChange={(e) =>
                    setEditJob({ ...editJob, location: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Salary
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={editJob.salary}
                  onChange={(e) =>
                    setEditJob({
                      ...editJob,
                      salary: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
                <textarea
                  className="mt-1 p-2 w-full border rounded"
                  value={editJob.description}
                  onChange={(e) =>
                    setEditJob({ ...editJob, description: e.target.value })
                  }
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </form>

          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map((job) => (
              <CardJob
                key={job.id}
                job={job}
                handleDelete={handleDelete}
                setEditJob={setEditJob}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
