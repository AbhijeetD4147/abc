import { themeService } from "../services/common/ThemeService";
 
export interface ThemeColors {
  // Text Color
  primaryTextColor: string;
  secondaryTextColor: string;
  tertiaryTextColor: string;
  quaternaryTextColor: string;
  quinaryTextColor: string;
  senaryTextColor: string;
  septenaryTextColor: string;
  octonaryTextColor: string;
  nonaryTextColor: string;
  denaryTextColor: string;

  listTileHoverColor: string;
  listTileDefaultColor: string;
  listTileSelectedColor: string;

  errorTextWidgets: string;
  greyBorderColor: string;
  proceedBTN: string;
  BGColor: string;
  pendingAlertIcon: string;
  SuccessScreenColor: string;
  FailureScreenColor: string;
  AlertIcon: string;
  PrimaryAction: string;
  ValueSelection1: string;
  ValueSelection2: string;
  ButtonHover: string;
  ButtonPressed: string;
  ButtonDisable: string;
  whiteButtonPressedHover: string;
  whiteButtonHover: string;
  BorderColor: string;
  otpGreenIconColor: string;
  otpRedIconColor: string;
  messageSentColor: string;

  // Primary Button
  primaryDefaultBackgroundButtonColor: string;
  primaryHoverBackgroundButtonColor: string;
  primaryPressedBackgroundButtonColor: string;
  primaryDisabledBackgroundButtonColor: string;
  primaryDisabledLabelTextColor: string;
  primaryDefaultLabelTextColor: string;

  // Ghost Button1
  ghost1DefaultBackgroundButtonColor: string;
  ghost1HoverBackgroundButtonColor: string;
  ghost1PressedBackgroundButtonColor: string;
  ghost1DisabledBackgroundButtonColor: string;
  ghost1DefaultBorderButtonColor: string;
  ghost1DisabledBorderButtonColor: string;
  ghost1DisabledLabelTextColor: string;
  ghost1DefaultLabelTextColor: string;

  // Ghost Button2
  ghost2DefaultBackgroundButtonColor: string;
  ghost2HoverBackgroundButtonColor: string;
  ghost2PressedBackgroundButtonColor: string;
  ghost2BorderButtonColor: string;
  ghost2LabelTextColor: string;

  // Secondary Button
  secondaryDefaultBackgroundButtonColor: string;
  secondaryHoverBackgroundButtonColor: string;
  secondaryPressedBackgroundButtonColor: string;
  secondaryDisabledBackgroundButtonColor: string;
  secondaryDefaultBorderButtonColor: string;
  secondaryPressedBorderButtonColor: string;
  secondaryDefaultLabelTextColor: string;
  secondaryDisabledLabelTextColor: string;

  // CTA HyperLink Button
  defaultCTAButtonTextColor: string;
  hoverCTAButtonTextColor: string;
  disabledCTAButtonTextColor: string;

  outlineTooltipColor: string;
  tableHeaderColor: string;
  tableBorderColor: string;
  tableBackgroundColor: string;

  mobileAppBarColor: string;
  authUserButtonHover: string;
  authUserButtonClicked: string;
  authUserDividerColor: string;

  // Message Screen
  messagePanelDividerColor: string;
  messageAttachmentDividerColor: string;
  latestMessageBackgroundColor: string;
  messageThreadBorderColor: string;
  messageSubjectDividerBorderColor: string;
  attachmentBorderColor: string;
  attachmentBackgroundColor: string;
  attachmentBackgroundHoverColor: string;
  searchMessageTextHighlightColor: string;

  // Pagination
  pageIconDefaultColor: string;
  pageIconHoverColor: string;
  pageNumberBackgroundColor: string;

  // IconButton
  iconDefaultPrimaryColor: string;
  iconDefaultSecondaryColor: string;
  iconDefaultTertiaryColor: string;
  iconDefaultQuaternaryColor: string;
  iconDefaultQuinaryColor: string;

