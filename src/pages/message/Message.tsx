import React, { useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import { Navbar } from "../../components/ui/Navbar";
import { Button, Checkbox, Icon, Input, Loader, TextArea } from "@ketan_nimase/ui";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { toast } from "react-toastify";
import WarningPopup from "../../components/ui/WarningPopup";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

interface Message {
    isSent: boolean;
    isArchived: boolean;
    id: string;
    sender: string;
    subject: string;
    date: string;
    content: string[];
    attachments?: string[];
    isRead: boolean;
    messageType?: string;
    tempMessageType?: string;
    // Threading properties
    threadId?: string;
    parentMessageId?: string;
    isThreadParent?: boolean;
    threadCount?: number;
    replyTo?: string;
}

// Thread interface for organizing messages
interface MessageThread {
    id: string;
    subject: string;
    participants: string[];
    messages: Message[];
    lastMessageDate: string;
    unreadCount: number;
    isExpanded: boolean;
}

interface ComposeMessage {
    to: string;
    subject: string;
    content: string;
    attachments?: File[];
}

const Messages: React.FC = () => {
    // UI State
    const [isComposeVisible, setIsComposeVisible] = useState(false);
    const [isReplyVisible, setIsReplyVisible] = useState(false);
    const [isForwardVisible, setIsForwardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Message[]>([]);
    const [originalMessages, setOriginalMessages] = useState<Message[]>([]);


    // Message State
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "Roy Woodsworth",
            subject: "Your glasses are ready",
            date: "06/11/2025",
            content: [
                "Your glasses are ready. Would be able to pick it up on Monday?",
                "You can pick from July 19-21, anytime between 10-1 PM.",
                "For your son's appointment with Dr. Mary, you can simply click appointments tab and schedule an appointment on preferred date."
            ],
            attachments: [
                "Ref_Letter.pdf",
                "Ref_Letter2.pdf",
                "SampleText.pdf",
                "SampleText_SampleText.pdf"
            ],
            isRead: false,
            isSent: false,
            isArchived: false,
            threadId: "thread_1",
            isThreadParent: true,
            threadCount: 3
        },
        {
            id: "1_reply_1",
            sender: "You",
            subject: "Re: Your glasses are ready",
            date: "06/12/2025",
            content: ["Thank you for letting me know. I'll pick them up on Monday morning."],
            isRead: true,
            isSent: true,
            isArchived: false,
            threadId: "thread_1",
            parentMessageId: "1",
            replyTo: "Roy Woodsworth"
        },
        {
            id: "1_reply_2",
            sender: "Roy Woodsworth",
            subject: "Re: Your glasses are ready",
            date: "06/12/2025",
            content: ["Perfect! We'll have them ready for you. See you Monday!"],
            isRead: false,
            isSent: false,
            isArchived: false,
            threadId: "thread_1",
            parentMessageId: "1_reply_1",
            replyTo: "You"
        },
        {
            id: "2",
            sender: "Dr. Mary Smith",
            subject: "Your Television Visit",
            date: "06/20/2021",
            content: ["This is your television visit summary."],
            isRead: false,
            isSent: true,
            isArchived: false,
            threadId: "thread_2",
            isThreadParent: true,
            threadCount: 1
        },
        {
            id: "3",
            sender: "Dr. Mary Smith",
            subject: "Notification regarding ongoing scheme",
            date: "06/18/2021",
            isRead: false,
            content: ["Details about ongoing health scheme."],
            isSent: false,
            isArchived: false,
            threadId: "thread_3",
            isThreadParent: true,
            threadCount: 1
        }
    ]);

    // Threading State
    const [threads, setThreads] = useState<MessageThread[]>([]);
    const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
    const [showThreadView, setShowThreadView] = useState(true);
    const [isMessageSentVisible, setIsMessageSentVisible] = useState(false);

    // Threading Helper Functions
    const generateThreadId = (subject: string, participants: string[]): string => {
        const cleanSubject = subject.replace(/^(Re:|Fwd:|RE:|FWD:)\s*/i, '').trim();
        const sortedParticipants = participants.sort().join('_');
        return `thread_${cleanSubject}_${sortedParticipants}`.replace(/[^a-zA-Z0-9_]/g, '_');
    };

    const organizeMessagesIntoThreads = (messages: Message[]): MessageThread[] => {
        const threadMap = new Map<string, MessageThread>();

        messages.forEach(message => {
            const threadId = message.threadId || message.id;

            if (!threadMap.has(threadId)) {
                const participants = [message.sender];
                if (message.replyTo && !participants.includes(message.replyTo)) {
                    participants.push(message.replyTo);
                }

                threadMap.set(threadId, {
                    id: threadId,
                    subject: message.subject.replace(/^(Re:|Fwd:|RE:|FWD:)\s*/i, '').trim(),
                    participants,
                    messages: [],
                    lastMessageDate: message.date,
                    unreadCount: 0,
                    isExpanded: expandedThreads.has(threadId)
                });
            }

            const thread = threadMap.get(threadId)!;
            thread.messages.push(message);

            // Update thread metadata
            if (new Date(message.date) > new Date(thread.lastMessageDate)) {
                thread.lastMessageDate = message.date;
            }

            if (!message.isRead) {
                thread.unreadCount++;
            }

            // Add unique participants
            if (!thread.participants.includes(message.sender)) {
                thread.participants.push(message.sender);
            }
            if (message.replyTo && !thread.participants.includes(message.replyTo)) {
                thread.participants.push(message.replyTo);
            }
        });

        // Sort messages within each thread chronologically
        threadMap.forEach(thread => {
            thread.messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        });

        return Array.from(threadMap.values()).sort((a, b) =>
            new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()
        );
    };

    const toggleThreadExpansion = (threadId: string) => {
        setExpandedThreads(prev => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(threadId)) {
                newExpanded.delete(threadId);
            } else {
                newExpanded.add(threadId);
            }
            return newExpanded;
        });
    };

    const getThreadMessages = (threadId: string): Message[] => {
        return messages.filter(msg => msg.threadId === threadId)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };

    const [selectedMessage, setSelectedMessage] = useState<Message | null>(messages[0]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [activeView, setActiveView] = useState<"Inbox" | "Sent Messages" | "Archived Messages">("Inbox");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isComposing, setIsComposing] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [composeMessage, setComposeMessage] = useState<ComposeMessage>({
        to: "",
        subject: "",
        content: "",
        attachments: []
    });

    // Helper function to highlight search terms
    const highlightSearchTerm = (text: string | string[], searchTerm: string) => {
        if (!searchTerm) return Array.isArray(text) ? text.join(' ') : text;

        const textToSearch = Array.isArray(text) ? text.join(' ') : text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = textToSearch.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark key={index} className="bg-yellow-200">{part}</mark>
            ) : (
                part
            )
        );
    };

    // Helper function to get filtered messages
    const getFilteredMessages = () => {
        let filteredMessages = messages;

        if (searchQuery) {
            return searchResults;
        }

        if (activeView === "Inbox") {
            filteredMessages = messages.filter(msg => !msg.isSent && !msg.isArchived);
        } else if (activeView === "Sent Messages") {
            filteredMessages = messages.filter(msg => msg.isSent);
        } else if (activeView === "Archived Messages") {
            filteredMessages = messages.filter(msg => msg.isArchived);
        }

        if (showUnreadOnly) {
            filteredMessages = filteredMessages.filter(msg => !msg.isRead);
        }

        if (showThreadView) {
            // Return only thread parent messages for thread view
            return filteredMessages.filter(msg => msg.isThreadParent);
        }

        return filteredMessages;
    };

    // Initialize original messages on component mount
    useEffect(() => {
        setOriginalMessages(messages);
    }, []);

    // Search functionality
    const handleSearch = async (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setIsSearching(false);
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const filteredMessages = originalMessages.filter(message => {
                const searchTerm = query.toLowerCase();

                const senderMatch = message.sender.toLowerCase().includes(searchTerm);
                const subjectMatch = message.subject.toLowerCase().includes(searchTerm);
                const contentMatch = message.content.some(content =>
                    content.toLowerCase().includes(searchTerm)
                );
                const attachmentMatch = message.attachments?.some(attachment =>
                    attachment.toLowerCase().includes(searchTerm)
                ) || false;

                return senderMatch || subjectMatch || contentMatch || attachmentMatch;
            });

            setSearchResults(filteredMessages);

            if (filteredMessages.length === 0) {
                toast.info(`No messages found for "${query}"`);
            } else {
                toast.success(`Found ${filteredMessages.length} message(s)`);
            }

        } catch (error) {
            toast.error("Search failed. Please try again.");
        } finally {
            setIsLoading(false);
            setIsSearching(false);
        }
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery("");
        setIsSearching(false);
        setSearchResults([]);
    };

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery !== "") {
                handleSearch(searchQuery);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // File handling
    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setComposeMessage((prev) => ({
            ...prev,
            attachments: [...(prev.attachments || []), ...files],
        }));
    };

    // Enhanced bulk selection state
    const [bulkSelectMode, setBulkSelectMode] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    // Selection handlers
    const toggleSelect = (id: string, event?: React.MouseEvent) => {
        event?.stopPropagation(); // Prevent message selection when clicking checkbox

        setSelectedIds((prev) => {
            const newSelected = prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id];

            const filteredMessages = getFilteredMessages();
            setSelectAll(newSelected.length === filteredMessages.length && filteredMessages.length > 0);

            // Auto-enable bulk mode when selecting messages
            if (newSelected.length > 0 && !bulkSelectMode) {
                setBulkSelectMode(true);
            }
            // Auto-disable bulk mode when no messages selected
            if (newSelected.length === 0) {
                setBulkSelectMode(false);
            }

            return newSelected;
        });
    };

    const handleSelectAll = () => {
        const filteredMessages = getFilteredMessages();
        if (selectAll) {
            setSelectedIds([]);
            setSelectAll(false);
            setBulkSelectMode(false);
        } else {
            const allIds = filteredMessages.map(msg => msg.id);
            setSelectedIds(allIds);
            setSelectAll(true);
            setBulkSelectMode(true);
        }
    };

    const handleBulkArchive = async () => {
        if (selectedIds.length === 0) return;

        setIsLoading(true);
        try {
            console.log('Bulk archiving messages:', selectedIds);

            setMessages(prev => prev.map(msg =>
                selectedIds.includes(msg.id)
                    ? { ...msg, isArchived: !msg.isArchived }
                    : msg
            ));

            setSelectedIds([]);
            setSelectAll(false);
            setBulkSelectMode(false);

            toast.success(`Successfully archived ${selectedIds.length} message(s)`);
        } catch (error) {
            console.error('Error bulk archiving messages:', error);
            toast.error('Failed to archive messages. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;

        const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedIds.length} message(s)? This action cannot be undone.`);
        if (!confirmDelete) return;

        setIsLoading(true);
        try {
            console.log('Bulk deleting messages:', selectedIds);

            setMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));

            setSelectedIds([]);
            setSelectAll(false);
            setBulkSelectMode(false);

            toast.success(`Successfully deleted ${selectedIds.length} message(s)`);
        } catch (error) {
            console.error('Error bulk deleting messages:', error);
            toast.error('Failed to delete messages. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkMarkAsRead = async () => {
        if (selectedIds.length === 0) return;

        setIsLoading(true);
        try {
            console.log('Bulk marking as read:', selectedIds);

            setMessages(prev => prev.map(msg =>
                selectedIds.includes(msg.id)
                    ? { ...msg, isRead: true }
                    : msg
            ));

            setSelectedIds([]);
            setSelectAll(false);
            setBulkSelectMode(false);

            toast.success(`Successfully marked ${selectedIds.length} message(s) as read`);
        } catch (error) {
            console.error('Error marking messages as read:', error);
            toast.error('Failed to mark messages as read. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkMarkAsUnread = async () => {
        if (selectedIds.length === 0) return;

        setIsLoading(true);
        try {
            console.log('Bulk marking as unread:', selectedIds);

            setMessages(prev => prev.map(msg =>
                selectedIds.includes(msg.id)
                    ? { ...msg, isRead: false }
                    : msg
            ));

            setSelectedIds([]);
            setSelectAll(false);
            setBulkSelectMode(false);

            toast.success(`Successfully marked ${selectedIds.length} message(s) as unread`);
        } catch (error) {
            console.error('Error marking messages as unread:', error);
            toast.error('Failed to mark messages as unread. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const exitBulkMode = () => {
        setBulkSelectMode(false);
        setSelectedIds([]);
        setSelectAll(false);
    };

    // Message Actions
    const handleCompose = () => {
        setIsComposeVisible(true);
        setIsReplyVisible(false);
        setIsForwardVisible(false);
        setIsComposing(true);
    };
    // Add reply context state
    const [replyContext, setReplyContext] = useState<{
        threadId: string;
        parentMessageId: string;
        originalSubject: string;
    } | null>(null);

    // Enhanced send message handler to maintain threading
    const handleSendMessage = async () => {
        try {
            setIsLoading(true);

            // Determine message type based on current state
            let type: string | undefined;
            if (isReplyVisible) {
                type = "reply";
            } else if (isForwardVisible) {
                type = "forward";
            }

            // Create new message with threading info
            const newMessage: Message = {
                id: `msg_${Date.now()}`,
                sender: "You",
                subject: composeMessage.subject,
                date: new Date().toLocaleDateString(),
                content: [composeMessage.content],
                attachments: composeMessage.attachments?.map(f => f.name),
                isRead: true,
                isSent: true,
                isArchived: false,
                threadId: replyContext?.threadId,
                parentMessageId: replyContext?.parentMessageId,
                replyTo: selectedMessage?.sender,
                messageType: type // Set the message type here
            };

            // Add to messages
            setMessages(prev => [...prev, newMessage]);

            // Update thread count for parent message
            if (replyContext?.threadId) {
                setMessages(prev => prev.map(msg => {
                    if (msg.threadId === replyContext.threadId && msg.isThreadParent) {
                        return { ...msg, threadCount: (msg.threadCount || 1) + 1 };
                    }
                    return msg;
                }));
            }

            toast.success("Message sent successfully");
            setIsComposeVisible(false);
            setIsReplyVisible(false);
            setIsForwardVisible(false);
            setIsComposing(false);
            setReplyContext(null);
            setSelectedMessage(null); // Add this line to clear the selected message
            setIsMessageSentVisible(true); // Set to true to show the message sent screen
        } catch (error) {
            toast.error("Failed to send message");
        } finally {
            setIsLoading(false);
        }
    };

    // Update threads when messages change
    useEffect(() => {
        const organizedThreads = organizeMessagesIntoThreads(getFilteredMessages());
        setThreads(organizedThreads);
    }, [messages, activeView, showUnreadOnly, expandedThreads]);


    const handleReply = (message?: Message) => {
        const msgToReply = message || selectedMessage;
        if (!msgToReply) return;

        setIsReplyVisible(true);
        setIsComposeVisible(false);
        setIsForwardVisible(false);
        setComposeMessage({
            to: msgToReply.sender,
            subject: msgToReply.subject.startsWith('Re:') ? msgToReply.subject : `Re: ${msgToReply.subject}`,
            content: "",
            attachments: []
        });

        // Store thread context for the reply
        setReplyContext({
            threadId: msgToReply.threadId || msgToReply.id,
            parentMessageId: msgToReply.id,
            originalSubject: msgToReply.subject.replace(/^(Re:|Fwd:|RE:|FWD:)\s*/i, '').trim()
        });
    };



    const handleForward = () => {
        if (!selectedMessage) return;
        setIsForwardVisible(true);
        setIsComposeVisible(false);
        setIsReplyVisible(false);
        setComposeMessage({
            to: "",
            subject: `Fwd: ${selectedMessage.subject}`,
            content: selectedMessage.content.join("\n"),
            attachments: []
        });
    };

    const handleArchiveMessages = async () => {
        try {
            setIsLoading(true);
            const messagesToToggle = selectedIds.length > 0 ? selectedIds : selectedMessage ? [selectedMessage.id] : [];

            if (messagesToToggle.length === 0) {
                toast.info("No messages selected");
                return;
            }

            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    messagesToToggle.includes(msg.id)
                        ? { ...msg, isArchived: !msg.isArchived }
                        : msg
                )
            );

            const action = messages.find(m => messagesToToggle.includes(m.id))?.isArchived ? "unarchived" : "archived";
            toast.success(`Messages ${action} successfully!`);
            setSelectedIds([]);
            setSelectedMessage(null);
        } catch (error) {
            toast.error(`Failed to toggle archive status`);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteMessages = async () => {
        // Show warning popup instead of directly deleting
        setShowDeleteWarning(true);
    };

    const confirmDeleteMessages = async () => {
        setShowDeleteWarning(false); // Hide popup
        try {
            setIsLoading(true);
            const messagesToDelete = selectedIds.length > 0 ? selectedIds : selectedMessage ? [selectedMessage.id] : [];
            if (messagesToDelete.length === 0) {
                toast.info("No messages selected for deletion.");
                return;
            }

            toast.success("Messages deleted successfully");
            setMessages(prev => prev.filter(msg => !messagesToDelete.includes(msg.id)));
            setSelectedIds([]);
            setSelectedMessage(null);
        } catch (error) {
            toast.error("Failed to delete messages");
        } finally {
            setIsLoading(false);
        }
    };

    const cancelDeleteMessages = () => {
        setShowDeleteWarning(false); // Hide popup
    };

    return (
        <div className="min-h-screen w-screen flex flex-col">
            <Navbar />
            {/* Two Column Layout */}
            <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className="w-1/4 border-r bg-white flex flex-col" style={{ height: 'calc(100vh - 60px)' }}>
                    {/* Top Section: Search + Header */}
                    <div>
                        {/* Search Bar */}
                        <div className="px-3 pt-3 pb-2 bg-blue-800 text-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Message"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-2 mr-2 py-1 p-4 rounded text-black pr-8"
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    {searchQuery ? (
                                        <Icon
                                            name="close"
                                            height="16px"
                                            width="16px"
                                            colorVariant="dark"
                                            isCursorPointer
                                            onClick={clearSearch}
                                            tooltip
                                            tooltipTitle="Clear Search"
                                            tooltipPlacement="bottom"
                                        />
                                    ) : (
                                        <Icon
                                            name="search"
                                            height="16px"
                                            width="16px"
                                            colorVariant="dark"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Search Results Info */}
                            {isSearching && (
                                <div className="mt-2 text-xs text-blue-100">
                                    {isLoading ? (
                                        <span>Searching...</span>
                                    ) : (
                                        <span>
                                            {searchResults.length} result(s) for "{searchQuery}"
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Gmail-style Header */}
                            <div className="px-0 py-2 flex items-center justify-between bg-blue-800 text-white relative">
                                {/* Left side - Title or Selection Info */}
                                <div className="flex items-center space-x-2">
                                    {bulkSelectMode && selectedIds.length > 0 ? (
                                        <>
                                            {/* Select All Checkbox */}
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={handleSelectAll}
                                            >
                                                <div className={`w-4 h-4 border-2 border-white rounded flex items-center justify-center ${selectAll ? 'bg-white' : 'bg-transparent'
                                                    }`}>
                                                    {selectAll && (
                                                        <Check className="w-3 h-3 text-blue-800" />
                                                    )}
                                                </div>
                                            </div>
                                            {/* Selection Count */}
                                            <span className="font-semibold text-lg">
                                                {selectedIds.length} selected
                                            </span>
                                            {/* Exit bulk mode */}
                                            <button
                                                onClick={exitBulkMode}
                                                className="ml-2 p-1 hover:bg-blue-700 rounded"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <span className="font-semibold text-lg capitalize">
                                            {isSearching ? "Search Results" : activeView}
                                        </span>
                                    )}
                                </div>

                                {/* Right side - Action Icons */}
                                <div className="flex items-center space-x-3 relative">
                                    {bulkSelectMode && selectedIds.length > 0 ? (
                                        // Bulk Action Icons
                                        <>
                                            <Icon
                                                colorVariant="light"
                                                height="20px"
                                                isCursorPointer
                                                name="envelope"
                                                stroke
                                                width="20px"
                                                onClick={handleBulkMarkAsRead}
                                                tooltip
                                                tooltipTitle="Mark as Read"
                                                tooltipPlacement="bottom"
                                            />
                                            <Icon
                                                colorVariant="light"
                                                height="20px"
                                                isCursorPointer
                                                name="undo"
                                                stroke
                                                width="20px"
                                                onClick={handleBulkArchive}
                                                tooltip
                                                tooltipTitle="Archive"
                                                tooltipPlacement="bottom"
                                            />
                                            <Icon
                                                colorVariant="light"
                                                height="20px"
                                                isCursorPointer
                                                name="delete"
                                                stroke
                                                width="20px"
                                                onClick={handleBulkDelete}
                                                tooltip
                                                tooltipTitle="Delete"
                                                tooltipPlacement="bottom"
                                            />
                                        </>
                                    ) : (
                                        // Normal Action Icons
                                        <>
                                            {activeView === "Inbox" && !isSearching && (
                                                <Icon
                                                    colorVariant="light"
                                                    height="23px"
                                                    isCursorPointer
                                                    name="envelope"
                                                    stroke
                                                    width="20px"
                                                    onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                                                    tooltip
                                                    tooltipTitle="Show Unread"
                                                    tooltipPlacement="bottom"
                                                />
                                            )}

                                            <Icon
                                                colorVariant="light"
                                                height="23px"
                                                isCursorPointer
                                                name="plus_circle"
                                                stroke
                                                width="20px"
                                                onClick={handleCompose}
                                                tooltip
                                                tooltipTitle="Compose New"
                                                tooltipPlacement="bottom"
                                            />

                                            {!isSearching && (
                                                <div className="relative">
                                                    <Icon
                                                        className="pt-1 pl-0"
                                                        colorVariant="light"
                                                        height="18px"
                                                        isCursorPointer
                                                        name="action_button"
                                                        stroke
                                                        width="20px"
                                                        fill
                                                        onClick={() => setShowDropdown((prev) => !prev)}
                                                        tooltip
                                                        tooltipTitle="Switch View"
                                                        tooltipPlacement="bottom"
                                                    />

                                                    {showDropdown && (
                                                        <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-sm z-10 whitespace-nowrap" style={{ minWidth: "fit-content", maxWidth: "100%", overflowX: "auto" }}>
                                                            {["Inbox", "Sent Messages", "Archived Messages"]
                                                                .filter((view) => view !== activeView)
                                                                .map((view) => (
                                                                    <div
                                                                        key={view}
                                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                                        onClick={() => {
                                                                            setActiveView(view as typeof activeView);
                                                                            setShowDropdown(false);
                                                                            clearSearch();
                                                                            exitBulkMode(); // Exit bulk mode when switching views
                                                                        }}
                                                                    >
                                                                        {view}
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="overflow-y-auto" style={{ height: 'calc(100vh - 170px)' }}>
                            {getFilteredMessages().length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                                    <Icon
                                        name={isSearching ? "search" : "envelope"}
                                        height="80px"
                                        width="80px"
                                        stroke
                                        colorVariant="dark"
                                        opacity="0.4"
                                    />
                                    <p className="text-lg mt-2">
                                        {isSearching ? "No search results found" : `No ${activeView.toLowerCase()} messages`}
                                    </p>
                                </div>
                            ) : (
                                getFilteredMessages().map((message) => (
                                    <div
                                        key={message.id}
                                        className={`px-3 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedMessage?.id === message.id ? "bg-blue-50" : ""
                                            } ${selectedIds.includes(message.id) ? "bg-blue-25" : ""}`}
                                        onClick={() => {
                                            if (!bulkSelectMode) {
                                                setSelectedMessage(message);
                                                setIsComposeVisible(false);
                                                setIsReplyVisible(false);
                                                setIsForwardVisible(false);
                                                setIsComposing(false);
                                                setIsMessageSentVisible(false); // Add this line
                                            }
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center space-x-2">
                                                {/* Checkbox for bulk selection */}
                                                <div
                                                    className="flex items-center cursor-pointer"
                                                    onClick={(e) => toggleSelect(message.id, e)}
                                                >
                                                    <div className={`w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center ${selectedIds.includes(message.id) ? 'bg-blue-600 border-blue-600' : 'bg-white'
                                                        }`}>
                                                        {selectedIds.includes(message.id) && (
                                                            <Check className="w-3 h-3 text-white" />
                                                        )}
                                                    </div>
                                                </div>

                                                {!message.isRead && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                )}
                                                <span className={`text-sm ${!message.isRead ? "font-semibold" : "font-medium"
                                                    } text-gray-900 truncate`}>
                                                    {highlightSearchTerm(message.sender, searchQuery)}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500">{message.date}</span>
                                        </div>
                                        <p className={`text-sm ${!message.isRead ? "font-medium" : ""
                                            } text-gray-700 truncate mb-1 ml-6`}>
                                            {highlightSearchTerm(message.subject, searchQuery)}
                                        </p>
                                        {message.attachments && message.attachments.length > 0 && (
                                            <div className="flex items-center mt-1 ml-6">
                                                <Icon
                                                    name="attachment"
                                                    height="12px"
                                                    width="12px"
                                                    colorVariant="dark"
                                                    className="mr-1"
                                                />
                                                <span className="text-xs text-gray-500">
                                                    {message.attachments.length} attachment(s)
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 bg-gray-50 flex flex-col">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        {/* <h1 className="text-xl font-semibold text-gray-900">
                            {isComposeVisible
                                ? "Compose"
                                : isReplyVisible
                                    ? "Reply"
                                    : isForwardVisible
                                        ? "Forward"
                                        : selectedMessage
                                            ? selectedMessage.subject
                                            : "Select a Message"}
                        </h1> */}
                        {isComposeVisible
                            ? <div className="flex items-center justify-start">
                                <h1 className="text-xl font-semibold text-gray-900 mr-4">Compose</h1>
                                <Icon
                                    colorVariant="primary"
                                    height="20px"
                                    width="20px"
                                    isCursorPointer
                                    isbadge
                                    name="info_circle"
                                    stroke
                                    tooltip
                                    tooltipTitle="Send a secure message to us. Type a simple text message. No special characters allowed.
                            Note: You will not be able to make changes to this message or attachments after sending it to Practice"
                                    tooltipPlacement="bottom"
                                />
                            </div>
                            : isReplyVisible
                                ? "Reply"
                                : isForwardVisible
                                    ? "Forward"
                                    : selectedMessage
                                        ? selectedMessage.subject
                                        : "Select a Message"}

                        <div className="flex items-center space-x-2">
                            {isComposing ? (
                                <>
                                    <Icon
                                        className="px-2"
                                        colorVariant="primary"
                                        height="20px"
                                        isCursorPointer
                                        name="attachment"
                                        stroke
                                        width="20px"
                                        onClick={handleAttachClick}
                                    />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        multiple
                                        style={{ display: "none" }}
                                    />
                                </>
                            ) : selectedMessage ? (
                                <>
                                    <Icon
                                        className="px-2"
                                        colorVariant="primary"
                                        height="20px"
                                        isCursorPointer
                                        name={selectedMessage?.isArchived ? "archive" : "archive"}
                                        stroke
                                        width="20px"
                                        onClick={handleArchiveMessages}
                                        tooltip
                                        tooltipPlacement='bottom'
                                        tooltipTitle={selectedMessage?.isArchived ? "unarchive" : "archive"}
                                    />
                                    <Icon
                                        className="px-2"
                                        colorVariant="primary"
                                        height="20px"
                                        isCursorPointer
                                        name="undo"
                                        stroke
                                        width="20px"
                                        onClick={(e) => handleReply()}
                                        tooltip
                                        tooltipPlacement='bottom'
                                        tooltipTitle="Reply"
                                    />
                                    <Icon
                                        className="px-2"
                                        colorVariant="primary"
                                        height="20px"
                                        isCursorPointer
                                        name="redo"
                                        stroke
                                        width="20px"
                                        onClick={handleForward}
                                    />
                                    <Icon
                                        className="px-2"
                                        colorVariant="primary"
                                        height="20px"
                                        isCursorPointer
                                        name="delete"
                                        stroke
                                        width="20px"
                                        onClick={handleDeleteMessages}
                                    />
                                </>
                            ) : null}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 py-4 overflow-y-auto space-y-6">
                        {isLoading && (
                            <div className="flex justify-center items-center h-screen w-screen">
                                <Loader loaderType="spin" />
                            </div>
                        )}

                        {/* Compose UI */}
                        {(isComposeVisible || isReplyVisible || isForwardVisible) && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="space-y-4">
                                    <div>
                                        <Input
                                            inputType="text"
                                            label
                                            value={composeMessage.to}
                                            onChange={(e) =>
                                                setComposeMessage({ ...composeMessage, to: e.target.value })
                                            }
                                            className="mt-1 block w-full text-sm font-medium text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" name={'To:'}
                                            isDisabled={isReplyVisible}
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            inputType="text"
                                            label
                                            value={composeMessage.subject}
                                            onChange={(e) => setComposeMessage({ ...composeMessage, subject: e.target.value })}
                                            className="mt-1 block w-full text-sm font-medium text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" name={'Subject:'} />
                                    </div>

                                    <div>
                                        <TextArea
                                            label="Message"
                                            placeholder="Enter Description"
                                            rows={6}
                                            onChange={(e) =>
                                                setComposeMessage({ ...composeMessage, content: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            showTitle
                                        />
                                    </div>
                                    <Checkbox
                                        labelText="Add this Information to my Medical Chart"
                                        showText
                                    />

                                    {composeMessage.attachments?.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium mb-2">
                                                Attachments:
                                                <Icon
                                                    className="px-2"
                                                    colorVariant="dark"
                                                    height="16px"
                                                    name="attachment"
                                                    stroke
                                                    width="16px"
                                                />
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {composeMessage.attachments.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-gray-100 text-sm px-2 py-1 rounded flex items-center gap-2"
                                                    >
                                                        <span>{file.name}</span>
                                                        <Button
                                                            onClick={() => {
                                                                setComposeMessage((prev) => ({
                                                                    ...prev,
                                                                    attachments: prev.attachments?.filter((_, i) => i !== index),
                                                                }));
                                                            }}
                                                            className="text-red-600 hover:text-red-800 text-sm bg-gray-100 font-bold border-none"
                                                        >
                                                            ✕
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-center space-x-4">
                                        <Button
                                            colorVariant="default"
                                            className='px-4'
                                            onClick={() => {
                                                setIsComposeVisible(false);
                                                setIsReplyVisible(false);
                                                setIsForwardVisible(false);
                                                setIsComposing(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className='px-4'
                                            colorVariant="primary"
                                            onClick={handleSendMessage}
                                            isDisabled={isLoading}
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Message View */}
                        {!isComposeVisible && !isReplyVisible && !isForwardVisible && selectedMessage && (
                            <>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        From: {selectedMessage.sender} | {selectedMessage.date}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {selectedMessage.messageType === "forward" && (
                                        <div className="border-b border-gray-300 pb-2 mb-4">
                                            <p className="text-sm text-gray-600">-----Forwarded Message-----</p>
                                            <p className="text-sm text-gray-600">From: {selectedMessage.replyTo || selectedMessage.sender} | {selectedMessage.date}</p>
                                        </div>
                                    )}
                                    {selectedMessage.messageType === "reply" && (
                                        <div className="border-b border-gray-300 pb-2 mb-4">
                                            <p className="text-sm text-gray-600">-----Replayed Message-----</p>
                                            <p className="text-sm text-gray-600">From: {selectedMessage.replyTo || selectedMessage.sender} | {selectedMessage.date}</p>
                                        </div>
                                    )}
                                    {selectedMessage.content.map((line, i) => (
                                        <div key={i} className="bg-gray-50 p-4 rounded border">
                                            <div className="text-sm text-gray-700 mb-2">
                                                <span className="font-medium">{selectedMessage.sender}</span> wrote:
                                            </div>
                                            <div className="text-gray-900">{line}</div>
                                        </div>
                                    ))}
                                </div>

                                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                                    <div className="bg-white p-4 rounded border">
                                        <h4 className="font-medium mb-2">Attachments:</h4>
                                        <div className="space-y-2">
                                            {selectedMessage.attachments.map((attachment, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                    <span className="text-sm">{attachment}</span>
                                                    <Button size="sm" colorVariant="primary">
                                                        Download
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex space-x-4">
                                    <Button colorVariant="primary" onClick={() => handleReply()}>
                                        Reply
                                    </Button>
                                    <Button colorVariant="default" onClick={handleForward}>
                                        Forward
                                    </Button>
                                </div>
                            </>
                        )}

                        {!selectedMessage && !isComposeVisible && !isReplyVisible && !isForwardVisible && !isMessageSentVisible && (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <div className="text-center">
                                    <Icon
                                        name="envelope"
                                        height="64px"
                                        width="64px"
                                        stroke
                                        colorVariant="dark"
                                        opacity="0.4"
                                    />
                                    <p className="mt-4 text-lg">Select a message to view</p>
                                </div>
                            </div>
                        )}

                        {isMessageSentVisible && (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <Icon
                                        name="tick_circle"
                                        height="100px"
                                        width="100px"
                                        colorVariant="success"
                                    />
                                    <h2 className="text-4xl font-semibold text-gray-800 mt-4">Message Sent</h2>
                                    <p className="text-sm text-gray-500 mt-2">Your message has been sent successfully.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showDeleteWarning && (
                <WarningPopup
                    message="Are you sure you want to delete the selected messages? This action cannot be undone."
                    onConfirm={confirmDeleteMessages}
                    onCancel={cancelDeleteMessages}
                    confirmText="Delete"
                    cancelText="Cancel"
                    confirmColor="bg-red-500 text-white"
                    iconName='delete'
                />
            )}
        </div >
    );
};

export default Messages;