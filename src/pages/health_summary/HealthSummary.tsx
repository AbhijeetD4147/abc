import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { CustomDateRangePicker } from '../../components/ui/CustomDateRangePicker';
import { HealthSummaryService } from '../../services/healthSummary/HealthSummaryService';
import { HealthSummaryListModel, HealthSummaryThreadModel } from '../../model/health_summary/HealthSummaryModel';
import { Button, Icon, Input, Loader, TextArea } from '@ketan_nimase/ui';
import { GlobalParams } from '../../utils/GlobalParameters';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface HealthSummaryProps {
};


export const HealthSummary: React.FC<HealthSummaryProps> = () => {
  const [healthSummaryData, setHealthSummaryData] = useState<HealthSummaryListModel[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<HealthSummaryListModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  // Add new state for send/transmit mode
  const [isTransmitMode, setIsTransmitMode] = useState(false);
  const [sendFormData, setSendFormData] = useState({
    to: '',
    email: '',
    subject: '',
    message: ''
  });

  const healthSummaryService = new HealthSummaryService();

  // Add a state for health summary details
  const [healthSummaryDetails, setHealthSummaryDetails] = useState<HealthSummaryThreadModel | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Fetch health summary data
  const fetchHealthSummaryData = async () => {
    if (!startDate || !endDate) return;
    setLoading(true);
    try {
      const fromDate = startDate.toISOString().split('T')[0];
      const toDate = endDate.toISOString().split('T')[0];


      // Use the actual API
      const response = await healthSummaryService.getHealthSummaryList(currentPage, fromDate, toDate);
      console.log('API Response:', response); // Add this for debugging

      if (response && response.length > 0) {
        setHealthSummaryData(response);
        // Automatically select the first item and fetch its details
        handleSummarySelect(response[0]);
      } else {
        setHealthSummaryData([]);
        setSelectedSummary(null);
        setHealthSummaryDetails(null);
      }
    } catch (error) {
      console.error('Error fetching health summary data:', error);
      setHealthSummaryData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch health summary details
  const fetchHealthSummaryDetails = async (summaryId: number) => {
    if (!summaryId) return;
    setDetailsLoading(true);
    try {
      const details = await healthSummaryService.getHealthSummaryThread(summaryId);
      setHealthSummaryDetails(details);
    } catch (error) {
      console.error('Error fetching health summary details:', error);
      setHealthSummaryDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleSummarySelect = (summary: HealthSummaryListModel) => {
    setSelectedSummary(summary);
    // Fetch details for the selected summary
    if (summary.healthSummaryId) {
      fetchHealthSummaryDetails(summary.healthSummaryId);
    }
    // Mark as seen
    setHealthSummaryData(prev =>
      prev.map(item =>
        item.healthSummaryId === summary.healthSummaryId && item instanceof Object && 'toJson' in item
          ? { ...item, isSeen: true, toJson: item.toJson }
          : item
      )
    );
  };

  // Fetch data when dates change
  useEffect(() => {
    if (startDate && endDate) {
      fetchHealthSummaryData();
    }
  }, [startDate, endDate, currentPage]);


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setCurrentPage(1);
  };

  // Handle transmit icon click
  const handleTransmitClick = () => {
    setIsTransmitMode(true);
  };

  // Handle back from transmit mode
  const handleBackFromTransmit = () => {
    setIsTransmitMode(false);
    setSendFormData({ to: '', email: '', subject: '', message: '' });
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setSendFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle send action
  const handleSend = async () => {
    if (!selectedSummary) return;

    // Basic validation
    if (!sendFormData.to || !sendFormData.subject) {
      console.error('Missing required fields');
      return;
    }

    try {
      // Create the transmit model based on the sample.txt implementation
      const transmitModel = {
        ptcustomerId: GlobalParams.USER_ID,
        isActive: true,
        toEmail: sendFormData.to,
        messageSubject: sendFormData.subject,
        messageText: sendFormData.message,
        messageDateTime: new Date().toISOString(),
        messageStatus: "Sent",
        isDirectMessage: false,
        kno2Id: "",
        isCustomer: true,
        isIncoming: false,
        isFavourite: true,
        isReplied: false,
        parentMessageId: 0,
        ptPracticePersonId: selectedSummary.practicePersonId,
        userId: GlobalParams.USER_ID,
        switchUserId: GlobalParams.SWITCH_USER_ID
      };

      await healthSummaryService.transmitHealthSummary(transmitModel);

      // Reset form and exit transmit mode
      handleBackFromTransmit();

      // Show success message
      console.log('Health summary transmitted successfully');
    } catch (error) {
      console.error('Error transmitting health summary:', error);
    }
  };

  // Clean Print functionality - only summaryData
  const handlePrint = () => {
    if (healthSummaryDetails?.summaryData) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const printContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Health Summary</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            ${healthSummaryDetails.summaryData}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
          </html>
        `;
        printWindow.document.write(printContent);
        printWindow.document.close();
      }
    }
  };

  // Clean Download CCDA - only summaryData
  const handleDownloadCCDA = () => {
    if (healthSummaryDetails?.summaryData) {
      // Since summaryData is HTML content, save it as HTML file
      const blob = new Blob([healthSummaryDetails.summaryData], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `HealthSummary_CCDA_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };


  // PDF Download using base64 content from API only

  const handleDownloadPDF = () => {
    // Check if health summary details exist
    if (!healthSummaryDetails?.healthSummaryAttachment) {
      alert('No attachments found for this health summary.');
      return;
    }

    // Find PDF attachment
    const pdfAttachment = healthSummaryDetails.healthSummaryAttachment.find(
      (attachment: any) => attachment.attachmentType?.toLowerCase() === 'pdf'
    );

    if (!pdfAttachment) {
      alert('No PDF attachment found for this health summary.');
      return;
    }

    // Check if base64 content exists
    if (!pdfAttachment.attachmentBase64FileContent) {
      alert('PDF content is not available for download.');
      return;
    }

    // Remove or modify the file size check - this is likely causing your issue
    // Option 1: Remove the check entirely
    // Option 2: Check if the base64 content has actual data
    if (!pdfAttachment.attachmentBase64FileContent.trim()) {
      alert('PDF content appears to be empty.');
      return;
    }

    // Option 3: More robust file size check
    // if (pdfAttachment.attachmentFileSize !== undefined && pdfAttachment.attachmentFileSize <= 0) {
    //   alert('PDF file appears to be empty (0 bytes).');
    //   return;
    // }

    try {
      // Convert base64 to blob
      const byteCharacters = atob(pdfAttachment.attachmentBase64FileContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfAttachment.attachmentFileName || 'health-summary.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('PDF download initiated successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-blue-800 shadow-sm border-r-2 border-gray-400 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-blue-400">
            <h2 className="text-xl font-semibold text-white">Health Summary</h2>
            <CustomDateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateRangeChange}
            />
          </div>

          {/* Health Summary List */}
          <div className="flex-1 overflow-y-auto bg-white">
            {loading ? (
              <div className="flex justify-center items-center h-screen w-screen">
                <Loader loaderType="spin" />
              </div>
            ) : healthSummaryData.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 p-2">
                <div className="border-2 rounded-full p-4 sm:p-5 lg:p-7 flex items-center justify-center">
                  <Icon
                    name="envelope"
                    width="50px"
                    height="50px"
                    colorVariant="secondary"
                    stroke
                  />
                </div>
                <p className="text-md mt-2 mb-24">No Data found</p>
              </div>
            ) : (
              <div className="p-0 h-screen">
                {healthSummaryData.map((summary) => (
                  <div
                    key={summary.healthSummaryId}
                    onClick={() => handleSummarySelect(summary)}
                    className={`p-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${selectedSummary?.healthSummaryId === summary.healthSummaryId
                      ? 'bg-blue-100 border-r-2 border-blue-500'
                      : summary.isSeen ? 'bg-white' : 'bg-green-100'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-700">
                        {summary.healthTitle ? summary.healthTitle : 'N/A'}
                      </p>
                      <p className="text-xs text-gray-700">
                        {summary.examDate ? new Date(summary.examDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="fixed bottom-4 left-4 text-xs text-gray-400">
            Version 1.0
          </span>

        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col">
          {selectedSummary ? (
            <div className="flex-1 p-6">
              {!isTransmitMode ? (
                // Normal view mode
                <>
                  {/* Header */}
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="mt-2 flex items-center space-x-4 text-md text-gray-700 justify-between">
                      <span>{selectedSummary.healthTitle ? selectedSummary.healthTitle : 'N/A'}</span>
                      <div>
                        <Icon
                          className="px-4"
                          colorVariant="primary"
                          height="20px"
                          isCursorPointer
                          name="right_arrow_1"
                          stroke
                          width="20px"
                          tooltip
                          tooltipTitle="Transmit/Send to another provider"
                          tooltipPlacement="bottom"
                          onClick={handleTransmitClick}
                        />
                        <Icon
                          className="px-4"
                          colorVariant="primary"
                          height="20px"
                          isCursorPointer
                          name="save"
                          stroke
                          width="20px"
                          tooltip
                          tooltipTitle="Print"
                          tooltipPlacement="bottom"
                          onClick={handlePrint}
                        />
                        <Icon
                          className="px-4"
                          colorVariant="primary"
                          height="20px"
                          isCursorPointer
                          name="download_data"
                          stroke
                          width="20px"
                          tooltip
                          tooltipTitle="Download CCDA File"
                          tooltipPlacement="bottom"
                          onClick={handleDownloadCCDA}
                        />
                        <Icon
                          className="px-4"
                          colorVariant="primary"
                          height="20px"
                          isCursorPointer
                          name="download_receipt"
                          stroke
                          width="20px"
                          tooltip
                          tooltipTitle="Download PDF"
                          tooltipPlacement="bottom"
                          onClick={handleDownloadPDF}
                        />
                      </div>

                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose max-w-none">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Details</h3>

                      {loading || detailsLoading ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader loaderType="spin" />
                        </div>
                      ) : selectedSummary ? (
                        <div className="space-y-4">
                          {/* Summary Data Display - Flutter InAppWebView equivalent */}
                          {healthSummaryDetails && healthSummaryDetails.summaryData && (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                              <div className="relative">
                                <iframe
                                  srcDoc={healthSummaryDetails.summaryData}
                                  className="w-full border-0"
                                  style={{
                                    minHeight: '800px',
                                    height: '800px',
                                    backgroundColor: 'white'
                                  }}
                                  sandbox="allow-same-origin allow-scripts allow-popups"
                                  title="Health Summary Content"
                                  onLoad={() => console.log('Iframe loaded successfully')}
                                  onError={() => console.error('Iframe failed to load')}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          {healthSummaryDetails ? (
                            <p>No summary data available for this health summary.</p>
                          ) : (
                            <p>Loading summary data...</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                // Transmit/Send mode
                <div className="flex-1">
                  {/* Send Summary Header */}
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center justify-start">
                      <Icon
                        className="pr-2"
                        colorVariant="primary"
                        height="20px"
                        isCursorPointer
                        name="left_arrow"
                        stroke
                        width="20px"
                        onClick={handleBackFromTransmit}
                      />
                      <h2 className="text-xl font-semibold text-gray-900">Send Summary</h2>
                      <Icon
                        colorVariant="primary"
                        height="24px"
                        width="24px"
                        className='px-4'
                        isCursorPointer
                        isbadge
                        name="info_circle"
                        stroke
                        tooltip
                        tooltipTitle="Send a secure message any provider using Direct Email. Type a simple text message. No special character are allowed.
                            Note: You will not be able to make changes to this message or attachments after sending it."
                        tooltipPlacement="bottom"
                      />
                    </div>
                  </div>

                  {/* Send Form */}
                  <div className="space-y-6">
                    {/* To Field */}
                    <div>
                      <Input
                        inputType="text"
                        label
                        value={sendFormData.to}
                        onChange={(e) => handleInputChange('to', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter recipient name" name={'To'} />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <Input
                        inputType="text"
                        label
                        name={'Subject'}
                        value={sendFormData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                        placeholder="Enter subject"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <TextArea
                        label="Message for Doctor"
                        placeholder="Enter your message"
                        rows={5}
                        showTitle
                      />
                    </div>

                    {/* Attachments Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm bg-white border-gray-700 text-gray-700">SummaryOfCare_06292025.xml</span>
                        </div>
                      </div>
                    </div>

                    {/* Send Button */}
                    <div className="flex justify-center pt-4">
                      <Button
                        colorVariant="primary"
                        onClick={handleSend}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* No Selection State */
            <div className="flex-1 flex items-center justify-center text-gray-500">

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthSummary;