  iconPressedPrimaryColor: string;
  iconPressedSecondaryColor: string;
  iconPressedTertiaryColor: string;
  iconPressedQuaternaryColor: string;

  iconHoverPrimaryColor: string;
  iconHoverSecondaryColor: string;
  iconHoverTertiaryColor: string;
  iconHoverQuaternaryColor: string;

  // TextField
  textfieldErrorBorderColor: string;
  textfieldDefaultBorderColor: string;
  textfieldFocusedBorderColor: string;
  textfieldErrorTextColor: string;
  textfieldErrorFilledColor: string;
  textfieldFilledColor: string;
  textfieldHintTextColor: string;
  textfieldLabelColor: string;
  textfieldNonEditingFilledColor: string;
  textfieldInlineColor: string;

  // NavBar
  menuYellowStripColor: string;
  menuTabHoverColor: string;

  // Appointment
  backgroundColor: string;
  cancelBackgroundColor: string;
  appointmentConfirmStatusColor: string;
  appointmentPendingConfirmationColor: string;
  selectedChoiceChipBackgroundColor: string;
  selectedChoiceChipBorderColor: string;
  appointmentConfirmedBackgroundColor: string;

  // Common
  blackLinkHoverColor: string;
  whiteLinkHoverColor: string;
  blueLinkHoverColor: string;
  dividerPrimaryColor: string;
  dividerSecondaryColor: string;
  dividerTertiaryColor: string;
  textLabelSecondaryColor: string;
  successPopupColor: string;
  infoPopupColor: string;
  crticalPopupColor: string;
  warningPopupColor: string;

  menuHoverColor: string;
  passwordCriteriaMet: string;
}

