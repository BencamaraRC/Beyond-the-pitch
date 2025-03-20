import React, { useState } from 'react';
import { FileEdit, Download, Plus, Trash2 } from 'lucide-react';
import type { CVSection } from '../types';

const defaultSections: CVSection[] = [
  {
    id: '1',
    title: 'Professional Summary',
    content: 'Former professional soccer player with strong leadership and team management skills...'
  },
  {
    id: '2',
    title: 'Soccer Career Highlights',
    content: '• Captain of [Team Name] (2018-2023)\n• Led team to championship victory (2022)\n• Managed and mentored junior team members'
  },
  {
    id: '3',
    title: 'Transferable Skills',
    content: '• Leadership and team management\n• Strategic planning and execution\n• Performance under pressure\n• Effective communication'
  },
  {
    id: '4',
    title: 'Education',
    content: 'Bachelor\'s Degree in Sports Science\nUniversity Name, Year'
  }
];

export function CVBuilder() {
  const [sections, setSections] = useState<CVSection[]>(defaultSections);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, newContent: string) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, content: newContent } : section
    ));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newSection: CVSection = {
      id: Date.now().toString(),
      title: 'New Section',
      content: 'Add your content here...'
    };
    setSections([...sections, newSection]);
    setEditingId(newSection.id);
  };

  const handleDelete = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const handleDownload = () => {
    const cvContent = sections
      .map(section => `${section.title}\n\n${section.content}\n\n`)
      .join('---\n\n');
    
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-cv.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">CV Builder</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add Section</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Download className="w-5 h-5" />
            <span>Download CV</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(section.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FileEdit className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(section.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
            
            {editingId === section.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => setSections(sections.map(s =>
                    s.id === section.id ? { ...s, title: e.target.value } : s
                  ))}
                  className="w-full p-2 border rounded-lg"
                />
                <textarea
                  value={section.content}
                  onChange={(e) => setSections(sections.map(s =>
                    s.id === section.id ? { ...s, content: e.target.value } : s
                  ))}
                  rows={5}
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  onClick={() => handleSave(section.id, section.content)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-gray-600">{section.content}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}