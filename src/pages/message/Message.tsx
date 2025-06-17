import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components/ui/Navbar";
import { Button, Icon } from "@ketan_nimase/ui";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { toast } from "react-toastify";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

interface Message {
    isSent: any;
    isArchived: any;
    id: number;
    sender: string;
    subject: string;
    date: string;
    content: string[];
    attachments?: string[];
    isRead: boolean;
    messageType?: string;
    tempMessageType?: string;
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
    const [showArchived, setShowArchived] = useState(false);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    // Message State
    // Message Loading Effect
    useEffect(() => {
        const loadMessages = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API call
                const response = showArchived
                    ? messages.filter(m => m.tempMessageType === "Archive")
                    : showUnreadOnly
                        ? messages.filter(m => !m.isRead)
                        : messages;

                setMessages(response);
            } catch (error) {
                toast.error("Failed to load messages");
            } finally {
                setIsLoading(false);
            }
        };

        loadMessages();
    }, [showArchived, showUnreadOnly]);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
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
            isArchived: false
        },
        {
            id: 2,
            sender: "Dr. Mary Smith",
            subject: "Your Television Visit",
            date: "06/20/2021",
            content: ["This is your television visit summary."],
            isRead: false,
            isSent: true,
            isArchived: false
        },
        {
            id: 3,
            sender: "Dr. Mary Smith",
            subject: "Notification regarding ongoing scheme",
            date: "06/18/2021",
            isRead: false,
            content: ["Details about ongoing health scheme."],
            isSent: false,
            isArchived: false
        }
    ]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(messages[0]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [activeView, setActiveView] = useState<"Inbox" | "Sent Messages" | "Archived Messages">("Inbox");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isComposing, setIsComposing] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const [composeMessage, setComposeMessage] = useState<ComposeMessage>({
        to: "",
        subject: "",
        content: "",
        attachments: []
    });

    // Message Actions
    const handleCompose = () => {
        setIsComposeVisible(true);
        setIsReplyVisible(false);
        setIsForwardVisible(false);
    };

    const handleReply = () => {
        if (!selectedMessage) return;
        setIsReplyVisible(true);
        setIsComposeVisible(false);
        setIsForwardVisible(false);
        setComposeMessage({
            to: selectedMessage.sender,
            subject: `Re: ${selectedMessage.subject}`,
            content: "",
            attachments: []
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

    const handleSendMessage = async () => {
        try {
            setIsLoading(true);
            // TODO: Implement actual API call
            toast.success("Message sent successfully");
            setIsComposeVisible(false);
            setIsReplyVisible(false);
            setIsForwardVisible(false);
        } catch (error) {
            toast.error("Failed to send message");
        } finally {
            setIsLoading(false);
        }
    };

    const handleArchiveMessages = async () => {
        try {
            setIsLoading(true);
            // TODO: Implement actual API call
            const messagesToArchive = selectedIds.length > 0 ? selectedIds : selectedMessage ? [selectedMessage.id] : [];
            if (messagesToArchive.length === 0) return;

            toast.success("Messages archived successfully");
            // Update UI
            setMessages(prev => prev.filter(msg => !messagesToArchive.includes(msg.id)));
            setSelectedIds([]);
            setSelectedMessage(null);
        } catch (error) {
            toast.error("Failed to archive messages");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteMessages = async () => {
        try {
            setIsLoading(true);
            // TODO: Implement actual API call
            const messagesToDelete = selectedIds.length > 0 ? selectedIds : selectedMessage ? [selectedMessage.id] : [];
            if (messagesToDelete.length === 0) return;

            toast.success("Messages deleted successfully");
            // Update UI
            setMessages(prev => prev.filter(msg => !messagesToDelete.includes(msg.id)));
            setSelectedIds([]);
            setSelectedMessage(null);
        } catch (error) {
            toast.error("Failed to delete messages");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-screen flex flex-col">
            <Navbar patientName={{ firstName: "Jeffery", lastName: "Stevenson" }} />
            {/* Two Column Layout */}
            <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className="w-1/4 border-r bg-white flex flex-col" style={{ height: 'calc(100vh - 60px)' }}>
                    {/* Top Section: Search + Inbox */}
                    <div>
                        {/* Search Bar */}
                        <div className="px-3 pt-3 pb-2 bg-blue-800 text-white">
                            <input
                                type="text"
                                placeholder="Search Message"
                                className="w-full px-2 mr-2 py-1 p-4 rounded text-black"
                            />
                            <div className="px-0 py-2 flex items-center justify-between bg-blue-800 text-white relative">
                                <span className="font-semibold text-lg capitalize">{activeView}</span>

                                <div className="flex items-center space-x-5 relative">
                                    {activeView === "Inbox" && (
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
                                        onClick={() => {
                                            setIsComposing(true);
                                            setIsComposeVisible(true);
                                            setIsReplyVisible(false);
                                            setIsForwardVisible(false);
                                            setSelectedMessage(null);
                                            { handleCompose }
                                        }}
                                        tooltip
                                        tooltipTitle="Compose New"
                                        tooltipPlacement="bottom"
                                    />

                                    {/* Action Dropdown Trigger */}
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

                                        {/* Dropdown List */}
                                        {showDropdown && (
                                            <div
                                                className="absolute right-0 mt-2 bg-white text-black rounded shadow-sm z-10 whitespace-nowrap"
                                                style={{ minWidth: "fit-content", maxWidth: "100%", overflowX: "auto" }}
                                            >
                                                {["Inbox", "Sent Messages", "Archived Messages"]
                                                    .filter((view) => view !== activeView)
                                                    .map((view) => (
                                                        <div
                                                            key={view}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                setActiveView(view as typeof activeView);
                                                                setShowDropdown(false);
                                                            }}
                                                        >
                                                            {view}
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="overflow-y-auto" style={{ height: 'calc(100vh - 170px)' }}>
                            {messages.filter((msg) => {
                                if (activeView === "Inbox") return !msg.isSent && !msg.isArchived;
                                if (activeView === "Sent Messages") return msg.isSent;
                                if (activeView === "Archived Messages") return msg.isArchived;
                                return true;
                            }).length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                                    <Icon
                                        name="envelope"
                                        height="80px"
                                        width="80px"
                                        stroke
                                        colorVariant="dark"
                                        opacity="0.4"
                                    />
                                    <p className="text-lg mt-2">
                                        There are no messages in {activeView.toLowerCase()}.
                                    </p>
                                </div>
                            ) : (
                                messages
                                    .filter((msg) => {
                                        if (activeView === "Inbox") return !msg.isSent && !msg.isArchived;
                                        if (activeView === "Sent Messages") return msg.isSent;
                                        if (activeView === "Archived Messages") return msg.isArchived;
                                        return true;
                                    })
                                    .map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`m-1 border-b cursor-pointer flex items-start gap-2 ${selectedMessage?.id === msg.id ? 'bg-gray-100' : 'hover:bg-gray-200'
                                                }`}
                                            onClick={() => {
                                                setSelectedMessage(msg);
                                                setMessages((prev) =>
                                                    prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
                                                );
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="mt-1"
                                                checked={selectedIds.includes(msg.id)}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    toggleSelect(msg.id);
                                                }}
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <p className={`text-sm truncate ${msg.isRead ? 'font-normal text-black' : 'font-bold text-black'}`}>
                                                        {msg.sender}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {dayjs(msg.date).isToday()
                                                            ? dayjs(msg.date).format('hh:mm A')
                                                            : dayjs(msg.date).isYesterday()
                                                                ? 'Yesterday'
                                                                : dayjs(msg.date).format('MM/DD/YYYY')}
                                                    </p>
                                                </div>
                                                <p className={`text-xs truncate ${msg.isRead ? 'font-normal' : 'font-semibold'}`}>
                                                    {msg.subject}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>

                    </div>

                    {/* Sticky Footer */}
                    <div className="mt-auto border-t bg-white flex justify-between items-center text-sm text-gray-500 px-4 py-2">
                        <div className="text-xs">Version: 1.0</div>
                        <div className="flex items-center gap-2">
                            <span className="cursor-pointer">&laquo;</span>
                            <span className="px-2 py-1 bg-gray-200 rounded">1</span>
                            <span className="cursor-pointer">&raquo;</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Message Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-3 border-b bg-white shadow-sm sticky top-0 z-10 flex items-center justify-between">
                        {/* Left: Dynamic Heading */}
                        <h2 className="text-xl font-semibold text-blue-800">
                            {isComposing
                                ? "Compose"
                                : selectedMessage
                                    ? selectedMessage.subject
                                    : "Select a Message"}
                        </h2>

                        {/* Right: Dynamic Icons */}
                        <div className="flex items-center">
                            {isComposing ? (
                                // Only show attachment icon when composing
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
                                // Show standard message actions when a message is selected
                                <>
                                    <Icon
                                        className="px-2"
                                        colorVariant="primary"
                                        height="20px"
                                        isCursorPointer
                                        name="file"
                                        stroke
                                        width="20px"
                                        onClick={handleReply}
                                    />
                                    <Icon
                                        className="px-2"
                                        colorVariant="primary"
                                        height="20px"
                                        isCursorPointer
                                        name="undo"
                                        stroke
                                        width="20px"
                                        onClick={handleArchiveMessages}
                                    />
                                    <Icon
                                        className="px-2"
                                        colorVariant="primary"
                                        height="20px"
                                        isCursorPointer
                                        name="right_arrow_1"
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

                    {/* Thread Body */}
                    <div className="flex-1 px-6 py-4 overflow-y-auto space-y-6">
                        {/* Loading Spinner */}
                        {isLoading && (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                            </div>
                        )}

                        {/* Compose UI */}
                        {(isComposeVisible || isReplyVisible || isForwardVisible) && (
                            <div className="bg-white rounded-lg shadow p-6">
                                {/* Compose Form Fields */}
                                <div className="space-y-4">
                                    {/* To Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">To:</label>
                                        <input
                                            type="text"
                                            value={composeMessage.to}
                                            onChange={(e) =>
                                                setComposeMessage({ ...composeMessage, to: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            disabled={isReplyVisible}
                                        />
                                    </div>

                                    {/* Subject Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Subject:</label>
                                        <input
                                            type="text"
                                            value={composeMessage.subject}
                                            onChange={(e) =>
                                                setComposeMessage({ ...composeMessage, subject: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Message Body */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Message:</label>
                                        <textarea
                                            value={composeMessage.content}
                                            onChange={(e) =>
                                                setComposeMessage({ ...composeMessage, content: e.target.value })
                                            }
                                            rows={6}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Attachments */}
                                    {composeMessage.attachments?.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium mb-2">Attachments: <Icon
                                                className="px-2"
                                                colorVariant="dark"
                                                height="16px"
                                                isCursorPointer
                                                name="attachment"
                                                stroke
                                                width="16px"
                                            /></p>
                                            <div className="flex flex-wrap gap-2">
                                                {composeMessage.attachments.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-gray-100 text-sm px-2 py-1 rounded flex items-center gap-2"
                                                    >
                                                        <span>{file.name}</span>
                                                        <button
                                                            onClick={() => {
                                                                setComposeMessage((prev) => ({
                                                                    ...prev,
                                                                    attachments: prev.attachments?.filter((_, i) => i !== index),
                                                                }));
                                                            }}
                                                            className="text-black-600 hover:text-red-800 text-sm bg-gray-100 font-bold border-none"
                                                            title="Remove"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-center space-x-">
                                        <Button
                                            colorVariant="default"
                                            onClick={() => {
                                                setIsComposeVisible(false);
                                                setIsReplyVisible(false);
                                                setIsForwardVisible(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
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

                        {/* Show message thread view only if composing is NOT visible and message is selected */}
                        {!isComposeVisible && !isReplyVisible && !isForwardVisible && selectedMessage ? (
                            <>
                                {/* Message Meta */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        From: {selectedMessage.sender} | {selectedMessage.date}
                                    </p>
                                </div>

                                {/* Message Thread */}
                                <div className="space-y-6">
                                    {selectedMessage.content.map((line, i) => (
                                        <div key={i} className="bg-gray-50 p-4 rounded border">
                                            <div className="text-sm text-gray-700 mb-2">
                                                <span className="font-medium">{selectedMessage.sender}</span> wrote:
                                            </div>
                                            <p className="text-sm text-gray-800">{line}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Attachments */}
                                {selectedMessage.attachments?.length ? (
                                    <div className="mt-6">
                                        <p className="text-sm font-medium mb-2">Attachments:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMessage.attachments.map((file, i) => (
                                                <a
                                                    key={i}
                                                    href="#"
                                                    className="bg-gray-200 text-xs px-3 py-1 rounded hover:underline"
                                                >
                                                    {file}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}

                                {/* Reply/Forward Buttons */}
                                <div className="flex gap-4 mt-6">
                                    <Button colorVariant="primary" onClick={handleReply}>Reply</Button>
                                    <Button colorVariant="default" onClick={handleForward}>Forward</Button>
                                </div>
                            </>
                        ) : null}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Messages;
