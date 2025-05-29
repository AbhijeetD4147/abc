export class DateFormatter {
  static formatEditUpdate(prevText: string, currText: string): { text: string; selectionIndex: number } {
    let selectionIndex: number;

    // Get the previous and current input strings
    const pText = prevText;
    let cText = currText;
    // Abbreviate lengths
    const cLen = cText.length;
    const pLen = pText.length;

    if (cLen === 1) {
      // Can only be 0, 1
      if (parseInt(cText) > 1) {
        // Remove char
        cText = '';
      }
    } else if (cLen === 2 && pLen === 1) {
      // months cannot be greater than 12
      const dd = parseInt(cText.substring(0, 2));
      if (dd === 0 || dd > 12) {
        // Remove char
        cText = cText.substring(0, 1);
      } else {
        // Add a / char
        cText += '/';
      }
    } else if (cLen === 4) {
      // Can only be 0 or 1
      if (parseInt(cText.substring(3, 4)) > 3) {
        // Remove char
        cText = cText.substring(0, 3);
      }
    } else if (cLen === 5 && pLen === 4) {
      // Days cannot be greater than 31
      const mm = parseInt(cText.substring(3, 5));
      if (mm === 0 || mm > 31) {
        // Remove char
        cText = cText.substring(0, 4);
      } else {
        // Add a / char
        cText += '/';
      }
    } else if ((cLen === 3 && pLen === 4) || (cLen === 6 && pLen === 7)) {
      // Remove / char
      cText = cText.substring(0, cText.length - 1);
    } else if (cLen === 3 && pLen === 2) {
      if (parseInt(cText.substring(2, 3)) > 1) {
        // Replace char
        cText = cText.substring(0, 2) + '/';
      } else {
        // Insert / char
        cText = cText.substring(0, pLen) + '/' + cText.substring(pLen, pLen + 1);
      }
    } else if (cLen === 6 && pLen === 5) {
      // Can only be 1 or 2 - if so insert a / char
      const y1 = parseInt(cText.substring(5, 6));
      if (y1 < 1 || y1 > 2) {
        // Replace char
        cText = cText.substring(0, 5) + '/';
      } else {
        // Insert / char
        cText = cText.substring(0, 5) + '/' + cText.substring(5, 6);
      }
    } else if (cLen === 7) {
      // Can only be 1 or 2
      const y1 = parseInt(cText.substring(6, 7));
      if (y1 < 1 || y1 > 2) {
        // Remove char
        cText = cText.substring(0, 6);
      }
    } else if (cLen === 8) {
      // Can only be 19 or 20
      const y2 = parseInt(cText.substring(6, 8));
      if (y2 < 19 || y2 > 20) {
        // Remove char
        cText = cText.substring(0, 7);
      }
    }

    selectionIndex = cText.length;
    return {
      text: cText,
      selectionIndex: selectionIndex
    };
  }

  // Helper method for React input onChange handler
  static handleDateInput(
    e: React.ChangeEvent<HTMLInputElement>,
    prevValue: string,
    setValue: (value: string) => void,
    setCursorPosition?: (position: number) => void
  ): void {
    const result = DateFormatter.formatEditUpdate(prevValue, e.target.value);
    setValue(result.text);
    
    if (setCursorPosition) {
      // Set cursor position after state update
      setTimeout(() => {
        if (e.target) {
          e.target.setSelectionRange(result.selectionIndex, result.selectionIndex);
        }
      }, 0);
    }
  }
}