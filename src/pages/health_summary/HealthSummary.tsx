import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { CustomDateRangePicker } from '../../components/ui/CustomDateRangePicker';
import { HealthSummaryService } from '../../services/healthSummary/HealthSummaryService';
import { HealthSummaryListModel } from '../../model/health_summary/HealthSummaryModel';
import { Icon, Loader } from '@ketan_nimase/ui';

interface HealthSummaryProps {
  patientName: {
    firstName: string;
    lastName: string;
  };
};


export const HealthSummary: React.FC<HealthSummaryProps> = ({ patientName }) => {
  const [healthSummaryData, setHealthSummaryData] = useState<HealthSummaryListModel[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<HealthSummaryListModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <Navbar patientName={{ firstName: "Jeffery", lastName: "Stevenson" }} />

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
              <div className="flex flex-col items-center justify-center min-h-screen  text-gray-500 p-2">
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
              <div className="divide-y divide-gray-200">
                {healthSummaryData.map((summary) => (
                  <div
                    key={summary.healthSummaryId}
                    onClick={() => handleSummarySelect(summary)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${selectedSummary?.healthSummaryId === summary.healthSummaryId
                      ? 'bg-blue-50 border-r-2 border-blue-500'
                      : ''
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <h4 className={`text-sm font-medium truncate ${!summary.isSeen ? 'text-gray-900 font-semibold' : 'text-gray-700'
                            }`}>
                            {summary.healthTitle || 'Health Summary'}
                          </h4>
                          {!summary.isSeen && (
                            <div className="w-2 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {summary.sentDate ? formatDate(summary.sentDate) : 'No date'}
                        </p>
                      </div>
                      <Icon
                        name="chevron_right"
                        width="16px"
                        height="16px"
                        colorVariant="secondary"
                        stroke
                      />
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
              {/* Header */}
              <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="mt-2 flex items-center space-x-4 text-md text-gray-700 justify-between">
                  <span>Visit Date: {selectedSummary.examDate ? formatDate(selectedSummary.examDate) : 'N/A'}</span>
                  <div>
                    <Icon
                      className="px-2"
                      colorVariant="primary"
                      height="20px"
                      isCursorPointer
                      name="right_arrow_1"
                      stroke
                      width="20px"
                    />
                    <Icon
                      className="px-2"
                      colorVariant="primary"
                      height="20px"
                      isCursorPointer
                      name="save"
                      stroke
                      width="20px"
                    />
                    <Icon
                      className="px-2"
                      colorVariant="primary"
                      height="20px"
                      isCursorPointer
                      name="download"
                      stroke
                      width="20px"
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