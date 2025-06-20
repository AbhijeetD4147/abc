export interface Message {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  type: "inbox" | "sent" | "draft" | "archived" | "deleted";
  priority: "low" | "normal" | "high" | "urgent";
  category:
    | "general"
    | "appointment"
    | "billing"
    | "medical"
    | "prescription"
    | "lab_results"
    | "insurance";
  attachments?: {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
  replyTo?: string;
  forwardedFrom?: string;
  isEncrypted: boolean;
  tags: string[];
}

export const initialMessages: Message[] = [
  {
    id: "1",
    subject: "Appointment Confirmation - Dr. Smith",
    sender: "Dr. Sarah Smith",
    recipient: "John Doe",
    content:
      "Dear John,\n\nYour appointment has been confirmed for tomorrow at 2:00 PM. Please arrive 15 minutes early for check-in.\n\nBest regards,\nDr. Smith",
    timestamp: new Date("2024-01-15T10:30:00"),
    isRead: false,
    isStarred: true,
    type: "inbox",
    priority: "high",
    category: "appointment",
    isEncrypted: true,
    tags: ["urgent", "appointment"],
  },
  {
    id: "2",
    subject: "Lab Results Available",
    sender: "MaximEyes Lab",
    recipient: "John Doe",
    content:
      "Your recent lab results are now available in your patient portal. Please review them and contact us if you have any questions.",
    timestamp: new Date("2024-01-14T14:20:00"),
    isRead: true,
    isStarred: false,
    type: "inbox",
    priority: "normal",
    category: "lab_results",
    attachments: [
      {
        id: "att1",
        name: "lab_results_2024.pdf",
        size: 245760,
        type: "application/pdf",
        url: "/attachments/lab_results_2024.pdf",
      },
    ],
    isEncrypted: true,
    tags: ["lab", "results"],
  },
  {
    id: "3",
    subject: "Prescription Refill Request",
    sender: "John Doe",
    recipient: "Dr. Sarah Smith",
    content:
      "Hello Dr. Smith,\n\nI would like to request a refill for my eye drops prescription. My current supply will run out in 3 days.\n\nThank you,\nJohn",
    timestamp: new Date("2024-01-13T09:15:00"),
    isRead: true,
    isStarred: false,
    type: "sent",
    priority: "normal",
    category: "prescription",
    isEncrypted: true,
    tags: ["prescription", "refill"],
  },
  {
    id: "4",
    subject: "Insurance Coverage Update",
    sender: "Billing Department",
    recipient: "John Doe",
    content:
      "Dear Patient,\n\nWe have received an update regarding your insurance coverage. Your new benefits are now active and will be applied to future visits.",
    timestamp: new Date("2024-01-12T16:45:00"),
    isRead: false,
    isStarred: false,
    type: "inbox",
    priority: "normal",
    category: "insurance",
    isEncrypted: false,
    tags: ["insurance", "billing"],
  },
  {
    id: "5",
    subject: "Post-Surgery Follow-up Instructions",
    sender: "Dr. Michael Johnson",
    recipient: "John Doe",
    content:
      "Dear John,\n\nPlease follow these post-surgery care instructions:\n\n1. Apply eye drops as prescribed\n2. Avoid rubbing your eyes\n3. Wear protective eyewear\n4. Schedule follow-up in 1 week\n\nContact us immediately if you experience any complications.",
    timestamp: new Date("2024-01-11T11:30:00"),
    isRead: true,
    isStarred: true,
    type: "inbox",
    priority: "urgent",
    category: "medical",
    attachments: [
      {
        id: "att2",
        name: "post_surgery_care.pdf",
        size: 156432,
        type: "application/pdf",
        url: "/attachments/post_surgery_care.pdf",
      },
      {
        id: "att3",
        name: "medication_schedule.jpg",
        size: 89234,
        type: "image/jpeg",
        url: "/attachments/medication_schedule.jpg",
      },
    ],
    isEncrypted: true,
    tags: ["surgery", "follow-up", "urgent"],
  },
  {
    id: "6",
    subject: "Draft: Question about side effects",
    sender: "John Doe",
    recipient: "Dr. Sarah Smith",
    content:
      "Dear Dr. Smith,\n\nI have been experiencing some side effects from the new medication. Should I be concerned about...",
    timestamp: new Date("2024-01-10T13:20:00"),
    isRead: true,
    isStarred: false,
    type: "draft",
    priority: "normal",
    category: "medical",
    isEncrypted: false,
    tags: ["draft", "medication"],
  },
  {
    id: "7",
    subject: "Payment Confirmation",
    sender: "Billing Department",
    recipient: "John Doe",
    content:
      "Thank you for your payment of $150.00 for your recent visit. Your account is now up to date.",
    timestamp: new Date("2024-01-09T10:00:00"),
    isRead: true,
    isStarred: false,
    type: "archived",
    priority: "low",
    category: "billing",
    isEncrypted: false,
    tags: ["payment", "billing"],
  },
  {
    id: "8",
    subject: "Welcome to MaximEyes Patient Portal",
    sender: "MaximEyes Support",
    recipient: "John Doe",
    content:
      "Welcome to the MaximEyes Patient Portal! Here you can:\n\n• View your medical records\n• Schedule appointments\n• Message your care team\n• Access lab results\n• Manage prescriptions\n\nIf you need help, please contact our support team.",
    timestamp: new Date("2024-01-08T08:00:00"),
    isRead: true,
    isStarred: false,
    type: "inbox",
    priority: "low",
    category: "general",
    isEncrypted: false,
    tags: ["welcome", "portal"],
  },
  {
    id: "9",
    subject: "Annual Eye Exam Reminder",
    sender: "Appointment Scheduler",
    recipient: "John Doe",
    content:
      "It's time for your annual comprehensive eye exam! Please call us at (555) 123-4567 to schedule your appointment.",
    timestamp: new Date("2024-01-07T12:00:00"),
    isRead: false,
    isStarred: false,
    type: "inbox",
    priority: "normal",
    category: "appointment",
    isEncrypted: false,
    tags: ["reminder", "annual-exam"],
  },
  {
    id: "10",
    subject: "Deleted Message",
    sender: "Spam Sender",
    recipient: "John Doe",
    content: "This message was moved to trash.",
    timestamp: new Date("2024-01-06T15:30:00"),
    isRead: false,
    isStarred: false,
    type: "deleted",
    priority: "low",
    category: "general",
    isEncrypted: false,
    tags: ["spam"],
  },
];

// Helper functions for filtering messages
export const getMessagesByType = (
  messages: Message[],
  type: Message["type"]
) => {
  return messages.filter((message) => message.type === type);
};

export const getUnreadMessages = (messages: Message[]) => {
  return messages.filter((message) => !message.isRead);
};

export const getStarredMessages = (messages: Message[]) => {
  return messages.filter((message) => message.isStarred);
};

export const getMessagesByCategory = (
  messages: Message[],
  category: Message["category"]
) => {
  return messages.filter((message) => message.category === category);
};

export const getMessagesByPriority = (
  messages: Message[],
  priority: Message["priority"]
) => {
  return messages.filter((message) => message.priority === priority);
};

export const searchMessages = (messages: Message[], query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(lowercaseQuery) ||
      message.sender.toLowerCase().includes(lowercaseQuery) ||
      message.content.toLowerCase().includes(lowercaseQuery) ||
      message.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
