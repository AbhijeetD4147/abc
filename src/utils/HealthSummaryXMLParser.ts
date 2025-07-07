export interface ParsedHealthSummary {
  patientInfo: {
    name: string;
    patientId: string;
    dob: string;
    sex: string;
    email: string;
    ethnicity: string;
    race: string;
    preferredLanguage: string;
    phones: {
      home: string;
      cell: string;
      day: string;
      fax: string;
    };
  };
  documentInfo: {
    title: string;
    createdOn: string;
    generatedOn: string;
  };
  tableOfContents: Array<{
    id: string;
    displayName: string;
    templateId: string;
  }>;
  sections: {
    encounters?: any[];
    medications?: any[];
    allergies?: any[];
    problems?: any[];
    smokingStatus?: any;
    insuranceProviders?: any[];
    familyHistory?: any[];
    immunizations?: any[];
    vitalSigns?: any[];
  };
}

export class HealthSummaryXMLParser {
  /**
   * Parse XML/HTML health summary content
   * @param xmlContent - The XML/HTML string from summaryData
   * @returns Parsed health summary object
   */
  static parseHealthSummaryXML(xmlContent: string): ParsedHealthSummary | null {
    try {
      // Create a DOM parser to parse the HTML/XML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlContent, 'text/html');
      
      // Extract patient information
      const patientInfo = this.extractPatientInfo(doc);
      const documentInfo = this.extractDocumentInfo(doc);
      const tableOfContents = this.extractTableOfContents(doc);
      const sections = this.extractSections(doc);
      
      return {
        patientInfo,
        documentInfo,
        tableOfContents,
        sections
      };
    } catch (error) {
      console.error('Error parsing health summary XML:', error);
      return null;
    }
  }
  
  private static extractPatientInfo(doc: Document): ParsedHealthSummary['patientInfo'] {
    const tables = doc.querySelectorAll('table');
    let patientInfo: ParsedHealthSummary['patientInfo'] = {
      name: '',
      patientId: '',
      dob: '',
      sex: '',
      email: '',
      ethnicity: '',
      race: '',
      preferredLanguage: '',
      phones: {
        home: '',
        cell: '',
        day: '',
        fax: ''
      }
    };
    
    // Extract from title
    const title = doc.querySelector('title')?.textContent || '';
    const titleMatch = title.match(/^(.+?)\s*\|\s*Pt Id:\s*(\d+)/);
    if (titleMatch) {
      patientInfo.name = titleMatch[1].trim();
      patientInfo.patientId = titleMatch[2];
    }
    
    // Extract from table rows
    tables.forEach(table => {
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const label = cells[0]?.textContent?.trim().toLowerCase() || '';
          const value = cells[1]?.textContent?.trim() || '';
          
          switch (label) {
            case 'patient id:':
              patientInfo.patientId = value;
              break;
            case 'sex:':
              patientInfo.sex = value;
              break;
            case 'ethnicity:':
              patientInfo.ethnicity = value;
              break;
            case 'race:':
              patientInfo.race = value;
              break;
            case 'preferred language:':
              patientInfo.preferredLanguage = value;
              break;
            case 'home phone:':
              patientInfo.phones.home = value;
              break;
            case 'cell phone:':
              patientInfo.phones.cell = value;
              break;
            case 'day phone:':
              patientInfo.phones.day = value;
              break;
            case 'fax:':
              patientInfo.phones.fax = value;
              break;
            case 'email:':
              patientInfo.email = value;
              break;
          }
          
          // Handle DOB which might be in a different cell position
          if (cells.length >= 4) {
            const label2 = cells[2]?.textContent?.trim().toLowerCase() || '';
            const value2 = cells[3]?.textContent?.trim() || '';
            if (label2 === 'dob:') {
              patientInfo.dob = value2;
            }
          }
        }
      });
    });
    
    return patientInfo;
  }
  
  private static extractDocumentInfo(doc: Document): ParsedHealthSummary['documentInfo'] {
    const title = doc.querySelector('title')?.textContent || '';
    const h2 = doc.querySelector('h2')?.textContent || '';
    
    // Extract generated date from title
    const generatedMatch = title.match(/Generated On:\s*([\d\/]+)/);
    const generatedOn = generatedMatch ? generatedMatch[1] : '';
    
    // Extract created date from paragraph
    const createdElement = doc.querySelector('p b');
    const createdOn = createdElement?.nextSibling?.textContent?.trim() || '';
    
    return {
      title: h2,
      createdOn,
      generatedOn
    };
  }
  
  private static extractTableOfContents(doc: Document): ParsedHealthSummary['tableOfContents'] {
    const tocList = doc.querySelector('#tablecontent');
    const items: ParsedHealthSummary['tableOfContents'] = [];
    
    if (tocList) {
      const listItems = tocList.querySelectorAll('li');
      listItems.forEach(item => {
        const templateId = item.getAttribute('templateId') || '';
        const displayName = item.getAttribute('displayname') || '';
        const id = item.getAttribute('id') || '';
        const link = item.querySelector('a');
        
        items.push({
          id,
          displayName,
          templateId
        });
      });
    }
    
    return items;
  }
  
  private static extractSections(doc: Document): ParsedHealthSummary['sections'] {
    // This is a basic implementation - you can expand this based on the actual XML structure
    // The sections would typically be found after the table of contents
    return {
      encounters: [],
      medications: [],
      allergies: [],
      problems: [],
      smokingStatus: null,
      insuranceProviders: [],
      familyHistory: [],
      immunizations: [],
      vitalSigns: []
    };
  }
  
  /**
   * Extract plain text content from HTML, removing all tags
   * @param htmlContent - HTML string
   * @returns Plain text content
   */
  static extractPlainText(htmlContent: string): string {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      return doc.body?.textContent || doc.textContent || '';
    } catch (error) {
      console.error('Error extracting plain text:', error);
      return htmlContent;
    }
  }
  
  /**
   * Format the parsed health summary for display
   * @param parsedSummary - Parsed health summary object
   * @returns Formatted string for display
   */
  static formatForDisplay(parsedSummary: ParsedHealthSummary): string {
    const { patientInfo, documentInfo } = parsedSummary;
    
    return `
**${documentInfo.title}**

**Patient Information:**
- Name: ${patientInfo.name}
- Patient ID: ${patientInfo.patientId}
- Date of Birth: ${patientInfo.dob}
- Sex: ${patientInfo.sex}
- Email: ${patientInfo.email}

**Contact Information:**
- Home Phone: ${patientInfo.phones.home}
- Cell Phone: ${patientInfo.phones.cell}
- Day Phone: ${patientInfo.phones.day}
- Email: ${patientInfo.email}

**Document Information:**
- Created On: ${documentInfo.createdOn}
- Generated On: ${documentInfo.generatedOn}
    `.trim();
  }
}