// Default theme placeholder
export const defaultThemeColors: ThemeColors = {
  primaryTextColor: "transparent",
  secondaryTextColor: "transparent",
  tertiaryTextColor: "transparent",
  quaternaryTextColor: "transparent",
  quinaryTextColor: "transparent",
  senaryTextColor: "transparent",
  septenaryTextColor: "transparent",
  octonaryTextColor: "transparent",
  nonaryTextColor: "transparent",
  denaryTextColor: "transparent",

  listTileHoverColor: "transparent",
  listTileDefaultColor: "transparent",
  listTileSelectedColor: "transparent",

  errorTextWidgets: "transparent",
  greyBorderColor: "transparent",
  proceedBTN: "transparent",
  BGColor: "transparent",
  pendingAlertIcon: "transparent",
  SuccessScreenColor: "transparent",
  FailureScreenColor: "transparent",
  AlertIcon: "transparent",
  PrimaryAction: "transparent",
  ValueSelection1: "transparent",
  ValueSelection2: "transparent",
  ButtonHover: "transparent",
  ButtonPressed: "transparent",
  ButtonDisable: "transparent",
  whiteButtonPressedHover: "transparent",
  whiteButtonHover: "transparent",
  BorderColor: "transparent",
  otpGreenIconColor: "transparent",
  otpRedIconColor: "transparent",
  messageSentColor: "transparent",

  primaryDefaultBackgroundButtonColor: "transparent",
  primaryHoverBackgroundButtonColor: "transparent",
  primaryPressedBackgroundButtonColor: "transparent",
  primaryDisabledBackgroundButtonColor: "transparent",
  primaryDisabledLabelTextColor: "transparent",
  primaryDefaultLabelTextColor: "transparent",

  ghost1DefaultBackgroundButtonColor: "transparent",
  ghost1HoverBackgroundButtonColor: "transparent",
  ghost1PressedBackgroundButtonColor: "transparent",
  ghost1DisabledBackgroundButtonColor: "transparent",
  ghost1DefaultBorderButtonColor: "transparent",
  ghost1DisabledBorderButtonColor: "transparent",
  ghost1DisabledLabelTextColor: "transparent",
  ghost1DefaultLabelTextColor: "transparent",

  ghost2DefaultBackgroundButtonColor: "transparent",
  ghost2HoverBackgroundButtonColor: "transparent",
  ghost2PressedBackgroundButtonColor: "transparent",
  ghost2BorderButtonColor: "transparent",
  ghost2LabelTextColor: "transparent",

  secondaryDefaultBackgroundButtonColor: "transparent",
  secondaryHoverBackgroundButtonColor: "transparent",
  secondaryPressedBackgroundButtonColor: "transparent",
  secondaryDisabledBackgroundButtonColor: "transparent",
  secondaryDefaultBorderButtonColor: "transparent",
  secondaryPressedBorderButtonColor: "transparent",
  secondaryDefaultLabelTextColor: "transparent",
  secondaryDisabledLabelTextColor: "transparent",

  defaultCTAButtonTextColor: "transparent",
  hoverCTAButtonTextColor: "transparent",
  disabledCTAButtonTextColor: "transparent",

  outlineTooltipColor: "transparent",
  tableHeaderColor: "transparent",
  tableBorderColor: "transparent",
  tableBackgroundColor: "transparent",

  mobileAppBarColor: "transparent",
  authUserButtonHover: "transparent",
  authUserButtonClicked: "transparent",
  authUserDividerColor: "transparent",

  messagePanelDividerColor: "transparent",
  messageAttachmentDividerColor: "transparent",
  latestMessageBackgroundColor: "transparent",
  messageThreadBorderColor: "transparent",
  messageSubjectDividerBorderColor: "transparent",
  attachmentBorderColor: "transparent",
  attachmentBackgroundColor: "transparent",
  attachmentBackgroundHoverColor: "transparent",
  searchMessageTextHighlightColor: "transparent",

  pageIconDefaultColor: "transparent",
  pageIconHoverColor: "transparent",
  pageNumberBackgroundColor: "transparent",

  iconDefaultPrimaryColor: "transparent",
  iconDefaultSecondaryColor: "transparent",
  iconDefaultTertiaryColor: "transparent",
  iconDefaultQuaternaryColor: "transparent",
  iconDefaultQuinaryColor: "transparent",

  iconPressedPrimaryColor: "transparent",
  iconPressedSecondaryColor: "transparent",
  iconPressedTertiaryColor: "transparent",
  iconPressedQuaternaryColor: "transparent",

  iconHoverPrimaryColor: "transparent",
  iconHoverSecondaryColor: "transparent",
  iconHoverTertiaryColor: "transparent",
  iconHoverQuaternaryColor: "transparent",

  textfieldErrorBorderColor: "transparent",
  textfieldDefaultBorderColor: "transparent",
  textfieldFocusedBorderColor: "transparent",
  textfieldErrorTextColor: "transparent",
  textfieldErrorFilledColor: "transparent",
  textfieldFilledColor: "transparent",
  textfieldHintTextColor: "transparent",
  textfieldLabelColor: "transparent",
  textfieldNonEditingFilledColor: "transparent",
  textfieldInlineColor: "transparent",

  menuYellowStripColor: "transparent",
  menuTabHoverColor: "transparent",

  backgroundColor: "transparent",
  cancelBackgroundColor: "transparent",
  appointmentConfirmStatusColor: "transparent",
  appointmentPendingConfirmationColor: "transparent",
  selectedChoiceChipBackgroundColor: "transparent",
  selectedChoiceChipBorderColor: "transparent",
  appointmentConfirmedBackgroundColor: "transparent",

  blackLinkHoverColor: "transparent",
  whiteLinkHoverColor: "transparent",
  blueLinkHoverColor: "transparent",
  dividerPrimaryColor: "transparent",
  dividerSecondaryColor: "transparent",
  dividerTertiaryColor: "transparent",
  textLabelSecondaryColor: "transparent",
  successPopupColor: "transparent",
  infoPopupColor: "transparent",
  crticalPopupColor: "transparent",
  warningPopupColor: "transparent",

  menuHoverColor: "transparent",
  passwordCriteriaMet: "transparent",
}; 

