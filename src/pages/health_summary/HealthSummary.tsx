import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { CustomDateRangePicker } from '../../components/ui/CustomDateRangePicker';
import { HealthSummaryService } from '../../services/healthSummary/HealthSummaryService';
import { HealthSummaryListModel } from '../../model/health_summary/HealthSummaryModel';
import { Button, Icon, Input, Loader, TextArea } from '@ketan_nimase/ui';

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

  // Fetch health summary data
  const fetchHealthSummaryData = async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    try {
      const fromDate = startDate.toISOString().split('T')[0];
      const toDate = endDate.toISOString().split('T')[0];

      await healthSummaryService.getHealthSummaryList(currentPage, fromDate, toDate);
      // For demo purposes, creating sample data since service doesn't expose results
      const sampleData: HealthSummaryListModel[] = [
        {
          healthSummaryId: 1,
          healthTitle: 'Annual Eye Exam Results',
          examDate: '2024-01-15',
          sentFrom: 'Dr. Smith',
          sentDate: '2024-01-16',
          isSeen: false,
          toJson: function (): { [key: string]: any; } {
            throw new Error('Function not implemented.');
          }
        },
        {
          healthSummaryId: 2,
          healthTitle: 'Contact Lens Fitting',
          examDate: '2024-01-10',
          sentFrom: 'Dr. Johnson',
          sentDate: '2024-01-11',
          isSeen: true,
          toJson: function (): { [key: string]: any; } {
            throw new Error('Function not implemented.');
          }
        }
      ];
      setHealthSummaryData(sampleData);
    } catch (error) {
      console.error('Error fetching health summary data:', error);
      setHealthSummaryData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when dates change
  useEffect(() => {
    if (startDate && endDate) {
      fetchHealthSummaryData();
    }
  }, [startDate, endDate, currentPage]);

  const handleSummarySelect = (summary: HealthSummaryListModel) => {
    setSelectedSummary(summary);
    // Mark as seen
    setHealthSummaryData(prev =>
      prev.map(item =>
        item.healthSummaryId === summary.healthSummaryId && item instanceof Object && 'toJson' in item
          ? { ...item, isSeen: true, toJson: item.toJson }
          : item
      )
    );
  };

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
  const handleSend = () => {
    // Implement send logic here
    console.log('Sending health summary:', sendFormData);
    // Reset form and exit transmit mode
    handleBackFromTransmit();
  };

  // Print functionality
  const handlePrint = () => {
    if (selectedSummary) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const printContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Health Summary - ${selectedSummary.healthTitle}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
              .title { font-size: 24px; font-weight: bold; }
              .date { color: #666; margin-top: 5px; }
              .content { line-height: 1.6; }
              .section { margin-bottom: 20px; }
              .section-title { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="title">${selectedSummary.healthTitle || 'Health Summary'}</div>
              <div class="date">Exam Date: ${selectedSummary.examDate || 'N/A'}</div>
              <div class="date">From: ${selectedSummary.sentFrom || 'N/A'}</div>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Visual Acuity</div>
                <p>Right Eye: 20/20, Left Eye: 20/25</p>
              </div>
              <div class="section">
                <div class="section-title">Prescription</div>
                <p>OD: -1.25 -0.50 x 180<br>OS: -1.00 -0.25 x 175</p>
              </div>
              <div class="section">
                <div class="section-title">Recommendations</div>
                <p>Continue current prescription. Schedule follow-up in 12 months. Consider blue light filtering lenses for computer use.</p>
              </div>
              <div class="section">
                <div class="section-title">Notes</div>
                <p>Patient reports occasional eye strain. Recommended 20-20-20 rule and proper lighting when using digital devices.</p>
              </div>
            </div>
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

  // Download CCDA format
  const handleDownloadCCDA = () => {
    if (selectedSummary) {
      const ccdaContent = `<?xml version="1.0" encoding="UTF-8"?>
<ClinicalDocument xmlns="urn:hl7-org:v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <realmCode code="US"/>
  <typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040"/>
  <templateId root="2.16.840.1.113883.10.20.22.1.1" extension="2015-08-01"/>
  <templateId root="2.16.840.1.113883.10.20.22.1.2" extension="2015-08-01"/>
  <id extension="${selectedSummary.healthSummaryId}" root="2.16.840.1.113883.19.5"/>
  <code code="34133-9" displayName="Summarization of Episode Note" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC"/>
  <title>${selectedSummary.healthTitle || 'Health Summary'}</title>
  <effectiveTime value="${selectedSummary.examDate?.replace(/-/g, '') || new Date().toISOString().split('T')[0].replace(/-/g, '')}"/>
  <confidentialityCode code="N" displayName="normal" codeSystem="2.16.840.1.113883.5.25" codeSystemName="Confidentiality"/>
  <languageCode code="en-US"/>
  <component>
    <structuredBody>
      <component>
        <section>
          <templateId root="2.16.840.1.113883.10.20.22.2.17" extension="2015-08-01"/>
          <code code="29762-2" displayName="Social History" codeSystem="2.16.840.1.113883.6.1"/>
          <title>Social History</title>
          <text>
            <table>
              <thead>
                <tr>
                  <th>Exam Type</th>
                  <th>Date</th>
                  <th>Provider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${selectedSummary.healthTitle || 'N/A'}</td>
                  <td>${selectedSummary.examDate || 'N/A'}</td>
                  <td>${selectedSummary.sentFrom || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </text>
        </section>
      </component>
    </structuredBody>
  </component>
</ClinicalDocument>`;

      const blob = new Blob([ccdaContent], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `HealthSummary_CCDA_${selectedSummary.healthSummaryId || 'unknown'}_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.xml`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Download PDF format - Auto download without print dialog
  const handleDownloadPDF = () => {
    if (selectedSummary) {
      // Create HTML content for PDF
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px;">
          <div style="border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 25px;">
            <h1 style="margin: 0; font-size: 28px; color: #333;">${selectedSummary.healthTitle || 'Health Summary'}</h1>
            <p style="margin: 8px 0; color: #666; font-size: 14px;">Exam Date: ${selectedSummary.examDate || 'N/A'}</p>
            <p style="margin: 8px 0; color: #666; font-size: 14px;">From: ${selectedSummary.sentFrom || 'N/A'}</p>
            <p style="margin: 8px 0; color: #666; font-size: 14px;">Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
              <h3 style="font-size: 18px; margin-bottom: 12px; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Visual Acuity</h3>
              <p style="margin: 0; line-height: 1.6;">Right Eye: 20/20, Left Eye: 20/25</p>
            </div>
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
              <h3 style="font-size: 18px; margin-bottom: 12px; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Prescription</h3>
              <p style="margin: 0; line-height: 1.6;">OD: -1.25 -0.50 x 180<br>OS: -1.00 -0.25 x 175</p>
            </div>
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
              <h3 style="font-size: 18px; margin-bottom: 12px; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Recommendations</h3>
              <p style="margin: 0; line-height: 1.6;">Continue current prescription. Schedule follow-up in 12 months. Consider blue light filtering lenses for computer use.</p>
            </div>
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
              <h3 style="font-size: 18px; margin-bottom: 12px; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Notes</h3>
              <p style="margin: 0; line-height: 1.6;">Patient reports occasional eye strain. Recommended 20-20-20 rule and proper lighting when using digital devices.</p>
            </div>
          </div>
        </div>
      `;

      // Create a temporary iframe for PDF generation
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '210mm';
      iframe.style.height = '297mm';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Health Summary PDF</title>
            <style>
              @page {
                size: A4;
                margin: 20mm;
              }
              body {
                margin: 0;
                font-family: Arial, sans-serif;
                font-size: 12px;
                line-height: 1.4;
              }
              .page-break {
                page-break-before: always;
              }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
          </html>
        `);
        iframeDoc.close();

        // Wait for content to load, then trigger download
        setTimeout(() => {
          try {
            iframe.contentWindow?.print();

            // Alternative method: Create downloadable HTML file that opens as PDF
            const blob = new Blob([`
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <title>Health Summary PDF</title>
                <style>
                  @media print {
                    @page { size: A4; margin: 20mm; }
                    body { margin: 0; }
                  }
                  body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; }
                </style>
                <script>
                  window.onload = function() {
                    setTimeout(() => window.print(), 500);
                  };
                </script>
              </head>
              <body>
                ${htmlContent}
              </body>
              </html>
            `], { type: 'text/html' });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `HealthSummary_${selectedSummary.healthSummaryId || 'unknown'}_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

          } catch (error) {
            console.error('PDF generation failed:', error);

            // Fallback: Download as HTML file
            const fallbackBlob = new Blob([htmlContent], { type: 'text/html' });
            const fallbackUrl = URL.createObjectURL(fallbackBlob);
            const fallbackLink = document.createElement('a');
            fallbackLink.href = fallbackUrl;
            fallbackLink.download = `HealthSummary_${selectedSummary.healthSummaryId || 'unknown'}_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.html`;
            document.body.appendChild(fallbackLink);
            fallbackLink.click();
            document.body.removeChild(fallbackLink);
            URL.revokeObjectURL(fallbackUrl);
          }

          // Clean up
          document.body.removeChild(iframe);
        }, 1000);
      }
    }
  };
  // Enhanced PDF download with jsPDF (requires: npm install jspdf html2canvas)
  const handleDownloadPDFWithLibrary = async () => {
    if (selectedSummary) {
      try {
        // Dynamic import to avoid bundling if not needed
        const jsPDF = (await import('jspdf')).default;

        const doc = new jsPDF();

        // Add title
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(selectedSummary.healthTitle || 'Health Summary', 20, 30);

        // Add metadata
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Exam Date: ${selectedSummary.examDate || 'N/A'}`, 20, 45);
        doc.text(`From: ${selectedSummary.sentFrom || 'N/A'}`, 20, 55);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 65);

        // Add line separator
        doc.line(20, 75, 190, 75);

        let yPosition = 90;

        // Add sections
        const sections = [
          { title: 'Visual Acuity', content: 'Right Eye: 20/20, Left Eye: 20/25' },
          { title: 'Prescription', content: 'OD: -1.25 -0.50 x 180\nOS: -1.00 -0.25 x 175' },
          { title: 'Recommendations', content: 'Continue current prescription. Schedule follow-up in 12 months. Consider blue light filtering lenses for computer use.' },
          { title: 'Notes', content: 'Patient reports occasional eye strain. Recommended 20-20-20 rule and proper lighting when using digital devices.' }
        ];

        sections.forEach(section => {
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text(section.title, 20, yPosition);

          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          const splitContent = doc.splitTextToSize(section.content, 170);
          doc.text(splitContent, 20, yPosition + 10);

          yPosition += 10 + (splitContent.length * 5) + 15;

          // Add new page if needed
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 30;
          }
        });

        // Save the PDF
        doc.save(`HealthSummary_${selectedSummary.healthSummaryId || 'unknown'}_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.pdf`);

      } catch (error) {
        console.error('PDF generation with jsPDF failed:', error);
        // Fallback to the previous method
        handleDownloadPDF();
      }
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
                    className={`p-1 cursor-pointer hover:bg-gray-100 bg-green-100 transition-colors duration-200 ${selectedSummary?.healthSummaryId === summary.healthSummaryId
                      ? 'bg-blue-100 border-r-2 border-blue-500'
                      : ''
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-700">
                        {summary.healthTitle ? summary.healthTitle : 'N/A'}
                      </p>
                      <p className="text-xs text-gray-700">
                        {summary.sentDate ? formatDate(summary.sentDate) : 'N/A'}
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
                          onClick={handleDownloadPDFWithLibrary}
                        />
                      </div>

                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose max-w-none">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Details</h3>

                      {/* Sample content - replace with actual health summary data */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-800">Visual Acuity</h4>
                          <p className="text-gray-600 mt-1">Right Eye: 20/20, Left Eye: 20/25</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">Prescription</h4>
                          <p className="text-gray-600 mt-1">
                            OD: -1.25 -0.50 x 180<br />
                            OS: -1.00 -0.25 x 175
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">Recommendations</h4>
                          <p className="text-gray-600 mt-1">
                            Continue current prescription. Schedule follow-up in 12 months.
                            Consider blue light filtering lenses for computer use.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">Notes</h4>
                          <p className="text-gray-600 mt-1">
                            Patient reports occasional eye strain. Recommended 20-20-20 rule
                            and proper lighting when using digital devices.
                          </p>
                        </div>
                      </div>
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