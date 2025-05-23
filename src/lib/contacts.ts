// Mock data for contacts
const contacts = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+12025550101',
    email: 'john.doe@example.com',
    tags: ['lead', 'website-inquiry'],
    lists: ['new-leads'],
    lastContact: '2025-05-15T14:30:00Z',
    notes: 'Interested in premium plan',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+12025550102',
    email: 'jane.smith@example.com',
    tags: ['customer', 'high-value'],
    lists: ['customers', 'newsletter'],
    lastContact: '2025-05-10T11:15:00Z',
    notes: 'Renewed annual subscription',
    status: 'active',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    phone: '+12025550103',
    email: 'robert.j@example.com',
    tags: ['lead', 'referral'],
    lists: ['new-leads'],
    lastContact: '2025-05-08T09:45:00Z',
    notes: 'Referred by Jane Smith',
    status: 'active',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    phone: '+12025550104',
    email: 'emily.w@example.com',
    tags: ['customer', 'support-ticket'],
    lists: ['customers', 'support'],
    lastContact: '2025-05-12T16:20:00Z',
    notes: 'Had issues with login, resolved',
    status: 'active',
  },
  {
    id: '5',
    name: 'Michael Brown',
    phone: '+12025550105',
    email: 'michael.b@example.com',
    tags: ['lead', 'event-signup'],
    lists: ['event-may-2025'],
    lastContact: '2025-05-14T13:10:00Z',
    notes: 'Attended webinar, follow up required',
    status: 'active',
  },
];

// Mock data for contact lists
const contactLists = [
  {
    id: 'new-leads',
    name: 'New Leads',
    description: 'Recently acquired leads',
    contactCount: 2,
    createdAt: '2025-04-01T10:00:00Z',
  },
  {
    id: 'customers',
    name: 'Current Customers',
    description: 'Active paying customers',
    contactCount: 2,
    createdAt: '2025-04-01T10:15:00Z',
  },
  {
    id: 'newsletter',
    name: 'Newsletter Subscribers',
    description: 'Contacts who opted into the newsletter',
    contactCount: 1,
    createdAt: '2025-04-02T14:30:00Z',
  },
  {
    id: 'support',
    name: 'Support Contacts',
    description: 'Contacts who have open or recent support tickets',
    contactCount: 1,
    createdAt: '2025-04-10T09:45:00Z',
  },
  {
    id: 'event-may-2025',
    name: 'May 2025 Event',
    description: 'Contacts registered for the May virtual event',
    contactCount: 1,
    createdAt: '2025-04-15T11:20:00Z',
  },
];

// Mock data for contact tags
const contactTags = [
  {
    id: 'lead',
    name: 'Lead',
    contactCount: 3,
    color: 'blue',
  },
  {
    id: 'customer',
    name: 'Customer',
    contactCount: 2,
    color: 'green',
  },
  {
    id: 'website-inquiry',
    name: 'Website Inquiry',
    contactCount: 1,
    color: 'purple',
  },
  {
    id: 'high-value',
    name: 'High Value',
    contactCount: 1,
    color: 'gold',
  },
  {
    id: 'referral',
    name: 'Referral',
    contactCount: 1,
    color: 'orange',
  },
  {
    id: 'support-ticket',
    name: 'Support Ticket',
    contactCount: 1,
    color: 'red',
  },
  {
    id: 'event-signup',
    name: 'Event Signup',
    contactCount: 1,
    color: 'teal',
  },
];

// Function to get all contacts
export async function getContacts(filters = {}) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        contacts: contacts,
      });
    }, 300);
  });
}

// Function to get a specific contact by ID
export async function getContact(id: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const contact = contacts.find((c) => c.id === id);
      
      if (contact) {
        resolve({
          success: true,
          contact,
        });
      } else {
        resolve({
          success: false,
          error: 'Contact not found',
        });
      }
    }, 300);
  });
}

// Function to get all contact lists
export async function getContactLists() {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        lists: contactLists,
      });
    }, 300);
  });
}

// Function to get a specific contact list by ID
export async function getContactList(id: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const list = contactLists.find((l) => l.id === id);
      
      if (list) {
        // Find contacts in this list
        const listContacts = contacts.filter((c) => c.lists.includes(id));
        
        resolve({
          success: true,
          list,
          contacts: listContacts,
        });
      } else {
        resolve({
          success: false,
          error: 'Contact list not found',
        });
      }
    }, 300);
  });
}

// Function to get all contact tags
export async function getContactTags() {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        tags: contactTags,
      });
    }, 300);
  });
}

// Function to get contacts by tag
export async function getContactsByTag(tagId: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const tag = contactTags.find((t) => t.id === tagId);
      
      if (tag) {
        // Find contacts with this tag
        const taggedContacts = contacts.filter((c) => c.tags.includes(tagId));
        
        resolve({
          success: true,
          tag,
          contacts: taggedContacts,
        });
      } else {
        resolve({
          success: false,
          error: 'Contact tag not found',
        });
      }
    }, 300);
  });
}

// Function to create a new contact
export async function createContact(contactData: any) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const newContact = {
        id: String(contacts.length + 1),
        lastContact: new Date().toISOString(),
        status: 'active',
        ...contactData,
      };
      
      // In a real app, this would be added to the database
      contacts.push(newContact as any);
      
      resolve({
        success: true,
        contact: newContact,
      });
    }, 300);
  });
}

// Function to update an existing contact
export async function updateContact(id: string, contactData: any) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const contactIndex = contacts.findIndex((c) => c.id === id);
      
      if (contactIndex === -1) {
        resolve({
          success: false,
          error: 'Contact not found',
        });
        return;
      }
      
      const updatedContact = {
        ...contacts[contactIndex],
        ...contactData,
      };
      
      // In a real app, this would update the record in the database
      contacts[contactIndex] = updatedContact as any;
      
      resolve({
        success: true,
        contact: updatedContact,
      });
    }, 300);
  });
}

// Function to delete a contact
export async function deleteContact(id: string) {
  // Simulate API request
  return await new Promise((resolve) => {
    setTimeout(() => {
      const contactIndex = contacts.findIndex((c) => c.id === id);
      
      if (contactIndex === -1) {
        resolve({
          success: false,
          error: 'Contact not found',
        });
        return;
      }
      
      // In a real app, this would delete the record from the database
      const deletedContact = contacts.splice(contactIndex, 1)[0];
      
      resolve({
        success: true,
        contact: deletedContact,
      });
    }, 300);
  });
}

// Export all functions
export const contactService = {
  getContacts,
  getContact,
  getContactLists,
  getContactList,
  getContactTags,
  getContactsByTag,
  createContact,
  updateContact,
  deleteContact,
};