export async function getTheme(){
    const result = await themeService.getAppTheme();
    const test = "OceanBlue";
  
    // if (result?.theme === "OceanBlue") {
    if(test === "OceanBlue"){
      return {
        // Text Color
        primaryTextColor: "#000000",
        secondaryTextColor: "#FFFFFF",
        tertiaryTextColor: "#C15151",
        quaternaryTextColor: "#5C5C5C",
        quinaryTextColor: "#518EC1",
        senaryTextColor: "#437A00",
        septenaryTextColor: "#D76910",
        octonaryTextColor: "#1785E1",
        nonaryTextColor: "#B0B0B0",
        denaryTextColor: "#B7FFAF",
  
        // List Tile
        listTileHoverColor: "#E8F8F8",
        listTileDefaultColor: "#F1F1F1",
        listTileSelectedColor: "#D5FEFF",
  
        // Defaults / Not Provided Yet
        errorTextWidgets: "#D00202",
        greyBorderColor: "#5C5C5C",
        proceedBTN: "#1786E1",
        BGColor: "#1785E1",
        pendingAlertIcon: "#ff9600",
        SuccessScreenColor: "#1DBCBC",
        FailureScreenColor: "#FF7272",
        AlertIcon: "#FF8A00",
        PrimaryAction: "#FDCD29",
        ValueSelection1: "#A5FFFF",
        ValueSelection2: "#00D4D5",
        ButtonHover: "#70BFFF",
        ButtonPressed: "#005AA6",
        ButtonDisable: "#C8C8C8",
        whiteButtonPressedHover: "#B0B0B0",
        whiteButtonHover: "#E2E2E2",
        BorderColor: "#FFFFFF",
        otpGreenIconColor: "#00B02E",
        otpRedIconColor: "#D61818",
        messageSentColor: "#04AFAF",
  
        // Primary Button
        primaryDefaultBackgroundButtonColor: "#1785E1",
        primaryHoverBackgroundButtonColor: "#70BEFF",
        primaryPressedBackgroundButtonColor: "#005AA6",
        primaryDisabledBackgroundButtonColor: "#C8C8C8",
        primaryDisabledLabelTextColor: "#929292",
        primaryDefaultLabelTextColor: "#FFFFFF",
  
        // Ghost Button1
        ghost1DefaultBackgroundButtonColor: "#1785E1",
        ghost1HoverBackgroundButtonColor: "#70BEFF",
        ghost1PressedBackgroundButtonColor: "#005AA6",
        ghost1DisabledBackgroundButtonColor: "#1785E1",
        ghost1DefaultBorderButtonColor: "#FFFFFF",
        ghost1DisabledBorderButtonColor: "#C2E3FF",
        ghost1DisabledLabelTextColor: "#55B2FF",
        ghost1DefaultLabelTextColor: "#FFFFFF",
  
        // Ghost Button2
        ghost2DefaultBackgroundButtonColor: "#FFFFFF",
        ghost2HoverBackgroundButtonColor: "#EEF6FF",
        ghost2PressedBackgroundButtonColor: "#CAE3F8",
        ghost2BorderButtonColor: "#1785E1",
        ghost2LabelTextColor: "#1785E1",
  
        // Secondary Button
        secondaryDefaultBackgroundButtonColor: "#FFFFFF",
        secondaryHoverBackgroundButtonColor: "#E2E2E2",
        secondaryPressedBackgroundButtonColor: "#B0B0B0",
        secondaryDisabledBackgroundButtonColor: "#FFFFFF",
        secondaryDefaultBorderButtonColor: "#5C5C5C",
        secondaryPressedBorderButtonColor: "#8F8F8F",
        secondaryDefaultLabelTextColor: "",
        secondaryDisabledLabelTextColor: "",
  
        // CTA HyperLink Button
        defaultCTAButtonTextColor: "#000000",
        hoverCTAButtonTextColor: "#1785e1",
        disabledCTAButtonTextColor: "#c8c8c8",
  
        outlineTooltipColor: "#CACACA",
        tableHeaderColor: "B0B0B0",
        tableBorderColor: "#B6B6B6",
        tableBackgroundColor: "#F1F1F1",
  
        mobileAppBarColor: "#1785E1",
        authUserButtonHover: "#EEF6FF",
        authUserButtonClicked: "#CAE3F8",
        authUserDividerColor: "#D2D2D2",
  
        // Message Screen
        messagePanelDividerColor: "#8F8F8F",
        messageAttachmentDividerColor: "#BABABA",
        latestMessageBackgroundColor: "#F1F1F1",
        messageThreadBorderColor: "#B6B6B6",
        messageSubjectDividerBorderColor: "#8F8F8F",
        attachmentBorderColor: "#BABABA",
        attachmentBackgroundColor: "#FFFFFF",
        attachmentBackgroundHoverColor: "#F0F0F0",
        searchMessageTextHighlightColor: "#FF87F5",
  
        // Pagination
        pageIconDefaultColor: "#44AAFF",
        pageIconHoverColor: "#0B6AB8",
        pageNumberBackgroundColor: "#C8C8C8",
  
        // IconButton
        iconDefaultPrimaryColor: "#5C5C5C",
        iconDefaultSecondaryColor: "#0B62AA",
        iconDefaultTertiaryColor: "#FFFFFF",
        iconDefaultQuaternaryColor: "#518EC1",
        iconDefaultQuinaryColor: "#B0B0B0",
  
        iconPressedPrimaryColor: "#003764",
        iconPressedSecondaryColor: "#CAE3F8",
        iconPressedTertiaryColor: "#C6CBCF",
        iconPressedQuaternaryColor: "#C6CBCF",  //Same as tertiary
  
        iconHoverPrimaryColor: "#32A2FF",
        iconHoverSecondaryColor: "#EEF6FF",
        iconHoverTertiaryColor: "#D8DFE4",
        iconHoverQuaternaryColor: "#D8DFE4",//Same as tertiary
  
        // TextField
        textfieldErrorBorderColor: "#D61818",
        textfieldDefaultBorderColor: "#ADADAD",
        textfieldFocusedBorderColor: "#1785E1",
        textfieldErrorTextColor: "#D00202",
        textfieldErrorFilledColor: "#FFEDED",
        textfieldFilledColor: "#F1F1F1",
        textfieldHintTextColor: "#D0D0D0",
        textfieldLabelColor: " #5C5C5C",
        textfieldNonEditingFilledColor: "#b7d4ec",
        textfieldInlineColor: "#C1001F",
  
        // NavBar
        menuYellowStripColor: "#FFC600",
        menuTabHoverColor: "#0067BE",
  
        // Appointment
        backgroundColor: "#F1F1F1",
        cancelBackgroundColor: "#10B5B5",
        appointmentConfirmStatusColor: "#4F9B3A",
        appointmentPendingConfirmationColor: "#B74E4E",
        selectedChoiceChipBackgroundColor: "#00D4D5",
        selectedChoiceChipBorderColor: "#8F8F8F",
        appointmentConfirmedBackgroundColor: "#10B5B5",
  
        // Common
        blackLinkHoverColor: "#518EC1",
        whiteLinkHoverColor: "#6CBCFF",
        blueLinkHoverColor: "#0B62AA",
        dividerPrimaryColor: "#5C5C5C",
        dividerSecondaryColor: "#8F8F8F",
        dividerTertiaryColor: "#B6B6B6",
        textLabelSecondaryColor: "#1785E1F",
        successPopupColor: "#33CC66",
        infoPopupColor: "#FFFFFF",
        crticalPopupColor: "#FB723C",
        warningPopupColor: "#E9BF1C",
  
        menuHoverColor: "#0070CD",
        passwordCriteriaMet: "#82FF75",
      };
    }
  
    return defaultThemeColors;
  }