export const initialTeamMembers = [
  { id: 'user-1', name: 'Alex', role: 'Student', avatar: 'A', color: 'bg-primary' },
  { id: 'user-2', name: 'Sarah', role: 'Study Partner', avatar: 'S', color: 'bg-purple text-white' },
  { id: 'user-3', name: 'Professor Vance', role: 'Instructor', avatar: 'V', color: 'bg-success' }
];

// Preset Board Layouts per Persona
export const personaTemplates = {
  Student: {
    columns: [
      { id: 'col-s1', title: 'Assignments Due', badgeColor: 'bg-danger' },
      { id: 'col-s2', title: 'In Progress', badgeColor: 'bg-primary' },
      { id: 'col-s3', title: 'Exam Prep & Reading', badgeColor: 'bg-warning text-dark' },
      { id: 'col-s4', title: 'Submitted', badgeColor: 'bg-success' }
    ],
    tasks: [
      {
        id: 'task-s1',
        columnId: 'col-s1',
        assigneeId: 'user-1',
        title: 'Computer Science Lab 3',
        description: 'Complete data structure implementation in Python.',
        priority: 'High',
        dueDate: '2026-08-15',
        subtasks: [
          { id: 'st-1', title: 'Write linked list class', completed: true },
          { id: 'st-2', title: 'Run unit test cases', completed: false }
        ]
      },
      {
        id: 'task-s2',
        columnId: 'col-s3',
        assigneeId: 'user-1',
        title: 'Read Biology Ch. 7 & 8',
        description: 'Review cellular respiration notes before Midterm exam.',
        priority: 'Medium',
        dueDate: '2026-08-18',
        subtasks: []
      }
    ]
  },
  Worker: {
    columns: [
      { id: 'col-w1', title: 'Backlog', badgeColor: 'bg-secondary' },
      { id: 'col-w2', title: 'In Progress', badgeColor: 'bg-primary' },
      { id: 'col-w3', title: 'In Review', badgeColor: 'bg-info text-dark' },
      { id: 'col-w4', title: 'Completed', badgeColor: 'bg-success' }
    ],
    tasks: [
      {
        id: 'task-w1',
        columnId: 'col-w2',
        assigneeId: 'user-1',
        title: 'Q3 Financial Report Presentation',
        description: 'Prepare executive deck for stakeholders review.',
        priority: 'High',
        dueDate: '2026-08-20',
        subtasks: [
          { id: 'st-10', title: 'Gather sales metrics', completed: true },
          { id: 'st-11', title: 'Format slides layout', completed: false }
        ]
      }
    ]
  },
  General: {
    columns: [
      { id: 'col-g1', title: 'To Do', badgeColor: 'bg-secondary' },
      { id: 'col-g2', title: 'In Progress', badgeColor: 'bg-primary' },
      { id: 'col-g3', title: 'Completed', badgeColor: 'bg-success' }
    ],
    tasks: [
      {
        id: 'task-g1',
        columnId: 'col-g1',
        assigneeId: 'user-1',
        title: 'Plan Weekend Roadtrip',
        description: 'Check hotel availability and route options.',
        priority: 'Low',
        dueDate: '2026-08-22',
        subtasks: []
      }
    ]
  }
};

// Default fallback
export const initialColumns = personaTemplates.Student.columns;
export const initialTasks = personaTemplates.Student.tasks;