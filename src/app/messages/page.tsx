"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Send, 
  Phone, 
  User, 
  Users, 
  Clock,
  RefreshCw,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendSMS, sendBulkSMS } from "@/lib/twilio";

interface Message {
  id: string;
  from: string;
  to: string;
  body: string;
  direction: 'inbound' | 'outbound';
  status: 'delivered' | 'sent' | 'failed' | 'received';
  timestamp: string;
}

// Mock messages data for display
const mockMessages: Message[] = [
  {
    id: '1',
    from: '+12025550101',
    to: '+12025550142',
    body: 'Hi, I\'m interested in learning more about your service',
    direction: 'inbound',
    status: 'received',
    timestamp: '2025-05-23T09:15:00Z',
  },
  {
    id: '2',
    from: '+12025550142',
    to: '+12025550101',
    body: 'Thanks for reaching out! We offer SMS marketing automation and campaign management. What specific features are you looking for?',
    direction: 'outbound',
    status: 'delivered',
    timestamp: '2025-05-23T09:20:00Z',
  },
  {
    id: '3',
    from: '+12025550102',
    to: '+12025550142',
    body: 'When will the new features be available?',
    direction: 'inbound',
    status: 'received',
    timestamp: '2025-05-23T10:05:00Z',
  },
  {
    id: '4',
    from: '+12025550142',
    to: '+12025550102',
    body: 'Our new features will be released next week! You\'ll be able to use advanced segmentation and A/B testing.',
    direction: 'outbound',
    status: 'delivered',
    timestamp: '2025-05-23T10:10:00Z',
  },
  {
    id: '5',
    from: '+12025550103',
    to: '+12025550142',
    body: 'I need help with my account',
    direction: 'inbound',
    status: 'received',
    timestamp: '2025-05-23T11:30:00Z',
  },
];

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<string | null>('+12025550101');
  const [messageText, setMessageText] = useState('');
  const [bulkRecipients, setBulkRecipients] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSendingBulk, setIsSendingBulk] = useState(false);
  const { toast } = useToast();

  // Filter messages for the active conversation
  const conversationMessages = mockMessages.filter(
    msg => msg.from === activeConversation || msg.to === activeConversation
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Get unique contacts from messages
  const contacts = Array.from(
    new Set(
      mockMessages.map(msg => 
        msg.direction === 'inbound' ? msg.from : msg.to
      ).filter(number => number !== '+12025550142')
    )
  );

  // Handle sending a single message
  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeConversation) return;
    
    setIsSending(true);
    
    try {
      // In a real app, this would send through Twilio
      const result = await sendSMS(activeConversation, messageText);
      
      if (result.success) {
        toast({
          title: "Message sent",
          description: "Your message has been sent successfully",
        });
        setMessageText('');
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Handle sending bulk messages
  const handleSendBulkMessages = async () => {
    if (!bulkMessage.trim() || !bulkRecipients.trim()) return;
    
    const recipients = bulkRecipients.split(',').map(r => r.trim());
    if (recipients.length === 0) return;
    
    setIsSendingBulk(true);
    
    try {
      // In a real app, this would send through Twilio
      const result = await sendBulkSMS(recipients, bulkMessage);
      
      if (result.success) {
        toast({
          title: "Bulk messages sent",
          description: `Successfully sent to ${result.sent}/${recipients.length} recipients`,
        });
        setBulkMessage('');
        setBulkRecipients('');
      } else {
        throw new Error(result.error || 'Failed to send bulk messages');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send bulk messages",
        variant: "destructive",
      });
    } finally {
      setIsSendingBulk(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        
        <Tabs defaultValue="conversations" className="w-full">
          <TabsList>
            <TabsTrigger value="conversations" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Bulk Messaging
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversations">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Contacts/Conversations List */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Conversations</CardTitle>
                  <div className="mt-2">
                    <Input placeholder="Search contacts..." />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {contacts.map(contact => (
                      <div 
                        key={contact}
                        className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-muted ${
                          activeConversation === contact ? 'bg-muted' : ''
                        }`}
                        onClick={() => setActiveConversation(contact)}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{contact}</p>
                          <p className="text-xs text-muted-foreground">
                            Last message: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Message Thread */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="ml-3">{activeConversation || 'Select a conversation'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4 h-[400px] overflow-y-auto mb-4">
                    {activeConversation ? (
                      conversationMessages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${
                            message.direction === 'outbound' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div className={`max-w-[70%] p-3 rounded-lg ${
                            message.direction === 'outbound' 
                              ? 'bg-primary text-primary-foreground rounded-tr-none' 
                              : 'bg-muted rounded-tl-none'
                          }`}>
                            <p className="text-sm">{message.body}</p>
                            <div className="flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1 opacity-70" />
                              <p className="text-xs opacity-70">
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {message.direction === 'outbound' && (
                                <div className="flex items-center ml-2">
                                  <CheckCircle2 className="h-3 w-3 opacity-70" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Select a conversation to view messages</p>
                      </div>
                    )}
                  </div>
                  
                  {activeConversation && (
                    <div className="flex space-x-2">
                      <Textarea 
                        placeholder="Type your message..." 
                        className="flex-1"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        disabled={isSending}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!messageText.trim() || isSending}
                      >
                        {isSending ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Messaging</CardTitle>
                <CardDescription>
                  Send messages to multiple recipients at once
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Recipients</label>
                  <Textarea 
                    placeholder="Enter phone numbers separated by commas..."
                    value={bulkRecipients}
                    onChange={(e) => setBulkRecipients(e.target.value)}
                    disabled={isSendingBulk}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: +12025550101, +12025550102, etc.
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea 
                    placeholder="Type your message..."
                    className="h-32"
                    value={bulkMessage}
                    onChange={(e) => setBulkMessage(e.target.value)}
                    disabled={isSendingBulk}
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleSendBulkMessages}
                  disabled={!bulkMessage.trim() || !bulkRecipients.trim() || isSendingBulk}
                >
                  {isSendingBulk ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Bulk Messages
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}